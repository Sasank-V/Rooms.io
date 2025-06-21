// app/(tabs)/staff/shifts/_layout.tsx
import { Stack } from 'expo-router';

export default function ShiftsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="handover" />
      <Stack.Screen name="activity" />
    </Stack>
  );
}
