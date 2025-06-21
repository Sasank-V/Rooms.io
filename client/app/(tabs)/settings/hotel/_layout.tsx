// app/(tabs)/settings/hotel/_layout.tsx
import { Stack } from 'expo-router';

export default function HotelSettingsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="basic" />
      <Stack.Screen name="rooms" />
      <Stack.Screen name="services" />
    </Stack>
  );
}
