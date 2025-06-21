import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { router } from 'expo-router';

const Add = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white px-4">
      <Text className="mb-6 text-2xl font-bold text-gray-800">Add New Staff</Text>

      <View className="mb-6 w-full rounded-xl bg-gray-100 p-4">
        <Text className="text-base text-gray-700">Name: Jane Doe</Text>
        <Text className="text-base text-gray-700">Role: Receptionist</Text>
        <Text className="text-base text-gray-700">Shift: Morning</Text>
      </View>

      <Pressable className="rounded-lg bg-blue-600 px-6 py-3" onPress={() => router.push('/staff')}>
        <Text className="text-base font-semibold text-white">Back to Staff</Text>
      </Pressable>
    </View>
  );
};

export default Add;
