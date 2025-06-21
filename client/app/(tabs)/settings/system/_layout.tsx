// app/(tabs)/settings/system/_layout.tsx
import { Stack } from 'expo-router';

export default function SystemLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="app" />
      <Stack.Screen name="data" />
      <Stack.Screen name="support" />
    </Stack>
  );
}
