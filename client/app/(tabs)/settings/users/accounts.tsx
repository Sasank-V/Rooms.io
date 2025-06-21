import { View, Text, Pressable, ScrollView } from 'react-native';
import React from 'react';
import { router } from 'expo-router';

const users = [
  { name: 'John Smith', role: 'Admin', email: 'john@example.com' },
  { name: 'Jane Doe', role: 'Manager', email: 'jane@example.com' },
  { name: 'Alex Lee', role: 'Staff', email: 'alex@example.com' },
];

const Accounts = () => {
  return (
    <ScrollView className="flex-1 bg-white px-4 pt-16">
      <Text className="mb-6 text-center text-2xl font-bold text-gray-800">User Accounts</Text>

      <View className="space-y-4">
        {users.map((user, index) => (
          <View key={index} className="rounded-xl border border-gray-200 bg-gray-100 p-4 shadow-sm">
            <Text className="text-lg font-semibold text-gray-800">{user.name}</Text>
            <Text className="text-sm text-gray-600">{user.email}</Text>
            <Text className="text-sm text-gray-600">Role: {user.role}</Text>
          </View>
        ))}
      </View>

      <Pressable
        className="mt-10 self-center rounded-lg bg-blue-600 px-6 py-3"
        onPress={() => router.push('/settings/users')}>
        <Text className="text-base font-semibold text-white">Back to User Settings</Text>
      </Pressable>
    </ScrollView>
  );
};

export default Accounts;
