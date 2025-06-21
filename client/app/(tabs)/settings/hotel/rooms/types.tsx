import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { router } from 'expo-router';

const roomTypes = [
  { name: 'Standard', rate: '₹1,500/night', beds: '1 Queen' },
  { name: 'Deluxe', rate: '₹2,500/night', beds: '1 King' },
  { name: 'Suite', rate: '₹4,000/night', beds: '2 King + Living Area' },
];

const Types = () => {
  return (
    <View className="flex-1 bg-white px-4 pt-16">
      <Text className="mb-6 text-center text-2xl font-bold text-gray-800">Room Types</Text>

      <View className="mb-8 space-y-4">
        {roomTypes.map((type, index) => (
          <View
            key={index}
            className="rounded-xl border border-gray-200 bg-gray-100 px-4 py-3 shadow-sm">
            <Text className="text-lg font-semibold text-gray-800">{type.name}</Text>
            <Text className="text-sm text-gray-600">Beds: {type.beds}</Text>
            <Text className="text-sm text-gray-600">Rate: {type.rate}</Text>
          </View>
        ))}
      </View>

      <Pressable
        className="self-center rounded-lg bg-blue-600 px-6 py-3"
        onPress={() => router.push('/settings/hotel/rooms')}>
        <Text className="text-base font-semibold text-white">Back to Rooms</Text>
      </Pressable>
    </View>
  );
};

export default Types;
