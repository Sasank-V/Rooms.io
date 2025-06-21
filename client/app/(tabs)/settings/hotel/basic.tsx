import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { router } from 'expo-router';

const Basic = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white px-4">
      <Text className="mb-6 text-2xl font-bold text-gray-800">Basic Hotel Info</Text>

      <View className="mb-6 w-full rounded-xl bg-gray-100 p-4">
        <Text className="text-base text-gray-700">Hotel Name: Oceanview Residency</Text>
        <Text className="text-base text-gray-700">Address: 123 Beach Road, Goa</Text>
        <Text className="text-base text-gray-700">Phone: +91 98765 43210</Text>
        <Text className="text-base text-gray-700">Email: info@oceanview.com</Text>
      </View>

      <Pressable
        className="rounded-lg bg-blue-600 px-6 py-3"
        onPress={() => router.push('/settings/hotel')}>
        <Text className="text-base font-semibold text-white">Back to Hotel Settings</Text>
      </Pressable>
    </View>
  );
};

export default Basic;
