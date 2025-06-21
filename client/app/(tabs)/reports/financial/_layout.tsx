// app/(tabs)/reports/financial/_layout.tsx
import { Stack } from 'expo-router';

export default function FinancialLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="daily" />
      <Stack.Screen name="monthly" />
      <Stack.Screen name="payment-analysis" />
    </Stack>
  );
}
