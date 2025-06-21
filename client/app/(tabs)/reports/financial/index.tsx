import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { router } from 'expo-router';

const Financial = () => {
  return (
    <View className="flex-1 bg-white px-4 pt-16">
      <Text className="mb-8 text-center text-3xl font-bold text-gray-800">Financial Reports</Text>

      <View className="space-y-6">
        <Pressable
          className="rounded-lg bg-blue-600 px-6 py-4"
          onPress={() => router.push('/reports/financial/daily')}>
          <Text className="text-center text-base font-semibold text-white">Daily Report</Text>
        </Pressable>

        <Pressable
          className="rounded-lg bg-purple-600 px-6 py-4"
          onPress={() => router.push('/reports/financial/monthly')}>
          <Text className="text-center text-base font-semibold text-white">Monthly Report</Text>
        </Pressable>

        <Pressable
          className="rounded-lg bg-indigo-600 px-6 py-4"
          onPress={() => router.push('/reports/financial/payment-analysis')}>
          <Text className="text-center text-base font-semibold text-white">Payment Analysis</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Financial;
