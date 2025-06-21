import { Stack, usePathname } from 'expo-router';
import { SafeAreaView } from 'react-native';
import { StepTracker } from '~/components/tracker';
import { SetupStages } from '~/constants/stages';

export default function SetupLayout() {
  const pathname = usePathname(); // e.g., /setup/hotel-info

  const showTracker = pathname !== '/setup';

  return (
    <SafeAreaView className="flex-1 pt-10">
      {showTracker && <StepTracker stages={SetupStages} />}
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="hotel-info" />
        <Stack.Screen name="room-config" />
        <Stack.Screen name="payment" />
        <Stack.Screen name="admin" />
        <Stack.Screen name="staff-roles" />
        <Stack.Screen name="staff-add" />
        <Stack.Screen name="complete" />
      </Stack>
    </SafeAreaView>
  );
}
