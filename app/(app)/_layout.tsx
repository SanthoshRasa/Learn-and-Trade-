import { Ionicons } from '@expo/vector-icons';
import { Tabs, useRouter } from 'expo-router';
import { useColorScheme } from 'react-native';
import { COLORS } from '../../constants/theme';

export default function AppLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: isDark ? COLORS.backgroundDark : COLORS.background,
          borderTopColor: isDark ? COLORS.borderDark : COLORS.border,
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: isDark
          ? COLORS.textSecondaryDark
          : COLORS.textSecondary,
      }}
    >
      <Tabs.Screen
        name='home'
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='home' size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='shop'
        options={{
          title: 'Shop',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='cart' size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='practice'
        options={{
          title: 'Practice',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='barbell' size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='simulation'
        options={{
          title: 'Simulation',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='trending-up' size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='leaderboard'
        options={{
          title: 'Leaderboard',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='trophy' size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
