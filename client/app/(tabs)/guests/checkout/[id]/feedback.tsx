import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { router } from 'expo-router';

const Feedback = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white px-4">
      <Text className="mb-4 text-2xl font-bold text-gray-800">Feedback Collected 🎉</Text>
      <Text className="mb-8 text-center text-base text-gray-600">
        Thank you for completing the checkout process. Guest feedback has been recorded.
      </Text>

      <Pressable
        className="rounded-lg bg-blue-600 px-6 py-3"
        onPress={() => router.push('/guests')}>
        <Text className="text-base font-semibold text-white">Back to Guests</Text>
      </Pressable>
    </View>
  );
};

export default Feedback;
