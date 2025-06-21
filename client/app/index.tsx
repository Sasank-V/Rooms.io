import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { router } from 'expo-router';

const SplashScreen = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="mb-6 text-2xl font-bold text-gray-800">SplashScreen</Text>

      <Pressable
        className="rounded-full bg-blue-600 px-6 py-3"
        onPress={() => router.push('/license')}>
        <Text className="text-base font-semibold text-white">Go to License Screen</Text>
      </Pressable>
    </View>
  );
};

export default SplashScreen;
