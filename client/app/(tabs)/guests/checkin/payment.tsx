import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { router } from 'expo-router';

const Payment = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white px-4">
      <Text className="mb-6 text-2xl font-bold text-gray-800">Payment Setup</Text>

      <View className="mb-6 w-full rounded-xl bg-gray-100 p-4">
        <Text className="text-base text-gray-700">Room Charge: ₹1,500</Text>
        <Text className="text-base text-gray-700">GST: ₹270</Text>
        <Text className="mt-2 text-base font-semibold text-gray-700">Total: ₹1,770</Text>
      </View>

      <Pressable
        className="rounded-lg bg-blue-600 px-6 py-3"
        onPress={() => router.push('/guests/checkin/confirm')}>
        <Text className="text-base font-semibold text-white">Confirm Check-In</Text>
      </Pressable>
    </View>
  );
};

export default Payment;
