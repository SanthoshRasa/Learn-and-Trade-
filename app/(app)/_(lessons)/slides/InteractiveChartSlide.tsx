import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS, SIZES, SPACING } from '../../../../constants/theme';

export default function InteractiveChartSlide({ prompt }: { prompt: string }) {
  return (
    <View style={styles.container}>
      <Text style={styles.prompt}>{prompt}</Text>
      {/* Chart placeholder */}
      <View style={styles.chartPlaceholder}>
        <Text style={styles.chartText}>[Chart Here]</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: SPACING.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  prompt: {
    fontSize: SIZES.body2,
    color: COLORS.text,
    marginBottom: 16,
    textAlign: 'center',
  },
  chartPlaceholder: {
    width: 220,
    height: 120,
    backgroundColor: COLORS.cardBackground,
    borderRadius: SIZES.radius,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  chartText: {
    color: COLORS.textSecondary,
    fontSize: SIZES.body4,
  },
});
