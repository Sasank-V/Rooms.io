// app/(tabs)/reports/operational/_layout.tsx
import { Stack } from 'expo-router';

export default function OperationalLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="room" />
      <Stack.Screen name="guest" />
      <Stack.Screen name="staff" />
    </Stack>
  );
}
