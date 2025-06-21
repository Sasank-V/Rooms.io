import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { useLocalSearchParams, router } from 'expo-router';

const StaffDetails = () => {
  const { id } = useLocalSearchParams(); // e.g., /staff/201

  return (
    <View className="flex-1 items-center justify-center bg-white px-4">
      <Text className="mb-6 text-2xl font-bold text-gray-800">Staff Details</Text>

      <View className="mb-6 w-full rounded-xl bg-gray-100 p-4">
        <Text className="text-base text-gray-700">Staff ID: {id}</Text>
        <Text className="text-base text-gray-700">Name: John Smith</Text>
        <Text className="text-base text-gray-700">Role: Front Desk Manager</Text>
        <Text className="text-base text-gray-700">Phone: +91 98765 43210</Text>
        <Text className="text-base text-gray-700">Shift: Evening</Text>
      </View>

      <Pressable className="rounded-lg bg-blue-600 px-6 py-3" onPress={() => router.push('/staff')}>
        <Text className="text-base font-semibold text-white">Back to Staff</Text>
      </Pressable>
    </View>
  );
};

export default StaffDetails;
