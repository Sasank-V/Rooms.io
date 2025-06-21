// app/(tabs)/staff/_layout.tsx
import { Stack } from 'expo-router';

export default function StaffLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="[id]" />
      <Stack.Screen name="management" />
      <Stack.Screen name="add" />
      <Stack.Screen name="shifts" />
    </Stack>
  );
}
