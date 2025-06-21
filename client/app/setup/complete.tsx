import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { router } from 'expo-router';

const Complete = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white px-4">
      <Text className="mb-6 text-2xl font-bold text-gray-800">Setup Complete 🎉</Text>
      <Text className="mb-8 text-center text-base text-gray-600">
        Your hotel system is now ready to use.
      </Text>

      <Pressable
        className="rounded-lg bg-green-600 px-6 py-3"
        onPress={() => router.push('/auth/login')}>
        <Text className="text-base font-semibold text-white">Go to Login</Text>
      </Pressable>
    </View>
  );
};

export default Complete;
