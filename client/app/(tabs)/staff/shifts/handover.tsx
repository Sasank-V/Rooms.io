import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { router } from 'expo-router';

const Handover = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white px-4">
      <Text className="mb-6 text-2xl font-bold text-gray-800">Shift Handover</Text>

      <View className="mb-6 w-full rounded-xl bg-gray-100 p-4">
        <Text className="text-base text-gray-700">From: John Smith (Morning Shift)</Text>
        <Text className="text-base text-gray-700">To: Jane Doe (Evening Shift)</Text>
        <Text className="mt-2 text-base text-gray-700">Notes:</Text>
        <Text className="text-sm text-gray-600">
          • All guest check-ins completed.{'\n'}• Housekeeping for room 204 pending.{'\n'}• Cash
          drawer balanced and logged.
        </Text>
      </View>

      <Pressable
        className="rounded-lg bg-blue-600 px-6 py-3"
        onPress={() => router.push('/staff/shifts')}>
        <Text className="text-base font-semibold text-white">Back to Shifts</Text>
      </Pressable>
    </View>
  );
};

export default Handover;
