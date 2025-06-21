import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { router } from 'expo-router';
import { SetupStages } from '~/constants/stages';

const SetupStagesPage = () => {
  return (
    <View className="flex-1 bg-white px-4 pt-16">
      <Text className="mb-6 text-center text-2xl font-bold text-gray-800">Setup Stages</Text>

      <View className="space-y-4">
        {SetupStages.map((stage, index) => (
          <View
            key={index}
            className="flex-row items-center gap-4 rounded-lg bg-gray-100 px-4 py-3">
            <Text className="text-lg font-medium text-gray-700">{index + 1}.</Text>
            <Text className="text-base text-gray-800">{stage.name}</Text>
          </View>
        ))}
      </View>

      <Pressable
        onPress={() => router.push('/setup/hotel-info')}
        className="mt-10 self-center rounded-lg bg-blue-600 px-6 py-4">
        <Text className="text-base font-semibold text-white">Start Setup</Text>
      </Pressable>
    </View>
  );
};

export default SetupStagesPage;
