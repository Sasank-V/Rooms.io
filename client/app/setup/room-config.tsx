import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { router } from 'expo-router';

const RoomConfig = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white px-4">
      <Text className="mb-6 text-2xl font-bold text-gray-800">Room Configuration</Text>

      <Pressable
        className="rounded-lg bg-green-600 px-6 py-3"
        onPress={() => router.push('/setup/payment')}>
        <Text className="text-base font-semibold text-white">Continue to Payment Setup</Text>
      </Pressable>
    </View>
  );
};

export default RoomConfig;
