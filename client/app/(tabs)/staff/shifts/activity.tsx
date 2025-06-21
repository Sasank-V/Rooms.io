import { View, Text, Pressable, ScrollView } from 'react-native';
import React from 'react';
import { router } from 'expo-router';

const shiftLogs = [
  { time: '08:00 AM', activity: 'John started front desk shift' },
  { time: '10:15 AM', activity: 'Jane completed housekeeping round' },
  { time: '01:00 PM', activity: 'Alex handed over keys to guest 302' },
  { time: '03:30 PM', activity: 'Sara logged kitchen stock update' },
];

const Activity = () => {
  return (
    <ScrollView className="flex-1 bg-white px-4 pt-16">
      <Text className="mb-6 text-center text-2xl font-bold text-gray-800">Shift Activity Log</Text>

      <View className="mb-10 space-y-4">
        {shiftLogs.map((log, index) => (
          <View
            key={index}
            className="rounded-lg border border-gray-200 bg-gray-100 px-4 py-3 shadow-sm">
            <Text className="text-sm text-gray-600">{log.time}</Text>
            <Text className="text-base text-gray-800">{log.activity}</Text>
          </View>
        ))}
      </View>

      <Pressable
        className="self-center rounded-lg bg-blue-600 px-6 py-3"
        onPress={() => router.push('/staff/shifts')}>
        <Text className="text-base font-semibold text-white">Back to Shifts</Text>
      </Pressable>
    </ScrollView>
  );
};

export default Activity;
