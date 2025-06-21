import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { router } from 'expo-router';
import { CheckOutStages } from '~/constants/stages';

const guestId = '101';

const CheckOutIndex = () => {
  return (
    <View className="flex-1 bg-white px-4 pt-16">
      <Text className="mb-6 text-center text-2xl font-bold text-gray-800">Guest Checkout Flow</Text>

      <View className="mb-10 space-y-4">
        {CheckOutStages.map((stage, index) => (
          <View
            key={stage.path}
            className="flex-row items-center gap-3 rounded-lg bg-gray-100 px-4 py-3">
            <Text className="text-lg font-semibold text-gray-700">{index + 1}.</Text>
            <Text className="text-base text-gray-800">{stage.name}</Text>
          </View>
        ))}
      </View>

      <Pressable
        onPress={() => router.push(`/guests/checkout/${guestId}/bill`)}
        className="self-center rounded-lg bg-blue-600 px-6 py-4">
        <Text className="text-base font-semibold text-white">Start Checkout</Text>
      </Pressable>
    </View>
  );
};

export default CheckOutIndex;
