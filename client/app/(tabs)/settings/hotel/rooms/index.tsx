import { View, Text, Pressable } from 'react-native';
import { router } from 'expo-router';
import React from 'react';

const Rooms = () => {
  return (
    <View className="flex-1 bg-white px-4 pt-16">
      <Text className="mb-8 text-center text-3xl font-bold text-gray-800">Room Settings</Text>

      <View className="space-y-6">
        <Pressable
          className="rounded-lg bg-blue-600 px-6 py-4"
          onPress={() => router.push(`/settings/hotel/rooms/all`)}>
          <Text className="text-center text-base font-semibold text-white">View Rooms</Text>
        </Pressable>

        <Pressable
          className="rounded-lg bg-purple-600 px-6 py-4"
          onPress={() => router.push('/settings/hotel/rooms/types')}>
          <Text className="text-center text-base font-semibold text-white">Manage Room Types</Text>
        </Pressable>

        <Pressable
          className="rounded-lg bg-green-600 px-6 py-4"
          onPress={() => router.push('/settings/hotel/rooms/add')}>
          <Text className="text-center text-base font-semibold text-white">Add New Room</Text>
        </Pressable>
      </View>

      <Pressable
        className="mt-10 self-center rounded-lg bg-gray-700 px-6 py-4"
        onPress={() => router.push('/settings/hotel')}>
        <Text className="text-center text-base font-semibold text-white">
          Back to Hotel Settings
        </Text>
      </Pressable>
    </View>
  );
};

export default Rooms;
