'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, Button } from 'react-native';

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Fake login function
  const handleLogin = async () => {
    setLoading(true);

    // simulate API login delay
    setTimeout(() => {
      const role = 'ADMIN'; // or 'STAFF' — replace with actual login logic
      // const role = 'STAFF'; // or 'STAFF' — replace with actual login logic

      if (role === 'ADMIN') {
        router.replace('/(admin)/dashboard');
      } else {
        router.replace('/(staff)/dashboard');
      }

      setLoading(false);
    }, 1000);
  };

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="mb-4 text-xl font-bold">Login</Text>
      <Button
        title={loading ? 'Logging in...' : 'Login'}
        onPress={handleLogin}
        disabled={loading}
      />
    </View>
  );
}
