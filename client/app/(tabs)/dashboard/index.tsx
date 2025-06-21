import { View, Text, ScrollView } from 'react-native';
import React from 'react';

const Dashboard = () => {
  return (
    <ScrollView className="flex-1 bg-white px-4 pt-12">
      <Text className="mb-4 text-3xl font-bold text-gray-800">Dashboard</Text>

      <View className="mb-4 rounded-xl bg-blue-100 p-4 shadow-sm">
        <Text className="text-lg font-medium text-blue-900">Today&apos;s Overview</Text>
        <Text className="mt-1 text-sm text-blue-800">Rooms, guests, and tasks summary</Text>
      </View>

      <View className="mb-4 rounded-xl bg-green-100 p-4 shadow-sm">
        <Text className="text-lg font-medium text-green-900">Check-ins</Text>
        <Text className="mt-1 text-sm text-green-800">X guests scheduled today</Text>
      </View>

      <View className="mb-4 rounded-xl bg-yellow-100 p-4 shadow-sm">
        <Text className="text-lg font-medium text-yellow-900">Pending Tasks</Text>
        <Text className="mt-1 text-sm text-yellow-800">3 housekeeping requests open</Text>
      </View>

      <View className="mb-12 rounded-xl bg-red-100 p-4 shadow-sm">
        <Text className="text-lg font-medium text-red-900">Alerts</Text>
        <Text className="mt-1 text-sm text-red-800">1 maintenance issue unresolved</Text>
      </View>
    </ScrollView>
  );
};

export default Dashboard;
