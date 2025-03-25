import { Tabs, Redirect } from 'expo-router';

import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';

import { Colors } from '@/constants/Colors';
import { ThemedText } from '@/components';
import { useListenUserUpdate } from '@/features/auth';

export default function TabLayout() {
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
        tabBarActiveTintColor: Colors.dark.primary,
        headerShown: false,
        // tabBarButton: HapticTab,
        // tabBarBackground: TabBarBackground,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <Feather name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="habits"
        options={{
          title: 'Habits',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="timeline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="statistic"
        options={{
          title: 'Statistic',
          tabBarIcon: ({ color }) => (
            <AntDesign name="barschart" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => (
            <AntDesign name="user" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
