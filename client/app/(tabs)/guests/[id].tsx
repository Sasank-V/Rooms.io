import { View, Text, Pressable, ScrollView } from 'react-native';
import React from 'react';

const GuestDetails = () => {
  return (
    <ScrollView className="flex-1 bg-white px-4 pt-12">
      <Text className="mb-6 text-3xl font-bold text-gray-800">Guest Details</Text>

      {/* Guest Info */}
      <View className="mb-4 rounded-xl bg-gray-100 p-4 shadow-sm">
        <Text className="text-lg font-semibold text-gray-800">John Doe</Text>
        <Text className="text-sm text-gray-600">Room: 101</Text>
        <Text className="text-sm text-gray-600">Phone: +91 9876543210</Text>
        <Text className="text-sm text-gray-600">Stay: 3 Nights</Text>
        <Text className="mt-1 text-sm text-green-700">Status: Checked In</Text>
      </View>

      {/* Ledger Summary */}
      <View className="mb-4 rounded-xl bg-blue-100 p-4 shadow-sm">
        <Text className="text-base font-medium text-blue-900">Total Charges: ₹4,500</Text>
        <Text className="text-base font-medium text-blue-900">Paid: ₹3,000</Text>
        <Text className="text-base font-medium text-red-600">Due: ₹1,500</Text>
      </View>

      {/* Action Buttons */}
      <View className="mb-10 space-y-4">
        <Pressable className="rounded-lg bg-green-600 px-6 py-3">
          <Text className="text-center text-base font-semibold text-white">Add Charges</Text>
        </Pressable>

        <Pressable className="rounded-lg bg-yellow-600 px-6 py-3">
          <Text className="text-center text-base font-semibold text-white">Change Room</Text>
        </Pressable>

        <Pressable className="rounded-lg bg-purple-600 px-6 py-3">
          <Text className="text-center text-base font-semibold text-white">Extend Stay</Text>
        </Pressable>

        <Pressable className="rounded-lg bg-red-600 px-6 py-3">
          <Text className="text-center text-base font-semibold text-white">Early Checkout</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default GuestDetails;
