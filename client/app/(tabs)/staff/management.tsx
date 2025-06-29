
"use client"

import React, { useState, useRef } from "react"
import { View, Text, TextInput, Pressable, ScrollView, Modal, Animated, Dimensions } from "react-native"
import { router } from "expo-router"
import { Ionicons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import StaffCard from "../../../components/staff/StaffCard"
import { StaffProvider, useStaff } from "~/contexts/StaffContext"

const { width } = Dimensions.get("window")

const ROLES = [
  { id: "all", label: "All Roles", icon: "people-outline", color: "#6366f1" },
  { id: "admin", label: "Admin", icon: "shield-checkmark-outline", color: "#dc2626" },
  { id: "staff", label: "Staff", icon: "person-outline", color: "#059669" },
  { id: "housekeeping", label: "Housekeeping", icon: "home-outline", color: "#7c3aed" },
  { id: "cleaner", label: "Cleaner", icon: "brush-outline", color: "#ea580c" },
  { id: "maintenance", label: "Maintenance", icon: "construct-outline", color: "#0891b2" },
  { id: "receptionist", label: "Receptionist", icon: "call-outline", color: "#be185d" },
]

const STATUS_OPTIONS = [
  { id: "all", label: "All Status", color: "#6b7280" },
  { id: "active", label: "Active", color: "#10b981" },
  { id: "inactive", label: "Inactive", color: "#ef4444" },
  { id: "on-leave", label: "On Leave", color: "#f59e0b" },
]

function ManagementScreenContent() {
  const { staff, updateStaff } = useStaff()
  const [search, setSearch] = useState("")
  const [selectedRole, setSelectedRole] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [undoVisible, setUndoVisible] = useState(false)
  const [showRoleModal, setShowRoleModal] = useState(false)
  const [showStatusModal, setShowStatusModal] = useState(false)

  const undoTimeout = useRef<NodeJS.Timeout | null>(null)
  const lastDeactivatedRef = useRef<any>(null)
  const slideAnim = useRef(new Animated.Value(-100)).current

  React.useEffect(() => {
    if (undoVisible) {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }).start()
    } else {
      Animated.spring(slideAnim, {
        toValue: -100,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }).start()
    }
  }, [undoVisible])

  const handleDeactivate = (id: string) => {
    const staffToDeactivate = staff.find((s) => s.id === id)
    if (!staffToDeactivate) return

    lastDeactivatedRef.current = { ...staffToDeactivate }
    updateStaff(id, { status: "Inactive" })

    setUndoVisible(true)
    if (undoTimeout.current) clearTimeout(undoTimeout.current)
    undoTimeout.current = setTimeout(() => {
      setUndoVisible(false)
      lastDeactivatedRef.current = null
    }, 4000)
  }

  const handleUndo = () => {
    const restored = lastDeactivatedRef.current
    if (!restored) return

    updateStaff(restored.id, { status: restored.status })
    setUndoVisible(false)
    lastDeactivatedRef.current = null
  }

  const filtered = staff.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase()) ||
      s.phone.includes(search)

    const matchesRole = selectedRole === "all" || s.role.toLowerCase() === selectedRole
    const matchesStatus = selectedStatus === "all" || s.status.toLowerCase().replace(" ", "-") === selectedStatus

    return matchesSearch && matchesRole && matchesStatus
  })

  const selectedRoleData = ROLES.find((r) => r.id === selectedRole) || ROLES[0]
  const selectedStatusData = STATUS_OPTIONS.find((s) => s.id === selectedStatus) || STATUS_OPTIONS[0]

  const RoleModal = () => (
    <Modal visible={showRoleModal} transparent animationType="fade" onRequestClose={() => setShowRoleModal(false)}>
      <Pressable
        className="flex-1 bg-black/50 justify-center items-center px-4"
        onPress={() => setShowRoleModal(false)}
      >
        <Pressable className="bg-white rounded-2xl p-6 w-full max-w-sm" onPress={(e) => e.stopPropagation()}>
          <Text className="text-xl font-bold text-gray-800 mb-4 text-center">Select Role</Text>
          <ScrollView className="max-h-80">
            {ROLES.map((role) => (
              <Pressable
                key={role.id}
                className={`flex-row items-center p-4 rounded-xl mb-2 ${
                  selectedRole === role.id ? "bg-blue-50 border-2 border-blue-200" : "bg-gray-50"
                }`}
                onPress={() => {
                  setSelectedRole(role.id)
                  setShowRoleModal(false)
                }}
              >
                <View
                  className="w-10 h-10 rounded-full items-center justify-center mr-3"
                  style={{ backgroundColor: role.color + "20" }}
                >
                  <Ionicons name={role.icon as any} size={20} color={role.color} />
                </View>
                <Text
                  className={`flex-1 font-semibold ${selectedRole === role.id ? "text-blue-600" : "text-gray-700"}`}
                >
                  {role.label}
                </Text>
                {selectedRole === role.id && <Ionicons name="checkmark-circle" size={24} color="#3b82f6" />}
              </Pressable>
            ))}
          </ScrollView>
        </Pressable>
      </Pressable>
    </Modal>
  )

  const StatusModal = () => (
    <Modal visible={showStatusModal} transparent animationType="fade" onRequestClose={() => setShowStatusModal(false)}>
      <Pressable
        className="flex-1 bg-black/50 justify-center items-center px-4"
        onPress={() => setShowStatusModal(false)}
      >
        <Pressable className="bg-white rounded-2xl p-6 w-full max-w-sm" onPress={(e) => e.stopPropagation()}>
          <Text className="text-xl font-bold text-gray-800 mb-4 text-center">Select Status</Text>
          {STATUS_OPTIONS.map((status) => (
            <Pressable
              key={status.id}
              className={`flex-row items-center p-4 rounded-xl mb-2 ${
                selectedStatus === status.id ? "bg-blue-50 border-2 border-blue-200" : "bg-gray-50"
              }`}
              onPress={() => {
                setSelectedStatus(status.id)
                setShowStatusModal(false)
              }}
            >
              <View className="w-4 h-4 rounded-full mr-3" style={{ backgroundColor: status.color }} />
              <Text
                className={`flex-1 font-semibold ${selectedStatus === status.id ? "text-blue-600" : "text-gray-700"}`}
              >
                {status.label}
              </Text>
              {selectedStatus === status.id && <Ionicons name="checkmark-circle" size={24} color="#3b82f6" />}
            </Pressable>
          ))}
        </Pressable>
      </Pressable>
    </Modal>
  )

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header with Gradient */}
      <LinearGradient colors={["#667eea", "#764ba2"]} className="pt-16 pb-6 px-6 rounded-b-3xl">
        <View className="flex-row items-center justify-between mb-4">
          <View>
            <Text className="text-3xl font-bold text-white">Staff Management</Text>
            <Text className="text-blue-100 mt-1">Hotel Room Management System</Text>
          </View>
          <Pressable className="w-12 h-12 bg-white/20 rounded-full items-center justify-center">
            <Ionicons name="notifications-outline" size={24} color="white" />
          </Pressable>
        </View>

        {/* Search Bar */}
        <View className="bg-white/90 rounded-2xl flex-row items-center px-4 py-3 mt-2">
          <Ionicons name="search-outline" size={20} color="#6b7280" />
          <TextInput
            placeholder="Search staff by name, email, or phone..."
            placeholderTextColor="#9ca3af"
            value={search}
            onChangeText={setSearch}
            className="flex-1 ml-3 text-gray-700 font-medium"
          />
          {search.length > 0 && (
            <Pressable onPress={() => setSearch("")}>
              <Ionicons name="close-circle" size={20} color="#6b7280" />
            </Pressable>
          )}
        </View>
      </LinearGradient>

      {/* Filter Buttons */}
      <View className="px-6 py-4">
        <View className="flex-row space-x-3">
          <Pressable
            className="flex-1 bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
            onPress={() => setShowRoleModal(true)}
          >
            <View className="flex-row items-center">
              <View
                className="w-8 h-8 rounded-full items-center justify-center mr-3"
                style={{ backgroundColor: selectedRoleData.color + "20" }}
              >
                <Ionicons name={selectedRoleData.icon as any} size={16} color={selectedRoleData.color} />
              </View>
              <View className="flex-1">
                <Text className="text-xs text-gray-500 font-medium">ROLE</Text>
                <Text className="text-sm font-bold text-gray-800" numberOfLines={1}>
                  {selectedRoleData.label}
                </Text>
              </View>
              <Ionicons name="chevron-down" size={16} color="#9ca3af" />
            </View>
          </Pressable>

          <Pressable
            className="flex-1 bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
            onPress={() => setShowStatusModal(true)}
          >
            <View className="flex-row items-center">
              <View
                className="w-8 h-8 rounded-full items-center justify-center mr-3"
                style={{ backgroundColor: selectedStatusData.color + "20" }}
              >
                <View className="w-3 h-3 rounded-full" style={{ backgroundColor: selectedStatusData.color }} />
              </View>
              <View className="flex-1">
                <Text className="text-xs text-gray-500 font-medium">STATUS</Text>
                <Text className="text-sm font-bold text-gray-800" numberOfLines={1}>
                  {selectedStatusData.label}
                </Text>
              </View>
              <Ionicons name="chevron-down" size={16} color="#9ca3af" />
            </View>
          </Pressable>
        </View>

        {/* Results Count */}
        <View className="mt-4 flex-row items-center justify-between">
          <Text className="text-gray-600 font-medium">
            {filtered.length} staff member{filtered.length !== 1 ? "s" : ""} found
          </Text>
          {(selectedRole !== "all" || selectedStatus !== "all" || search.length > 0) && (
            <Pressable
              onPress={() => {
                setSelectedRole("all")
                setSelectedStatus("all")
                setSearch("")
              }}
              className="bg-gray-200 px-3 py-1 rounded-full"
            >
              <Text className="text-gray-600 text-xs font-medium">Clear Filters</Text>
            </Pressable>
          )}
        </View>
      </View>

      {/* Staff List */}
      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {filtered.length > 0 ? (
          filtered.map((staffMember, index) => (
            <View key={staffMember.id} className="mb-4">
              <StaffCard
                id={staffMember.id}
                name={staffMember.name}
                phone={staffMember.phone}
                email={staffMember.email}
                aadhaar={staffMember.aadhaar}
                role={staffMember.role}
                status={staffMember.status}
                onEdit={() => router.push(`/staff/edit/${staffMember.id}`)}
                onView={() => router.push(`/staff/view/${staffMember.id}`)}
                onDeactivate={() => handleDeactivate(staffMember.id)}
              />
            </View>
          ))
        ) : (
          <View className="items-center justify-center py-20">
            <Ionicons name="people-outline" size={64} color="#d1d5db" />
            <Text className="text-gray-500 text-lg font-medium mt-4">No staff found</Text>
            <Text className="text-gray-400 text-center mt-2">Try adjusting your search or filter criteria</Text>
          </View>
        )}
        <View className="h-32" />
      </ScrollView>

      {/* Floating Add Button */}
      <Pressable onPress={() => router.push("/(tabs)/staff/add")} className="absolute bottom-6 right-6 shadow-lg">
        <LinearGradient colors={["#667eea", "#764ba2"]} className="w-16 h-16 rounded-full items-center justify-center">
          <Ionicons name="add" size={28} color="white" />
        </LinearGradient>
      </Pressable>

      {/* Animated Undo Snackbar */}
      {undoVisible && (
        <Animated.View
          style={{
            transform: [{ translateY: slideAnim }],
          }}
          className="absolute bottom-24 left-4 right-4"
        >
          <View className="bg-gray-900 rounded-2xl p-4 shadow-lg">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center flex-1">
                <Ionicons name="checkmark-circle" size={20} color="#10b981" />
                <Text className="text-white font-medium ml-2">Staff deactivated successfully</Text>
              </View>
              <Pressable onPress={handleUndo} className="bg-blue-500 px-4 py-2 rounded-full ml-3">
                <Text className="text-white font-bold text-sm">UNDO</Text>
              </Pressable>
            </View>
          </View>
        </Animated.View>
      )}

      <RoleModal />
      <StatusModal />
    </View>
  )
}

export default function ManagementScreen() {
  return (
    <StaffProvider>
      <ManagementScreenContent />
    </StaffProvider>
  )
}
