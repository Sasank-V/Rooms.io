import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { router } from 'expo-router';
import { AuthService } from '~/services/user/AuthService';

const SplashScreen = () => {
  // Example test signup handler
  const handleTestSignup = async () => {
    const response = await AuthService.signUp({
      firstName: 'Test',
      lastName: 'User',
      phone: '9999999999',
      email: 'testuser@example.com',
      aadharNumber: '123412341234',
      password: 'testpassword',
      role: 'ADMIN',
    });
    // You can log or display the response as needed
    alert(response.message);
  };

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="mb-6 text-2xl font-bold text-gray-800">SplashScreen</Text>

      <Pressable className="mb-4 rounded-full bg-blue-600 px-6 py-3" onPress={handleTestSignup}>
        <Text className="text-base font-semibold text-white">Test Signup</Text>
      </Pressable>

      <Pressable
        className="rounded-full bg-blue-600 px-6 py-3"
        onPress={() => router.push('/license')}>
        <Text className="text-base font-semibold text-white">Go to License Screen</Text>
      </Pressable>
    </View>
  );
};

export default SplashScreen;
