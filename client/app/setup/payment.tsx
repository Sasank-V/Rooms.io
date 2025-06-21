import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { router } from 'expo-router';

const Payment = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white px-4">
      <Text className="mb-6 text-2xl font-bold text-gray-800">Payment Setup</Text>

      <Pressable
        className="rounded-lg bg-blue-600 px-6 py-3"
        onPress={() => router.push('/setup/admin')}>
        <Text className="text-base font-semibold text-white">Continue to Admin Setup</Text>
      </Pressable>
    </View>
  );
};

export default Payment;
