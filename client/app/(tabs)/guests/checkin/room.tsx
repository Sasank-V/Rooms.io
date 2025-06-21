import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { router } from 'expo-router';

const Room = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white px-4">
      <Text className="mb-6 text-2xl font-bold text-gray-800">Room Selection</Text>

      <View className="mb-6 w-full rounded-xl bg-gray-100 p-4">
        <Text className="text-base text-gray-700">Available Room: 203</Text>
        <Text className="text-base text-gray-700">Type: Deluxe</Text>
        <Text className="text-base text-gray-700">Price: ₹1,500/night</Text>
      </View>

      <Pressable
        className="rounded-lg bg-blue-600 px-6 py-3"
        onPress={() => router.push('/guests/checkin/payment')}>
        <Text className="text-base font-semibold text-white">Continue to Payment Setup</Text>
      </Pressable>
    </View>
  );
};

export default Room;
