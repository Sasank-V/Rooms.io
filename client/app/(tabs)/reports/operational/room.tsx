import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { router } from 'expo-router';

const Room = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white px-4">
      <Text className="mb-6 text-2xl font-bold text-gray-800">Room Report</Text>

      <View className="mb-6 w-full rounded-xl bg-gray-100 p-4">
        <Text className="text-base text-gray-700">• Total Rooms: 60</Text>
        <Text className="text-base text-gray-700">• Occupied: 34</Text>
        <Text className="text-base text-gray-700">• Vacant: 24</Text>
        <Text className="text-base text-gray-700">• Under Maintenance: 2</Text>
      </View>

      <Pressable
        className="rounded-lg bg-blue-600 px-6 py-3"
        onPress={() => router.push('/reports/operational')}>
        <Text className="text-base font-semibold text-white">Back to Operational Reports</Text>
      </Pressable>
    </View>
  );
};

export default Room;
