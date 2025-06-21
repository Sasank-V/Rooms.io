import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { router } from 'expo-router';

const ResetPassword = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white px-4">
      <Text className="mb-6 text-2xl font-bold text-gray-800">Reset Password</Text>
      <Text className="mb-8 text-center text-base text-gray-600">
        Your password has been reset successfully.
      </Text>

      <Pressable
        className="rounded-lg bg-blue-600 px-6 py-3"
        onPress={() => router.push('/auth/login')}>
        <Text className="text-base font-semibold text-white">Back to Login</Text>
      </Pressable>
    </View>
  );
};

export default ResetPassword;
