import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { router } from 'expo-router';

const Shifts = () => {
  return (
    <View className="flex-1 bg-white px-4 pt-16">
      <Text className="mb-8 text-center text-3xl font-bold text-gray-800">Staff Shifts</Text>

      <View className="space-y-6">
        <Pressable
          className="rounded-lg bg-blue-600 px-6 py-4"
          onPress={() => router.push('/staff/shifts/handover')}>
          <Text className="text-center text-base font-semibold text-white">Shift Handover</Text>
        </Pressable>

        <Pressable
          className="rounded-lg bg-green-600 px-6 py-4"
          onPress={() => router.push('/staff/shifts/activity')}>
          <Text className="text-center text-base font-semibold text-white">Shift Activity Log</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Shifts;
