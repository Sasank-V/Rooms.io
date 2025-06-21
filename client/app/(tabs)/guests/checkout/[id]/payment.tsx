import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { router, useLocalSearchParams } from 'expo-router';

const Payment = () => {
  const { id } = useLocalSearchParams(); // guest ID from route param

  return (
    <View className="flex-1 items-center justify-center bg-white px-4">
      <Text className="mb-6 text-2xl font-bold text-gray-800">Payment Collection</Text>

      <View className="mb-6 w-full rounded-xl bg-gray-100 p-4">
        <Text className="text-base text-gray-700">Total Bill: ₹5,540</Text>
        <Text className="text-base text-gray-700">Paid via UPI</Text>
        <Text className="mt-2 font-semibold text-green-700">Payment Received</Text>
      </View>

      <Pressable
        className="rounded-lg bg-green-600 px-6 py-3"
        onPress={() => router.push(`/guests/checkout/${id}/handover`)}>
        <Text className="text-base font-semibold text-white">Proceed to Handover</Text>
      </Pressable>
    </View>
  );
};

export default Payment;
