import React from "react"
import { View, Text, Pressable } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { router } from "expo-router"

interface StaffCardProps {
  id: string
  name: string
  phone: string
  email: string
  aadhaar: string
  role: string
  status: string
  onDeactivate: () => void
  onEdit?: () => void
  onView?: () => void
}

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

export default function StaffCard({
  id,
  name,
  phone,
  email,
  aadhaar,
  role,
  status,
  onDeactivate,
  onEdit,
  onView,
}: StaffCardProps) {
  const roleColor = getRoleColor(role)
  const statusColor = getStatusColor(status)
  const roleIcon = getRoleIcon(role)

  return (
    <View className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <View className="p-4 pb-0">
        <View className="flex-row items-center justify-between mb-3">
          <View className="flex-row items-center">
            <View
              className="w-12 h-12 rounded-full items-center justify-center mr-3"
              style={{ backgroundColor: roleColor + "20" }}
            >
              <Ionicons name={roleIcon as any} size={24} color={roleColor} />
            </View>
            <View>
              <Text className="text-lg font-bold text-gray-800">{name}</Text>
              <View className="flex-row items-center mt-1">
                <View className="px-3 py-1 rounded-full mr-2" style={{ backgroundColor: roleColor + "20" }}>
                  <Text className="text-xs font-bold uppercase" style={{ color: roleColor }}>
                    {role}
                  </Text>
                </View>
                <View
                  className="px-3 py-1 rounded-full flex-row items-center"
                  style={{ backgroundColor: statusColor + "20" }}
                >
                  <View className="w-2 h-2 rounded-full mr-1" style={{ backgroundColor: statusColor }} />
                  <Text className="text-xs font-bold" style={{ color: statusColor }}>
                    {status}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Contact Information */}
        <View className="space-y-2">
          <View className="flex-row items-center">
            <Ionicons name="mail-outline" size={16} color="#6b7280" />
            <Text className="text-gray-600 ml-2 flex-1" numberOfLines={1}>
              {email}
            </Text>
          </View>
          <View className="flex-row items-center">
            <Ionicons name="call-outline" size={16} color="#6b7280" />
            <Text className="text-gray-600 ml-2">{phone}</Text>
          </View>
          <View className="flex-row items-center">
            <Ionicons name="card-outline" size={16} color="#6b7280" />
            <Text className="text-gray-600 ml-2">Aadhaar: {aadhaar}</Text>
          </View>
        </View>
      </View>

      {/* Action Buttons */}
      <View className="flex-row justify-around p-4 space-x-2">
        {/* Edit */}
        <Pressable
          onPress={onEdit}
          className="flex-1 bg-blue-100 px-4 py-2 rounded-xl flex-row justify-center items-center"
        >
          <Ionicons name="create-outline" size={18} color="#3b82f6" />
          <Text className="text-blue-700 font-semibold ml-2">Edit</Text>
        </Pressable>

        {/* View */}
        <Pressable
          onPress={onView}
          className="flex-1 bg-green-100 px-4 py-2 rounded-xl flex-row justify-center items-center"
        >
          <Ionicons name="eye-outline" size={18} color="#059669" />
          <Text className="text-green-700 font-semibold ml-2">View</Text>
        </Pressable>

        {/* Remove */}
        <Pressable
          onPress={onDeactivate}
          className="flex-1 bg-red-100 px-4 py-2 rounded-xl flex-row justify-center items-center"
        >
          <Ionicons name="trash-outline" size={18} color="#ef4444" />
          <Text className="text-red-600 font-semibold ml-2">Remove</Text>
        </Pressable>
      </View>
    </View>
  )
}
