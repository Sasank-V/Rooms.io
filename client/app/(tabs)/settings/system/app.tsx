import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { router } from 'expo-router';

const AppSettings = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white px-4">
      <Text className="mb-6 text-2xl font-bold text-gray-800">App Configuration</Text>

      <View className="mb-6 w-full space-y-2 rounded-xl bg-gray-100 p-4">
        <Text className="text-base text-gray-700">App Version: 1.0.0</Text>
        <Text className="text-base text-gray-700">Environment: Production</Text>
        <Text className="text-base text-gray-700">Auto Updates: Enabled</Text>
        <Text className="text-base text-gray-700">Theme: Light</Text>
      </View>

      <Pressable
        className="rounded-lg bg-blue-600 px-6 py-3"
        onPress={() => router.push('/settings/system')}>
        <Text className="text-base font-semibold text-white">Back to System Settings</Text>
      </Pressable>
    </View>
  );
};

export default AppSettings;
