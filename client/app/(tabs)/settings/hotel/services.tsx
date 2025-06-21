import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { router } from 'expo-router';

const Services = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white px-4">
      <Text className="mb-6 text-2xl font-bold text-gray-800">Hotel Services</Text>

      <View className="mb-6 w-full space-y-2 rounded-xl bg-gray-100 p-4">
        <Text className="text-base text-gray-700">• Room Service</Text>
        <Text className="text-base text-gray-700">• Laundry</Text>
        <Text className="text-base text-gray-700">• Airport Pickup</Text>
        <Text className="text-base text-gray-700">• Breakfast Buffet</Text>
        <Text className="text-base text-gray-700">• Spa & Wellness</Text>
      </View>

      <Pressable
        className="rounded-lg bg-blue-600 px-6 py-3"
        onPress={() => router.push('/settings/hotel')}>
        <Text className="text-base font-semibold text-white">Back to Hotel Settings</Text>
      </Pressable>
    </View>
  );
};

export default Services;
