import { View, Text, Pressable, ScrollView } from 'react-native';
import React from 'react';
import { router } from 'expo-router';

const rooms = [
  { id: '101', type: 'Deluxe', status: 'Available' },
  { id: '102', type: 'Standard', status: 'Occupied' },
  { id: '103', type: 'Suite', status: 'Maintenance' },
  { id: '104', type: 'Deluxe', status: 'Available' },
];

const AllRooms = () => {
  return (
    <ScrollView className="flex-1 bg-white px-4 pt-16">
      <Text className="mb-6 text-center text-3xl font-bold text-gray-800">All Rooms</Text>

      <View className="space-y-4 pb-8">
        {rooms.map((room) => (
          <Pressable
            key={room.id}
            onPress={() => router.push(`/settings/hotel/rooms/${room.id}`)}
            className="rounded-xl border border-gray-200 bg-gray-100 p-4 shadow-sm">
            <Text className="text-lg font-semibold text-gray-800">Room {room.id}</Text>
            <Text className="text-sm text-gray-600">Type: {room.type}</Text>
            <Text
              className={`mt-1 text-sm ${
                room.status === 'Available'
                  ? 'text-green-600'
                  : room.status === 'Occupied'
                    ? 'text-orange-600'
                    : 'text-red-600'
              }`}>
              Status: {room.status}
            </Text>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
};

export default AllRooms;
