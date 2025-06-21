import { View, Text } from 'react-native';
import { usePathname } from 'expo-router';
import { Stage } from '~/constants/stages';

export const StepTracker = ({ stages }: { stages: Stage[] }) => {
  const pathname = usePathname();

  return (
    <View className="flex-row flex-wrap justify-center bg-gray-100 px-2 py-3">
      {stages.map((stage, index) => {
        const isActive =
          pathname === stage.path || pathname.endsWith(stage.path) || pathname.includes(stage.path);

        return (
          <View key={stage.path} className="mx-1 flex-row items-center">
            <Text
              className={`text-xs font-semibold ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
              {index + 1}. {stage.name}
            </Text>
            {index !== stages.length - 1 && <Text className="mx-1 text-gray-400">›</Text>}
          </View>
        );
      })}
    </View>
  );
};
