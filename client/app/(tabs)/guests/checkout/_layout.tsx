import { Stack, usePathname } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StepTracker } from '~/components/tracker';
import { CheckOutStages } from '~/constants/stages';

export default function CheckoutLayout() {
  const pathname = usePathname();

  const showTracker = pathname !== '/guests/checkout';

  return (
    <SafeAreaView className="flex-1 pt-10">
      {showTracker && <StepTracker stages={CheckOutStages} />}
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="[id]/bill" />
        <Stack.Screen name="[id]/payment" />
        <Stack.Screen name="[id]/handover" />
        <Stack.Screen name="[id]/feedback" />
      </Stack>
    </SafeAreaView>
  );
}
