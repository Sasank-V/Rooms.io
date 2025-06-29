"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback, useEffect } from "react"
import { StaffStorage, type StaffData } from "components/staff/staffStorage"

interface StaffContextType {
  staff: StaffData[]
  loading: boolean
  addStaff: (newStaff: Omit<StaffData, "id">) => Promise<void>
  updateStaff: (id: string, updatedStaff: Partial<StaffData>) => Promise<void>
  deleteStaff: (id: string) => Promise<void>
  getStaffById: (id: string) => StaffData | undefined
  refreshStaff: () => Promise<void>
  exportData: () => Promise<string>
  importData: (jsonData: string) => Promise<void>
  clearAllData: () => Promise<void>
}

const StaffContext = createContext<StaffContextType | undefined>(undefined)

export function StaffProvider({ children }: { children: React.ReactNode }) {
  const [staff, setStaff] = useState<StaffData[]>([])
  const [loading, setLoading] = useState(true)

  // Load staff data on component mount
  useEffect(() => {
    loadStaffData()
  }, [])

  const loadStaffData = async () => {
    try {
      setLoading(true)
      const data = await StaffStorage.loadStaffData()
      setStaff(data)
      console.log("Staff context loaded with", data.length, "members")
    } catch (error) {
      console.error("Error loading staff data in context:", error)
    } finally {
      setLoading(false)
    }
  }

  const addStaff = useCallback(async (newStaff: Omit<StaffData, "id">) => {
    try {
      const addedStaff = await StaffStorage.addStaff(newStaff)
      setStaff((prev) => [...prev, addedStaff])
      console.log("Staff member added to context:", addedStaff.name)
    } catch (error) {
      console.error("Error adding staff in context:", error)
      throw error
    }
  }, [])

  const updateStaff = useCallback(async (id: string, updatedStaff: Partial<StaffData>) => {
    try {
      await StaffStorage.updateStaff(id, updatedStaff)
      setStaff((prev) => prev.map((member) => (member.id === id ? { ...member, ...updatedStaff } : member)))
      console.log("Staff member updated in context:", id)
    } catch (error) {
      console.error("Error updating staff in context:", error)
      throw error
    }
  }, [])

  const deleteStaff = useCallback(async (id: string) => {
    try {
      await StaffStorage.deleteStaff(id)
      setStaff((prev) => prev.filter((member) => member.id !== id))
      console.log("Staff member deleted from context:", id)
    } catch (error) {
      console.error("Error deleting staff in context:", error)
      throw error
    }
  }, [])

  const getStaffById = useCallback(
    (id: string) => {
      return staff.find((member) => member.id === id)
    },
    [staff],
  )

  const refreshStaff = useCallback(async () => {
    await loadStaffData()
  }, [])

  const exportData = useCallback(async () => {
    try {
      return await StaffStorage.exportData()
    } catch (error) {
      console.error("Error exporting data:", error)
      throw error
    }
  }, [])

  const importData = useCallback(async (jsonData: string) => {
    try {
      await StaffStorage.importData(jsonData)
      await loadStaffData() // Reload data after import
    } catch (error) {
      console.error("Error importing data:", error)
      throw error
    }
  }, [])

  const clearAllData = useCallback(async () => {
    try {
      await StaffStorage.clearAllData()
      await loadStaffData() // Reload data after clearing
    } catch (error) {
      console.error("Error clearing data:", error)
      throw error
    }
  }, [])

  const value: StaffContextType = {
    staff,
    loading,
    addStaff,
    updateStaff,
    deleteStaff,
    getStaffById,
    refreshStaff,
    exportData,
    importData,
    clearAllData,
  }

  return <StaffContext.Provider value={value}>{children}</StaffContext.Provider>
}

export function useStaff() {
  const context = useContext(StaffContext)
  if (context === undefined) {
    throw new Error("useStaff must be used within a StaffProvider")
  }
  return context
}

// Export the StaffData type for use in other components
export type { StaffData }
