import { Ionicons } from '@expo/vector-icons';
import { Slot, useRouter, useSegments } from 'expo-router';
import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import { COLORS } from '../../constants/theme';

const TABS = [
  { name: 'home', label: 'Home', icon: 'home' },
  { name: 'learn', label: 'Learn', icon: 'school' },
  { name: 'practice', label: 'Practice', icon: 'barbell' },
  { name: 'leaderboard', label: 'Leaderboard', icon: 'trophy' },
  { name: 'settings', label: 'Settings', icon: 'settings' },
];

export default function AppLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const router = useRouter();
  const segments = useSegments();
  const current = segments[segments.length - 1];

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? COLORS.backgroundDark : COLORS.background },
      ]}
    >
      <View style={styles.content}>
        {/* Back button for all pages except bottom nav tabs and settings */}
        {!['home', 'learn', 'practice', 'leaderboard', 'settings'].includes(
          current
        ) && (
          <TouchableOpacity
            style={{ padding: 12, paddingTop: 24, alignSelf: 'flex-start' }}
            onPress={() => router.back()}
          >
            <Ionicons name='arrow-back' size={24} color={COLORS.text} />
          </TouchableOpacity>
        )}
        <Slot />
      </View>
      <View
        style={[
          styles.bottomNav,
          {
            backgroundColor: isDark ? COLORS.backgroundDark : '#fff',
            borderTopColor: isDark ? COLORS.borderDark : COLORS.border,
          },
        ]}
      >
        {TABS.map(tab => {
          const isActive = current === tab.name;
          return (
            <TouchableOpacity
              key={tab.name}
              style={styles.tabBtn}
              onPress={() =>
                router.replace(
                  tab.name === 'home' ? '/' : (`/${tab.name}` as any)
                )
              }
              activeOpacity={0.7}
            >
              <Ionicons
                name={tab.icon as any}
                size={24}
                color={isActive ? COLORS.primary : COLORS.textSecondary}
              />
              <Text
                style={[
                  styles.tabLabel,
                  { color: isActive ? COLORS.primary : COLORS.textSecondary },
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  bottomNav: {
    flexDirection: 'row',
    height: 60,
    borderTopWidth: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: -2 },
  },
  tabBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  tabLabel: {
    fontSize: 11,
    marginTop: 2,
    fontWeight: '600',
  },
});
