import { Tabs, Redirect } from 'expo-router';

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ThemedText } from '@/components';
import { useListenUserUpdate } from '@/features/auth';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const { isInitializing, user } = useListenUserUpdate();

  if (isInitializing)
    return (
      <ThemedText style={{ textAlign: 'center', paddingTop: 100 }}>
        Loading...
      </ThemedText>
    );

  if (!user) return <Redirect href="/(auth)/sign-in" />;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        // tabBarButton: HapticTab,
        // tabBarBackground: TabBarBackground,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          // tabBarIcon: ({ color }) => (
          //   <IconSymbol size={28} name="house.fill" color={color} />
          // ),
        }}
      />
      <Tabs.Screen
        name="habits"
        options={{
          title: 'Habits',
          // tabBarIcon: ({ color }) => (
          //   <IconSymbol size={28} name="paperplane.fill" color={color} />
          // ),
        }}
      />
    </Tabs>
  );
}
