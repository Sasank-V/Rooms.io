'use client';

import { Tabs } from 'expo-router';
import { User, Bed, Users, Settings } from 'lucide-react-native';

export default function AdminTabsLayout() {
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
        name="rooms/index"
        options={{
          title: 'Rooms',
          tabBarIcon: ({ color }) => <Bed color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="staffs/index"
        options={{
          title: 'Staffs',
          tabBarIcon: ({ color }) => <Users color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="settings/index"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <Settings color={color} size={24} />,
        }}
      />
    </Tabs>
  );
}
