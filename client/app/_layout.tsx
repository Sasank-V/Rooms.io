import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { View, Text } from 'react-native';
import { useDatabaseMigrations } from '~/database';
import '../global.css';
import { openDatabaseSync } from 'expo-sqlite';
import { useDrizzleStudio } from 'expo-drizzle-studio-plugin';

SplashScreen.preventAutoHideAsync();

const db = openDatabaseSync('db');
export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
  });

  // Drizzle Studio Setup
  useDrizzleStudio(db);

  const { success, error } = useDatabaseMigrations(); // <-- Run migrations
  useEffect(() => {
    if (fontsLoaded && success) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, success]);

  if (!fontsLoaded || !success) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{error ? `Migration error: ${error.message}` : 'Loading...'}</Text>
      </View>
    );
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
