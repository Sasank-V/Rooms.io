import { Stack, usePathname } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StepTracker } from '~/components/tracker';
import { CheckInStages } from '~/constants/stages';

export default function CheckinLayout() {
  const pathname = usePathname(); // e.g., /guests/checkin/info

  const showTracker = pathname !== '/guests/checkin';

  return (
    <SafeAreaView className="flex-1 pt-10">
      {showTracker && <StepTracker stages={CheckInStages} />}
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="id-capture" />
        <Stack.Screen name="info" />
        <Stack.Screen name="room" />
        <Stack.Screen name="payment" />
        <Stack.Screen name="confirm" />
      </Stack>
    </SafeAreaView>
  );
}
