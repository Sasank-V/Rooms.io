import { View, Text, Pressable, ScrollView } from 'react-native';
import React from 'react';
import { router } from 'expo-router';

const staffList = [
  { id: '101', name: 'John Smith', role: 'Manager' },
  { id: '102', name: 'Jane Doe', role: 'Receptionist' },
  { id: '103', name: 'Alex Thomas', role: 'Housekeeping' },
  { id: '104', name: 'Sara Khan', role: 'Chef' },
];

const Management = () => {
  return (
    <ScrollView className="flex-1 bg-white px-4 pt-16">
      <Text className="mb-6 text-center text-3xl font-bold text-gray-800">Staff Management</Text>

      <View className="space-y-4">
        {staffList.map((staff) => (
          <Pressable
            key={staff.id}
            className="rounded-xl border border-gray-200 bg-gray-100 px-4 py-3 shadow-sm"
            onPress={() => router.push(`/staff/${staff.id}`)}>
            <Text className="text-lg font-semibold text-gray-800">{staff.name}</Text>
            <Text className="text-sm text-gray-600">{staff.role}</Text>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
};

export default Management;
