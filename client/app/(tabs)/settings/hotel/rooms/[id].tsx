import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { useLocalSearchParams, router } from 'expo-router';

const RoomDetails = () => {
  const { id } = useLocalSearchParams(); // Access room ID from the route

  return (
    <View className="flex-1 items-center justify-center bg-white px-4">
      <Text className="mb-6 text-2xl font-bold text-gray-800">Room {id} Details</Text>

      <View className="mb-6 w-full rounded-xl bg-gray-100 p-4">
        <Text className="text-base text-gray-700">Room Type: Deluxe</Text>
        <Text className="text-base text-gray-700">Status: Available</Text>
        <Text className="text-base text-gray-700">Beds: 1 King</Text>
        <Text className="text-base text-gray-700">Rate: ₹2,500/night</Text>
        <Text className="text-base text-gray-700">AC: Yes</Text>
      </View>

      <Pressable
        className="rounded-lg bg-blue-600 px-6 py-3"
        onPress={() => router.push('/settings/hotel/rooms')}>
        <Text className="text-base font-semibold text-white">Back to All Rooms</Text>
      </Pressable>
    </View>
  );
};

export default RoomDetails;
