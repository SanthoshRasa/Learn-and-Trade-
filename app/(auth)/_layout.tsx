import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';
import { COLORS } from '../../constants/theme';

export default function AuthLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: isDark ? COLORS.backgroundDark : COLORS.background,
        },
        headerTintColor: isDark ? COLORS.textDark : COLORS.text,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        contentStyle: {
          backgroundColor: isDark ? COLORS.backgroundDark : COLORS.background,
        },
      }}
    >
      <Stack.Screen
        name='login'
        options={{
          title: 'Login',
        }}
      />
      <Stack.Screen
        name='signup'
        options={{
          title: 'Sign Up',
        }}
      />
      <Stack.Screen
        name='onboarding'
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
