// app/(tabs)/settings/hotel/rooms/_layout.tsx
import { Stack } from 'expo-router';

export default function HotelRoomsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="all" />
      <Stack.Screen name="[id]" />
      <Stack.Screen name="types" />
      <Stack.Screen name="add" />
    </Stack>
  );
}
