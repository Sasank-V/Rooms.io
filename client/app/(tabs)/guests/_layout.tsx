// app/(tabs)/guests/_layout.tsx
import { Stack } from 'expo-router';

export default function GuestsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="[id]" />
      <Stack.Screen name="checkin" />
      <Stack.Screen name="checkout" />
    </Stack>
  );
}
