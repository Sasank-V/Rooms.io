"use client"

import { useState, useEffect } from "react"
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  Alert,
  Modal,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native"
import { useLocalSearchParams, router } from "expo-router"
import { Ionicons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import { StaffProvider, useStaff, type StaffData } from "../../../../contexts/StaffContext"

const ROLES = [
  { id: "admin", label: "Admin", icon: "shield-checkmark-outline", color: "#dc2626" },
  { id: "staff", label: "Staff", icon: "person-outline", color: "#059669" },
  { id: "housekeeping", label: "Housekeeping", icon: "home-outline", color: "#7c3aed" },
  { id: "cleaner", label: "Cleaner", icon: "brush-outline", color: "#ea580c" },
  { id: "maintenance", label: "Maintenance", icon: "construct-outline", color: "#0891b2" },
  { id: "receptionist", label: "Receptionist", icon: "call-outline", color: "#be185d" },
]

const STATUS_OPTIONS = [
  { id: "active", label: "Active", color: "#10b981", icon: "checkmark-circle-outline" },
  { id: "inactive", label: "Inactive", color: "#ef4444", icon: "close-circle-outline" },
  { id: "on-leave", label: "On Leave", color: "#f59e0b", icon: "time-outline" },
]

function EditStaffContent() {
  const { id } = useLocalSearchParams()
  const { getStaffById, updateStaff, deleteStaff, loading: contextLoading } = useStaff()
  const [staff, setStaff] = useState<StaffData>({
    id: "",
    name: "",
    phone: "",
    email: "",
    aadhaar: "",
    role: "",
    status: "",
  })

  const [showRoleModal, setShowRoleModal] = useState(false)
  const [showStatusModal, setShowStatusModal] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!contextLoading && typeof id === "string") {
      const found = getStaffById(id)
      if (found) {
        setStaff({ ...found })
        setLoading(false)
        console.log("Loaded staff for editing:", found.name)
      } else {
        Alert.alert("Error", "Staff member not found", [
          {
            text: "OK",
            onPress: () => router.back(),
          },
        ])
      }
    }
  }, [id, getStaffById, contextLoading])

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (!staff.name.trim()) newErrors.name = "Name is required"
    if (!staff.phone.trim()) newErrors.phone = "Phone number is required"
    if (!staff.email.trim()) newErrors.email = "Email is required"
    if (!staff.aadhaar.trim()) newErrors.aadhaar = "Aadhaar number is required"

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (staff.email && !emailRegex.test(staff.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    // Phone validation
    const phoneRegex = /^[+]?[1-9][\d]{0,15}$/
    if (staff.phone && !phoneRegex.test(staff.phone.replace(/[\s\-$$$$]/g, ""))) {
      newErrors.phone = "Please enter a valid phone number"
    }

    // Aadhaar validation (12 digits)
    const aadhaarRegex = /^\d{4}-?\d{4}-?\d{4}$/
    if (staff.aadhaar && !aadhaarRegex.test(staff.aadhaar)) {
      newErrors.aadhaar = "Please enter a valid Aadhaar number (12 digits)"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = async () => {
    if (!validateForm()) {
      Alert.alert("Validation Error", "Please fix the errors and try again")
      return
    }

    if (typeof id !== "string") return

    try {
      setSaving(true)
      await updateStaff(id, staff)
      Alert.alert("Success", "Staff details updated successfully and saved to database!", [
        {
          text: "OK",
          onPress: () => router.back(),
        },
      ])
    } catch (error) {
      Alert.alert("Error", "Failed to update staff details. Please try again.")
      console.error("Update staff error:", error)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = () => {
    Alert.alert("Delete Staff Member", `Are you sure you want to delete ${staff.name}? This action cannot be undone.`, [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          if (typeof id === "string") {
            try {
              await deleteStaff(id)
              Alert.alert("Success", "Staff member deleted successfully from database!", [
                {
                  text: "OK",
                  onPress: () => router.back(),
                },
              ])
            } catch (error) {
              Alert.alert("Error", "Failed to delete staff member. Please try again.")
              console.error("Delete staff error:", error)
            }
          }
        },
      },
    ])
  }

  if (loading || contextLoading) {
    return (
      <View className="flex-1 bg-gray-50 justify-center items-center">
        <ActivityIndicator size="large" color="#667eea" />
        <Text className="text-gray-500 text-lg mt-4">Loading staff details...</Text>
      </View>
    )
  }

  const selectedRole = ROLES.find((r) => r.label === staff.role) || ROLES[1]
  const selectedStatus = STATUS_OPTIONS.find((s) => s.label === staff.status) || STATUS_OPTIONS[0]

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
                  staff.role === role.label ? "bg-blue-50 border-2 border-blue-200" : "bg-gray-50"
                }`}
                onPress={() => {
                  setStaff((prev) => ({ ...prev, role: role.label }))
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
                  className={`flex-1 font-semibold ${staff.role === role.label ? "text-blue-600" : "text-gray-700"}`}
                >
                  {role.label}
                </Text>
                {staff.role === role.label && <Ionicons name="checkmark-circle" size={24} color="#3b82f6" />}
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
                staff.status === status.label ? "bg-blue-50 border-2 border-blue-200" : "bg-gray-50"
              }`}
              onPress={() => {
                setStaff((prev) => ({ ...prev, status: status.label }))
                setShowStatusModal(false)
              }}
            >
              <View
                className="w-10 h-10 rounded-full items-center justify-center mr-3"
                style={{ backgroundColor: status.color + "20" }}
              >
                <Ionicons name={status.icon as any} size={20} color={status.color} />
              </View>
              <Text
                className={`flex-1 font-semibold ${staff.status === status.label ? "text-blue-600" : "text-gray-700"}`}
              >
                {status.label}
              </Text>
              {staff.status === status.label && <Ionicons name="checkmark-circle" size={24} color="#3b82f6" />}
            </Pressable>
          ))}
        </Pressable>
      </Pressable>
    </Modal>
  )

  return (
    <KeyboardAvoidingView className="flex-1 bg-gray-50" behavior={Platform.OS === "ios" ? "padding" : "height"}>
      {/* Header with Gradient */}
      <LinearGradient colors={["#667eea", "#764ba2"]} className="pt-16 pb-6 px-6 rounded-b-3xl">
        <View className="flex-row items-center mb-4">
          <Pressable onPress={() => router.back()} className="mr-4">
            <Ionicons name="arrow-back" size={24} color="white" />
          </Pressable>
          <View className="flex-1">
            <Text className="text-3xl font-bold text-white">Edit Staff</Text>
            <Text className="text-blue-100 mt-1">Update {staff.name}'s details</Text>
          </View>
          <Pressable
            onPress={handleDelete}
            className="w-12 h-12 bg-red-500/20 rounded-full items-center justify-center"
          >
            <Ionicons name="trash-outline" size={20} color="#ef4444" />
          </Pressable>
        </View>
      </LinearGradient>

      <ScrollView className="flex-1 px-6 py-6" showsVerticalScrollIndicator={false}>
        {/* Personal Information Section */}
        <View className="bg-white rounded-2xl p-6 mb-6 shadow-sm border border-gray-100">
          <View className="flex-row items-center mb-4">
            <Ionicons name="person-outline" size={20} color="#667eea" />
            <Text className="text-lg font-bold text-gray-800 ml-2">Personal Information</Text>
          </View>

          {/* Name Field */}
          <View className="mb-4">
            <Text className="text-sm font-semibold text-gray-700 mb-2">Full Name *</Text>
            <View
              className={`flex-row items-center bg-gray-50 rounded-xl px-4 py-3 border ${
                errors.name ? "border-red-300" : "border-gray-200"
              }`}
            >
              <Ionicons name="person-outline" size={20} color="#9ca3af" />
              <TextInput
                className="flex-1 ml-3 text-gray-700 font-medium"
                placeholder="Enter full name"
                value={staff.name}
                onChangeText={(text) => {
                  setStaff((prev) => ({ ...prev, name: text }))
                  if (errors.name) setErrors((prev) => ({ ...prev, name: "" }))
                }}
              />
            </View>
            {errors.name && <Text className="text-red-500 text-xs mt-1">{errors.name}</Text>}
          </View>

          {/* Phone Field */}
          <View className="mb-4">
            <Text className="text-sm font-semibold text-gray-700 mb-2">Phone Number *</Text>
            <View
              className={`flex-row items-center bg-gray-50 rounded-xl px-4 py-3 border ${
                errors.phone ? "border-red-300" : "border-gray-200"
              }`}
            >
              <Ionicons name="call-outline" size={20} color="#9ca3af" />
              <TextInput
                className="flex-1 ml-3 text-gray-700 font-medium"
                placeholder="+1 234-567-8900"
                value={staff.phone}
                keyboardType="phone-pad"
                onChangeText={(text) => {
                  setStaff((prev) => ({ ...prev, phone: text }))
                  if (errors.phone) setErrors((prev) => ({ ...prev, phone: "" }))
                }}
              />
            </View>
            {errors.phone && <Text className="text-red-500 text-xs mt-1">{errors.phone}</Text>}
          </View>

          {/* Email Field */}
          <View className="mb-4">
            <Text className="text-sm font-semibold text-gray-700 mb-2">Email Address *</Text>
            <View
              className={`flex-row items-center bg-gray-50 rounded-xl px-4 py-3 border ${
                errors.email ? "border-red-300" : "border-gray-200"
              }`}
            >
              <Ionicons name="mail-outline" size={20} color="#9ca3af" />
              <TextInput
                className="flex-1 ml-3 text-gray-700 font-medium"
                placeholder="example@hotel.com"
                value={staff.email}
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={(text) => {
                  setStaff((prev) => ({ ...prev, email: text }))
                  if (errors.email) setErrors((prev) => ({ ...prev, email: "" }))
                }}
              />
            </View>
            {errors.email && <Text className="text-red-500 text-xs mt-1">{errors.email}</Text>}
          </View>

          {/* Aadhaar Field */}
          <View className="mb-0">
            <Text className="text-sm font-semibold text-gray-700 mb-2">Aadhaar Number *</Text>
            <View
              className={`flex-row items-center bg-gray-50 rounded-xl px-4 py-3 border ${
                errors.aadhaar ? "border-red-300" : "border-gray-200"
              }`}
            >
              <Ionicons name="card-outline" size={20} color="#9ca3af" />
              <TextInput
                className="flex-1 ml-3 text-gray-700 font-medium"
                placeholder="1234-5678-9012"
                value={staff.aadhaar}
                keyboardType="numeric"
                maxLength={14}
                onChangeText={(text) => {
                  // Auto-format Aadhaar number
                  const formatted = text.replace(/\D/g, "").replace(/(\d{4})(\d{4})(\d{4})/, "$1-$2-$3")
                  setStaff((prev) => ({ ...prev, aadhaar: formatted }))
                  if (errors.aadhaar) setErrors((prev) => ({ ...prev, aadhaar: "" }))
                }}
              />
            </View>
            {errors.aadhaar && <Text className="text-red-500 text-xs mt-1">{errors.aadhaar}</Text>}
          </View>
        </View>

        {/* Role and Status Section */}
        <View className="bg-white rounded-2xl p-6 mb-6 shadow-sm border border-gray-100">
          <View className="flex-row items-center mb-4">
            <Ionicons name="settings-outline" size={20} color="#667eea" />
            <Text className="text-lg font-bold text-gray-800 ml-2">Role & Status</Text>
          </View>

          {/* Role Selection */}
          <View className="mb-4">
            <Text className="text-sm font-semibold text-gray-700 mb-2">Role</Text>
            <Pressable
              className="bg-gray-50 rounded-xl p-4 border border-gray-200"
              onPress={() => setShowRoleModal(true)}
            >
              <View className="flex-row items-center">
                <View
                  className="w-10 h-10 rounded-full items-center justify-center mr-3"
                  style={{ backgroundColor: selectedRole.color + "20" }}
                >
                  <Ionicons name={selectedRole.icon as any} size={20} color={selectedRole.color} />
                </View>
                <View className="flex-1">
                  <Text className="text-gray-800 font-semibold">{selectedRole.label}</Text>
                  <Text className="text-gray-500 text-xs">Tap to change role</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
              </View>
            </Pressable>
          </View>

          {/* Status Selection */}
          <View className="mb-0">
            <Text className="text-sm font-semibold text-gray-700 mb-2">Status</Text>
            <Pressable
              className="bg-gray-50 rounded-xl p-4 border border-gray-200"
              onPress={() => setShowStatusModal(true)}
            >
              <View className="flex-row items-center">
                <View
                  className="w-10 h-10 rounded-full items-center justify-center mr-3"
                  style={{ backgroundColor: selectedStatus.color + "20" }}
                >
                  <Ionicons name={selectedStatus.icon as any} size={20} color={selectedStatus.color} />
                </View>
                <View className="flex-1">
                  <Text className="text-gray-800 font-semibold">{selectedStatus.label}</Text>
                  <Text className="text-gray-500 text-xs">Tap to change status</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
              </View>
            </Pressable>
          </View>
        </View>

        {/* Action Buttons */}
        <View className="flex-row space-x-4 mb-8 gap-1">
            {/* Cancel Button */}
            <Pressable
              onPress={() => router.back()}
              disabled={saving}
              className="flex-1 bg-gray-200 rounded-2xl py-4 items-center justify-center"
            >
              <Text className="text-gray-700 font-bold text-lg">Cancel</Text>
            </Pressable>

            {/* Save Button */}
            <Pressable
              onPress={handleSave}
              disabled={saving}
              className="flex-1 rounded-2xl overflow-hidden"
            >
              <LinearGradient
                colors={["#667eea", "#764ba2"]}
                className="py-4 px-4 items-center justify-center rounded-2xl"
              >
                <View className="flex-row items-center justify-center">
                  {saving ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <Ionicons name="checkmark-circle-outline" size={20} color="white" />
                  )}
                  <Text className="text-white font-bold text-base ml-2">
                    {saving ? "Saving..." : "Save Changes"}
                  </Text>
                </View>
              </LinearGradient>
            </Pressable>
          </View>

      </ScrollView>

      <RoleModal />
      <StatusModal />
    </KeyboardAvoidingView>
  )
}

export default function EditStaffScreen() {
  return (
    <StaffProvider>
      <EditStaffContent />
    </StaffProvider>
  )
}
