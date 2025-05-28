import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS, SIZES, SPACING } from '../../../../constants/theme';

export default function MythBusterSlide({
  myth,
  truth,
}: {
  myth: string;
  truth: string;
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.mythLabel}>Myth:</Text>
      <Text style={styles.myth}>{myth}</Text>
      <Text style={styles.truthLabel}>Truth:</Text>
      <Text style={styles.truth}>{truth}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: SPACING.xl,
  },
  mythLabel: {
    fontWeight: 'bold',
    color: COLORS.error,
    fontSize: SIZES.body4,
    marginTop: 8,
  },
  myth: {
    fontSize: SIZES.body3,
    color: COLORS.textSecondary,
    marginBottom: 10,
  },
  truthLabel: {
    fontWeight: 'bold',
    color: COLORS.success,
    fontSize: SIZES.body4,
    marginTop: 8,
  },
  truth: {
    fontSize: SIZES.body3,
    color: COLORS.text,
  },
});
