import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { router } from 'expo-router';

const Users = () => {
  return (
    <View className="flex-1 bg-white px-4 pt-16">
      <Text className="mb-8 text-center text-3xl font-bold text-gray-800">User Settings</Text>

      <View className="space-y-6">
        <Pressable
          className="rounded-lg bg-blue-600 px-6 py-4"
          onPress={() => router.push('/settings/users/roles')}>
          <Text className="text-center text-base font-semibold text-white">User Roles</Text>
        </Pressable>

        <Pressable
          className="rounded-lg bg-purple-600 px-6 py-4"
          onPress={() => router.push('/settings/users/accounts')}>
          <Text className="text-center text-base font-semibold text-white">User Accounts</Text>
        </Pressable>

        <Pressable
          className="rounded-lg bg-green-600 px-6 py-4"
          onPress={() => router.push('/settings/users/admin')}>
          <Text className="text-center text-base font-semibold text-white">Admin Controls</Text>
        </Pressable>
      </View>

      <Pressable
        className="mt-10 self-center rounded-lg bg-gray-700 px-6 py-4"
        onPress={() => router.push('/settings')}>
        <Text className="text-center text-base font-semibold text-white">Back to Settings</Text>
      </Pressable>
    </View>
  );
};

export default Users;
