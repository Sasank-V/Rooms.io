import { View, Text, ScrollView, Pressable } from 'react-native';
import React from 'react';
import { router } from 'expo-router';

const Guests = () => {
  return (
    <ScrollView className="flex-1 bg-white px-4 pt-12">
      <Text className="mb-6 text-3xl font-bold text-gray-800">Guests</Text>

      {/* Sample guest cards */}
      <View className="mb-10 space-y-4">
        {[1, 2, 3].map((guest) => (
          <Pressable
            key={guest}
            className="rounded-xl border border-gray-200 bg-gray-100 p-4 shadow-sm"
            onPress={() => router.push(`/guests/${guest}`)}>
            <Text className="text-lg font-semibold text-gray-800">Guest #{guest}</Text>
            <Text className="text-sm text-gray-600">Room: 10{guest}</Text>
            <Text className="mt-1 text-sm text-green-700">Status: Checked In</Text>
          </Pressable>
        ))}
      </View>

      {/* Navigation Buttons */}
      <View className="space-y-4">
        <Pressable
          className="rounded-lg bg-blue-600 px-4 py-3"
          onPress={() => router.push('/guests/checkin')}>
          <Text className="text-center text-base font-semibold text-white">Check In Guest</Text>
        </Pressable>

        <Pressable
          className="rounded-lg bg-orange-600 px-4 py-3"
          onPress={() => router.push('/guests/checkout')}>
          <Text className="text-center text-base font-semibold text-white">Check Out Guest</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default Guests;
