import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { router } from 'expo-router';

const Welcome = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white px-4">
      <Text className="mb-6 text-3xl font-bold text-gray-800">Welcome</Text>

      <Pressable
        className="rounded-lg bg-indigo-600 px-6 py-3"
        onPress={() => router.push('/welcome/features')}>
        <Text className="text-base font-semibold text-white">Go to Features</Text>
      </Pressable>
    </View>
  );
};

export default Welcome;
