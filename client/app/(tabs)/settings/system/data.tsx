import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { router } from 'expo-router';

const Data = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white px-4">
      <Text className="mb-6 text-2xl font-bold text-gray-800">Data & Backups</Text>

      <View className="mb-6 w-full space-y-2 rounded-xl bg-gray-100 p-4">
        <Text className="text-base text-gray-700">Last Backup: June 20, 2025</Text>
        <Text className="text-base text-gray-700">Auto-backup: Enabled (daily at 2 AM)</Text>
        <Text className="text-base text-gray-700">Storage Used: 1.2 GB</Text>
        <Text className="text-base text-gray-700">Retention: 30 days</Text>
      </View>

      <Pressable
        className="rounded-lg bg-blue-600 px-6 py-3"
        onPress={() => router.push('/settings/system')}>
        <Text className="text-base font-semibold text-white">Back to System Settings</Text>
      </Pressable>
    </View>
  );
};

export default Data;
