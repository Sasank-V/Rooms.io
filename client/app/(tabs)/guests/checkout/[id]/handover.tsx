import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { router, useLocalSearchParams } from 'expo-router';

const Handover = () => {
  const { id } = useLocalSearchParams(); // guest ID from route

  return (
    <View className="flex-1 items-center justify-center bg-white px-4">
      <Text className="mb-6 text-2xl font-bold text-gray-800">Room Handover</Text>

      <View className="mb-6 w-full rounded-xl bg-gray-100 p-4">
        <Text className="text-base text-gray-700">Room cleaned and key returned</Text>
        <Text className="text-base text-gray-700">Mini-bar checked: No items missing</Text>
        <Text className="mt-2 font-semibold text-green-700">Handover Successful</Text>
      </View>

      <Pressable
        className="rounded-lg bg-purple-600 px-6 py-3"
        onPress={() => router.push(`/guests/checkout/${id}/feedback`)}>
        <Text className="text-base font-semibold text-white">Collect Feedback</Text>
      </Pressable>
    </View>
  );
};

export default Handover;
