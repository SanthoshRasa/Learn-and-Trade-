import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';
import { COLORS } from '../constants/theme';
import { AuthProvider } from '../contexts/AuthContext';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <AuthProvider>
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
          name='(auth)'
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name='(app)'
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </AuthProvider>
  );
}
