import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { router, useLocalSearchParams } from 'expo-router';

const Bill = () => {
  const { id } = useLocalSearchParams(); // guest ID from dynamic route

  return (
    <View className="flex-1 items-center justify-center bg-white px-4">
      <Text className="mb-6 text-2xl font-bold text-gray-800">Bill Summary</Text>

      <View className="mb-6 w-full rounded-xl bg-gray-100 p-4">
        <Text className="text-base text-gray-700">Room Charges: ₹4,500</Text>
        <Text className="text-base text-gray-700">Service Charges: ₹500</Text>
        <Text className="text-base text-gray-700">Taxes: ₹540</Text>
        <Text className="mt-2 text-base font-semibold text-gray-800">Total: ₹5,540</Text>
      </View>

      <Pressable
        className="rounded-lg bg-blue-600 px-6 py-3"
        onPress={() => router.push(`/guests/checkout/${id}/payment`)}>
        <Text className="text-base font-semibold text-white">Continue to Payment</Text>
      </Pressable>
    </View>
  );
};

export default Bill;
