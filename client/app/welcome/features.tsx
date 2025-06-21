import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { router } from 'expo-router';

const Features = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white px-4">
      <Text className="mb-6 text-2xl font-bold text-gray-800">Features</Text>

      <Pressable
        className="rounded-lg bg-purple-600 px-6 py-3"
        onPress={() => router.push('/welcome/benefits')}>
        <Text className="text-base font-semibold text-white">Go to Benefits</Text>
      </Pressable>
    </View>
  );
};

export default Features;
