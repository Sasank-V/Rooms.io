'use client';

import { Tabs } from 'expo-router';
import { User, LogIn, LogOut, BookText, Wallet, BarChart3 } from 'lucide-react-native';

export default function StaffTabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}>
      <Tabs.Screen
        name="dashboard/index"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color }) => <User color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="check-in/index"
        options={{
          title: 'Check-In',
          tabBarIcon: ({ color }) => <LogIn color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="check-out/index"
        options={{
          title: 'Check-Out',
          tabBarIcon: ({ color }) => <LogOut color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="ledger/index"
        options={{
          title: 'Ledger',
          tabBarIcon: ({ color }) => <BookText color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="payments/index"
        options={{
          title: 'Payments',
          tabBarIcon: ({ color }) => <Wallet color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="rooms/index"
        options={{
          title: 'Room Status',
          tabBarIcon: ({ color }) => <BarChart3 color={color} size={24} />,
        }}
      />
    </Tabs>
  );
}
