import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { router } from 'expo-router';

const Monthly = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white px-4">
      <Text className="mb-6 text-2xl font-bold text-gray-800">Monthly Report</Text>

      <View className="mb-6 w-full rounded-xl bg-gray-100 p-4">
        <Text className="text-base text-gray-700">Month: June 2025</Text>
        <Text className="text-base text-gray-700">Total Revenue: ₹7,20,000</Text>
        <Text className="text-base text-gray-700">Total Bookings: 540</Text>
        <Text className="text-base text-gray-700">Refunds Issued: ₹15,000</Text>
      </View>

      <Pressable
        className="rounded-lg bg-purple-600 px-6 py-3"
        onPress={() => router.push('/reports/financial')}>
        <Text className="text-base font-semibold text-white">Back to Financial Reports</Text>
      </Pressable>
    </View>
  );
};

export default Monthly;
