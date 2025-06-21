import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { router } from 'expo-router';

const Info = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white px-4">
      <Text className="mb-6 text-2xl font-bold text-gray-800">Guest Information</Text>

      <View className="mb-6 w-full rounded-xl bg-gray-100 p-4">
        <Text className="text-base text-gray-700">Name: John Doe</Text>
        <Text className="text-base text-gray-700">Phone: +91 9876543210</Text>
        <Text className="text-base text-gray-700">Email: john@example.com</Text>
        <Text className="text-base text-gray-700">Guests: 2 Adults</Text>
      </View>

      <Pressable
        className="rounded-lg bg-blue-600 px-6 py-3"
        onPress={() => router.push('/guests/checkin/room')}>
        <Text className="text-base font-semibold text-white">Continue to Room Selection</Text>
      </Pressable>
    </View>
  );
};

export default Info;
