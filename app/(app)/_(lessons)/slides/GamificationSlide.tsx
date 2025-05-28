import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS, SIZES, SPACING } from '../../../../constants/theme';

export default function GamificationSlide({
  xp,
  badges,
  nextUnlock,
}: {
  xp: number;
  badges: number;
  nextUnlock: string;
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.xp}>XP: {xp}</Text>
      <Text style={styles.badges}>Badges: {badges}</Text>
      <Text style={styles.nextUnlock}>Next Unlock: {nextUnlock}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: SPACING.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  xp: {
    fontWeight: 'bold',
    fontSize: SIZES.body2,
    color: COLORS.primary,
    marginBottom: 10,
  },
  badges: {
    fontSize: SIZES.body3,
    color: COLORS.text,
    marginBottom: 10,
  },
  nextUnlock: {
    fontSize: SIZES.body4,
    color: COLORS.textSecondary,
  },
});
