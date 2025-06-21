import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { router } from 'expo-router';

const stages = ['ID Capture', 'Guest Info', 'Room Selection', 'Payment Setup', 'Confirmation'];

const CheckinIndex = () => {
  return (
    <View className="flex-1 bg-white px-4 pt-16">
      <Text className="mb-6 text-center text-2xl font-bold text-gray-800">
        Guest Check-In Stages
      </Text>

      <View className="space-y-4">
        {stages.map((stage, index) => (
          <View
            key={stage}
            className="flex-row items-center gap-3 rounded-lg bg-gray-100 px-4 py-3">
            <Text className="text-lg font-semibold text-gray-700">{index + 1}.</Text>
            <Text className="text-base text-gray-800">{stage}</Text>
          </View>
        ))}
      </View>

      <Pressable
        onPress={() => router.push('/guests/checkin/id-capture')}
        className="mt-10 self-center rounded-lg bg-blue-600 px-6 py-4">
        <Text className="text-base font-semibold text-white">Start Check-In</Text>
      </Pressable>
    </View>
  );
};

export default CheckinIndex;
