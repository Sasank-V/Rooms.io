import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { router } from 'expo-router';

const Settings = () => {
  return (
    <View className="flex-1 bg-white px-4 pt-16">
      <Text className="mb-8 text-3xl font-bold text-gray-800">Settings</Text>

      <View className="space-y-6">
        <Pressable
          className="rounded-lg bg-blue-600 px-6 py-4"
          onPress={() => router.push('/settings/hotel')}>
          <Text className="text-center text-base font-semibold text-white">Hotel Info</Text>
        </Pressable>

        <Pressable
          className="rounded-lg bg-purple-600 px-6 py-4"
          onPress={() => router.push('/settings/users')}>
          <Text className="text-center text-base font-semibold text-white">User Management</Text>
        </Pressable>

        <Pressable
          className="rounded-lg bg-gray-800 px-6 py-4"
          onPress={() => router.push('/settings/system')}>
          <Text className="text-center text-base font-semibold text-white">System Settings</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Settings;
