import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { router } from 'expo-router';

const Benefits = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white px-4">
      <Text className="mb-6 text-2xl font-bold text-gray-800">Benefits</Text>

      <Pressable
        className="rounded-lg bg-emerald-600 px-6 py-3"
        onPress={() => router.push('/setup')}>
        <Text className="text-base font-semibold text-white">Start Setup</Text>
      </Pressable>
    </View>
  );
};

export default Benefits;
