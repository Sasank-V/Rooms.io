// app/(tabs)/settings/users/_layout.tsx

import { Stack } from 'expo-router';

export default function UsersLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="roles" />
      <Stack.Screen name="accounts" />
      <Stack.Screen name="admin" />
    </Stack>
  );
}
