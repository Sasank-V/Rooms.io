"use client"

import { useState, useEffect } from "react"
import { View, Text, Pressable, ScrollView, Alert, ActivityIndicator, Linking } from "react-native"
import { useLocalSearchParams, router } from "expo-router"
import { Ionicons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import { useStaff, type StaffData } from "../../../../contexts/StaffContext"

const getRoleIcon = (role: string) => {
  const roleIcons: { [key: string]: string } = {
    admin: "shield-checkmark-outline",
    staff: "person-outline",
    housekeeping: "home-outline",
    cleaner: "brush-outline",
    maintenance: "construct-outline",
    receptionist: "call-outline",
  }
  return roleIcons[role.toLowerCase()] || "person-outline"
}

const getRoleColor = (role: string) => {
  const roleColors: { [key: string]: string } = {
    admin: "#dc2626",
    staff: "#059669",
    housekeeping: "#7c3aed",
    cleaner: "#ea580c",
    maintenance: "#0891b2",
    receptionist: "#be185d",
  }
  return roleColors[role.toLowerCase()] || "#6366f1"
}

const getStatusColor = (status: string) => {
  const statusColors: { [key: string]: string } = {
    active: "#10b981",
    inactive: "#ef4444",
    "on leave": "#f59e0b",
  }
  return statusColors[status.toLowerCase()] || "#6b7280"
}

export default function ViewStaffScreen() {
  const { id } = useLocalSearchParams()
  const { getStaffById, deleteStaff, loading: contextLoading } = useStaff()
  const [staff, setStaff] = useState<StaffData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!contextLoading && typeof id === "string") {
      const found = getStaffById(id)
      if (found) {
        setStaff(found)
        setLoading(false)
        console.log("Loaded staff for viewing:", found.name)
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

  const handleCall = () => {
    if (staff?.phone) {
      Linking.openURL(`tel:${staff.phone}`)
    }
  }

  const handleEmail = () => {
    if (staff?.email) {
      Linking.openURL(`mailto:${staff.email}`)
    }
  }

  const handleEdit = () => {
    if (typeof id === "string") {
      router.push(`/(tabs)/staff/edit/${id}`)
    }
  }

  const handleDelete = () => {
    if (!staff) return

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
              Alert.alert("Success", "Staff member deleted successfully!", [
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

  if (loading || contextLoading || !staff) {
    return (
      <View className="flex-1 bg-gray-50 justify-center items-center">
        <ActivityIndicator size="large" color="#667eea" />
        <Text className="text-gray-500 text-lg mt-4">Loading staff details...</Text>
      </View>
    )
  }

  const roleColor = getRoleColor(staff.role)
  const statusColor = getStatusColor(staff.status)
  const roleIcon = getRoleIcon(staff.role)

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header with Gradient */}
      <LinearGradient colors={["#667eea", "#764ba2"]} className="pt-16 pb-6 px-6 rounded-b-3xl">
        <View className="flex-row items-center mb-4">
          <Pressable onPress={() => router.back()} className="mr-4">
            <Ionicons name="arrow-back" size={24} color="white" />
          </Pressable>
          <View className="flex-1">
            <Text className="text-3xl font-bold text-white">Staff Details</Text>
            <Text className="text-blue-100 mt-1">View {staff.name}'s information</Text>
          </View>
          <Pressable
            onPress={handleEdit}
            className="w-12 h-12 bg-white/20 rounded-full items-center justify-center mr-2"
          >
            <Ionicons name="create-outline" size={20} color="white" />
          </Pressable>
          <Pressable
            onPress={handleDelete}
            className="w-12 h-12 bg-red-500/20 rounded-full items-center justify-center"
          >
            <Ionicons name="trash-outline" size={20} color="#ef4444" />
          </Pressable>
        </View>
      </LinearGradient>

      <ScrollView className="flex-1 px-6 py-6" showsVerticalScrollIndicator={false}>
        {/* Profile Card */}
        <View className="bg-white rounded-2xl p-6 mb-6 shadow-sm border border-gray-100">
          <View className="items-center mb-6">
            <View
              className="w-24 h-24 rounded-full items-center justify-center mb-4"
              style={{ backgroundColor: roleColor + "20" }}
            >
              <Ionicons name={roleIcon as any} size={48} color={roleColor} />
            </View>
            <Text className="text-2xl font-bold text-gray-800 mb-2">{staff.name}</Text>
            <View className="flex-row items-center space-x-3">
              <View className="px-4 py-2 rounded-full" style={{ backgroundColor: roleColor + "20" }}>
                <Text className="text-sm font-bold uppercase" style={{ color: roleColor }}>
                  {staff.role}
                </Text>
              </View>
              <View
                className="px-4 py-2 rounded-full flex-row items-center"
                style={{ backgroundColor: statusColor + "20" }}
              >
                <View className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: statusColor }} />
                <Text className="text-sm font-bold" style={{ color: statusColor }}>
                  {staff.status}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Contact Information */}
        <View className="bg-white rounded-2xl p-6 mb-6 shadow-sm border border-gray-100">
          <View className="flex-row items-center mb-4">
            <Ionicons name="call-outline" size={20} color="#667eea" />
            <Text className="text-lg font-bold text-gray-800 ml-2">Contact Information</Text>
          </View>

          {/* Phone */}
          <Pressable className="flex-row items-center p-4 bg-gray-50 rounded-xl mb-3" onPress={handleCall}>
            <View className="w-12 h-12 bg-green-100 rounded-full items-center justify-center mr-4">
              <Ionicons name="call" size={20} color="#10b981" />
            </View>
            <View className="flex-1">
              <Text className="text-sm text-gray-500 font-medium">Phone Number</Text>
              <Text className="text-lg font-semibold text-gray-800">{staff.phone}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
          </Pressable>

          {/* Email */}
          <Pressable className="flex-row items-center p-4 bg-gray-50 rounded-xl mb-3" onPress={handleEmail}>
            <View className="w-12 h-12 bg-blue-100 rounded-full items-center justify-center mr-4">
              <Ionicons name="mail" size={20} color="#3b82f6" />
            </View>
            <View className="flex-1">
              <Text className="text-sm text-gray-500 font-medium">Email Address</Text>
              <Text className="text-lg font-semibold text-gray-800" numberOfLines={1}>
                {staff.email}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
          </Pressable>

          {/* Aadhaar */}
          <View className="flex-row items-center p-4 bg-gray-50 rounded-xl">
            <View className="w-12 h-12 bg-purple-100 rounded-full items-center justify-center mr-4">
              <Ionicons name="card" size={20} color="#7c3aed" />
            </View>
            <View className="flex-1">
              <Text className="text-sm text-gray-500 font-medium">Aadhaar Number</Text>
              <Text className="text-lg font-semibold text-gray-800">{staff.aadhaar}</Text>
            </View>
          </View>
        </View>

        {/* Role & Status Details */}
        <View className="bg-white rounded-2xl p-6 mb-6 shadow-sm border border-gray-100">
          <View className="flex-row items-center mb-4">
            <Ionicons name="settings-outline" size={20} color="#667eea" />
            <Text className="text-lg font-bold text-gray-800 ml-2">Role & Status</Text>
          </View>

          <View className="flex-row space-x-4">
            {/* Role Card */}
            <View className="flex-1 p-4 bg-gray-50 rounded-xl">
              <View className="flex-row items-center mb-2">
                <View
                  className="w-8 h-8 rounded-full items-center justify-center mr-2"
                  style={{ backgroundColor: roleColor + "20" }}
                >
                  <Ionicons name={roleIcon as any} size={16} color={roleColor} />
                </View>
                <Text className="text-sm text-gray-500 font-medium">Role</Text>
              </View>
              <Text className="text-lg font-bold text-gray-800">{staff.role}</Text>
            </View>

            {/* Status Card */}
            <View className="flex-1 p-4 bg-gray-50 rounded-xl">
              <View className="flex-row items-center mb-2">
                <View
                  className="w-8 h-8 rounded-full items-center justify-center mr-2"
                  style={{ backgroundColor: statusColor + "20" }}
                >
                  <View className="w-3 h-3 rounded-full" style={{ backgroundColor: statusColor }} />
                </View>
                <Text className="text-sm text-gray-500 font-medium">Status</Text>
              </View>
              <Text className="text-lg font-bold text-gray-800">{staff.status}</Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View className="flex-row space-x-4 mb-8">
          <Pressable onPress={handleCall} className="flex-1 bg-green-500 rounded-2xl py-4 items-center justify-center">
            <View className="flex-row items-center">
              <Ionicons name="call" size={20} color="white" />
              <Text className="text-white font-bold text-lg ml-2">Call</Text>
            </View>
          </Pressable>

          <Pressable onPress={handleEmail} className="flex-1 bg-blue-500 rounded-2xl py-4 items-center justify-center">
            <View className="flex-row items-center">
              <Ionicons name="mail" size={20} color="white" />
              <Text className="text-white font-bold text-lg ml-2">Email</Text>
            </View>
          </Pressable>

          <Pressable
            onPress={handleEdit}
            className="flex-1 rounded-2xl py-4 items-center justify-center overflow-hidden"
          >
            <LinearGradient colors={["#667eea", "#764ba2"]} className="w-full h-full items-center justify-center">
              <View className="flex-row items-center">
                <Ionicons name="create" size={20} color="white" />
                <Text className="text-white font-bold text-lg ml-2">Edit</Text>
              </View>
            </LinearGradient>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  )
}
