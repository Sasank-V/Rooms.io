import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { router } from 'expo-router';

const Login = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white px-4">
      <Text className="mb-6 text-2xl font-bold text-gray-800">Login</Text>

      <Pressable
        className="mb-4 rounded-lg bg-blue-600 px-6 py-3"
        onPress={() => router.push('/dashboard')}>
        <Text className="text-base font-semibold text-white">Login</Text>
      </Pressable>

      <Pressable onPress={() => router.push('/auth/reset-password')}>
        <Text className="text-sm text-blue-500 underline">Forgot Password?</Text>
      </Pressable>
    </View>
  );
};

export default Login;
