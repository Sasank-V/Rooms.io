import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { router } from 'expo-router';

const Roles = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white px-4">
      <Text className="mb-6 text-2xl font-bold text-gray-800">User Roles</Text>

      <View className="mb-6 w-full space-y-2 rounded-xl bg-gray-100 p-4">
        <Text className="text-base text-gray-700">• Admin – Full access</Text>
        <Text className="text-base text-gray-700">• Manager – Moderate access</Text>
        <Text className="text-base text-gray-700">• Staff – Limited access</Text>
        <Text className="text-base text-gray-700">• Viewer – Read-only</Text>
      </View>

      <Pressable
        className="rounded-lg bg-blue-600 px-6 py-3"
        onPress={() => router.push('/settings/users')}>
        <Text className="text-base font-semibold text-white">Back to User Settings</Text>
      </Pressable>
    </View>
  );
};

export default Roles;
