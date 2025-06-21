import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { router } from 'expo-router';

const AddRoom = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white px-4">
      <Text className="mb-6 text-2xl font-bold text-gray-800">Add New Room</Text>

      <View className="mb-6 w-full rounded-xl bg-gray-100 p-4">
        <Text className="text-base text-gray-700">Room Number: 105</Text>
        <Text className="text-base text-gray-700">Type: Deluxe</Text>
        <Text className="text-base text-gray-700">Beds: 1 King</Text>
        <Text className="text-base text-gray-700">Rate: ₹2,500/night</Text>
      </View>

      <Pressable
        className="rounded-lg bg-blue-600 px-6 py-3"
        onPress={() => router.push('/settings/hotel/rooms')}>
        <Text className="text-base font-semibold text-white">Back to Rooms</Text>
      </Pressable>
    </View>
  );
};

export default AddRoom;
