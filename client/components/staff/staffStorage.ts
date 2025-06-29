import AsyncStorage from "@react-native-async-storage/async-storage"

// Define the interface locally to avoid import issues
export interface StaffData {
  id: string
  name: string
  phone: string
  email: string
  aadhaar: string
  role: string
  status: string
}

// Initial staff list
const initialStaffList: StaffData[] = [
  {
    id: "1",
    name: "John Smith",
    phone: "+1 234-567-8901",
    email: "john.smith@hotel.com",
    aadhaar: "1234-5678-9012",
    role: "Admin",
    status: "Active",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    phone: "+1 234-567-8902",
    email: "sarah.johnson@hotel.com",
    aadhaar: "2345-6789-0123",
    role: "Housekeeping",
    status: "Active",
  },
  {
    id: "3",
    name: "Mike Wilson",
    phone: "+1 234-567-8903",
    email: "mike.wilson@hotel.com",
    aadhaar: "3456-7890-1234",
    role: "Maintenance",
    status: "On Leave",
  },
  {
    id: "4",
    name: "Emily Davis",
    phone: "+1 234-567-8904",
    email: "emily.davis@hotel.com",
    aadhaar: "4567-8901-2345",
    role: "Receptionist",
    status: "Active",
  },
  {
    id: "5",
    name: "David Brown",
    phone: "+1 234-567-8905",
    email: "david.brown@hotel.com",
    aadhaar: "5678-9012-3456",
    role: "Cleaner",
    status: "Active",
  },
  {
    id: "6",
    name: "Lisa Anderson",
    phone: "+1 234-567-8906",
    email: "lisa.anderson@hotel.com",
    aadhaar: "6789-0123-4567",
    role: "Staff",
    status: "Inactive",
  },
]

const STAFF_STORAGE_KEY = "@hotel_staff_data"

export class StaffStorage {
  // Load staff data from AsyncStorage
  static async loadStaffData(): Promise<StaffData[]> {
    try {
      const storedData = await AsyncStorage.getItem(STAFF_STORAGE_KEY)
      if (storedData) {
        const parsedData = JSON.parse(storedData)
        console.log("Loaded staff data from storage:", parsedData.length, "members")
        return parsedData
      } else {
        console.log("No stored data found, using initial staff list")
        // Save initial data to storage
        await this.saveStaffData(initialStaffList)
        return initialStaffList
      }
    } catch (error) {
      console.error("Error loading staff data:", error)
      return initialStaffList
    }
  }

  // Save staff data to AsyncStorage
  static async saveStaffData(staffData: StaffData[]): Promise<void> {
    try {
      await AsyncStorage.setItem(STAFF_STORAGE_KEY, JSON.stringify(staffData))
      console.log("Staff data saved successfully:", staffData.length, "members")
    } catch (error) {
      console.error("Error saving staff data:", error)
      throw error
    }
  }

  // Add a new staff member
  static async addStaff(newStaff: Omit<StaffData, "id">): Promise<StaffData> {
    try {
      const currentData = await this.loadStaffData()
      const id = Date.now().toString() + Math.random().toString(36).substr(2, 9)
      const staffWithId: StaffData = { ...newStaff, id }

      const updatedData = [...currentData, staffWithId]
      await this.saveStaffData(updatedData)

      console.log("New staff member added:", newStaff.name)
      return staffWithId
    } catch (error) {
      console.error("Error adding staff member:", error)
      throw error
    }
  }

  // Update an existing staff member
  static async updateStaff(id: string, updatedStaff: Partial<StaffData>): Promise<void> {
    try {
      const currentData = await this.loadStaffData()
      const updatedData = currentData.map((member) => (member.id === id ? { ...member, ...updatedStaff } : member))

      await this.saveStaffData(updatedData)
      console.log("Staff member updated:", id)
    } catch (error) {
      console.error("Error updating staff member:", error)
      throw error
    }
  }

  // Delete a staff member
  static async deleteStaff(id: string): Promise<void> {
    try {
      const currentData = await this.loadStaffData()
      const updatedData = currentData.filter((member) => member.id !== id)

      await this.saveStaffData(updatedData)
      console.log("Staff member deleted:", id)
    } catch (error) {
      console.error("Error deleting staff member:", error)
      throw error
    }
  }

  // Clear all data (for testing purposes)
  static async clearAllData(): Promise<void> {
    try {
      await AsyncStorage.removeItem(STAFF_STORAGE_KEY)
      console.log("All staff data cleared")
    } catch (error) {
      console.error("Error clearing staff data:", error)
      throw error
    }
  }

  // Export data as JSON string (for backup purposes)
  static async exportData(): Promise<string> {
    try {
      const currentData = await this.loadStaffData()
      return JSON.stringify(currentData, null, 2)
    } catch (error) {
      console.error("Error exporting staff data:", error)
      throw error
    }
  }

  // Import data from JSON string
  static async importData(jsonData: string): Promise<void> {
    try {
      const parsedData = JSON.parse(jsonData)
      if (Array.isArray(parsedData)) {
        await this.saveStaffData(parsedData)
        console.log("Staff data imported successfully")
      } else {
        throw new Error("Invalid data format")
      }
    } catch (error) {
      console.error("Error importing staff data:", error)
      throw error
    }
  }

  // Get initial staff list
  static getInitialStaffList(): StaffData[] {
    return [...initialStaffList]
  }
}
