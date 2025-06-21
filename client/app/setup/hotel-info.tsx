import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { router } from 'expo-router';

const HotelInfo = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white px-4">
      <Text className="mb-6 text-2xl font-bold text-gray-800">Hotel Info</Text>

      <Pressable
        className="rounded-lg bg-blue-600 px-6 py-3"
        onPress={() => router.push('/setup/room-config')}>
        <Text className="text-base font-semibold text-white">Continue to Room Config</Text>
      </Pressable>
    </View>
  );
};

export default HotelInfo;
