import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { router } from 'expo-router';

const IdCapture = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white px-4">
      <Text className="mb-6 text-2xl font-bold text-gray-800">ID Capture</Text>

      <View className="mb-6 h-40 w-full items-center justify-center rounded-xl bg-gray-200">
        <Text className="text-sm text-gray-500">[Camera Preview Placeholder]</Text>
      </View>

      <Text className="mb-4 text-center text-gray-700">
        Scan the guest&apos;s ID using the camera, or enter details manually.
      </Text>

      <Pressable
        className="rounded-lg bg-blue-600 px-6 py-3"
        onPress={() => router.push('/guests/checkin/info')}>
        <Text className="text-base font-semibold text-white">Next</Text>
      </Pressable>
    </View>
  );
};

export default IdCapture;
