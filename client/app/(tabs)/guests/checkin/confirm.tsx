import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { router } from 'expo-router';

const Confirm = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white px-4">
      <Text className="mb-4 text-2xl font-bold text-gray-800">Check-In Complete 🎉</Text>
      <Text className="mb-8 text-center text-base text-gray-600">
        Guest has been successfully checked in.
      </Text>

      <Pressable
        className="rounded-lg bg-green-600 px-6 py-3"
        onPress={() => router.push('/guests')}>
        <Text className="text-base font-semibold text-white">Go to Guest List</Text>
      </Pressable>
    </View>
  );
};

export default Confirm;
