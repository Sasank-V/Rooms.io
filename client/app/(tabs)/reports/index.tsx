import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { router } from 'expo-router';

const Reports = () => {
  return (
    <View className="flex-1 bg-white px-4 pt-16">
      <Text className="mb-8 text-3xl font-bold text-gray-800">Reports</Text>

      <View className="space-y-6">
        <Pressable
          className="rounded-lg bg-blue-600 px-6 py-4"
          onPress={() => router.push('/reports/financial')}>
          <Text className="text-center text-base font-semibold text-white">Financial Reports</Text>
        </Pressable>

        <Pressable
          className="rounded-lg bg-green-600 px-6 py-4"
          onPress={() => router.push('/reports/operational')}>
          <Text className="text-center text-base font-semibold text-white">
            Operational Reports
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Reports;
