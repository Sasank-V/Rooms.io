import { View, Text, Pressable } from 'react-native';
import { router } from 'expo-router';

const Staff = () => {
  return (
    <View className="flex-1 bg-white px-4 pt-16">
      <Text className="mb-8 text-3xl font-bold text-gray-800">Staff Overview</Text>
      <View className="space-y-6">
        <Pressable
          className="rounded-lg bg-green-600 px-6 py-4"
          onPress={() => router.push('/staff/management')}>
          <Text className="text-center text-base font-semibold text-white">Manage Staff</Text>
        </Pressable>

        <Pressable
          className="rounded-lg bg-purple-600 px-6 py-4"
          onPress={() => router.push('/staff/add')}>
          <Text className="text-center text-base font-semibold text-white">Add New Staff</Text>
        </Pressable>

        <Pressable
          className="rounded-lg bg-orange-600 px-6 py-4"
          onPress={() => router.push('/staff/shifts')}>
          <Text className="text-center text-base font-semibold text-white">View Shifts</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Staff;
