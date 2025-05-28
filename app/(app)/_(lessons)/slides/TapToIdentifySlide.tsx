import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS, SIZES, SPACING } from '../../../../constants/theme';

export default function TapToIdentifySlide({ prompt }: { prompt: string }) {
  return (
    <View style={styles.container}>
      <Text style={styles.prompt}>{prompt}</Text>
      {/* Placeholder for tap area */}
      <View style={styles.tapArea}>
        <Text style={styles.tapText}>[Tap Area]</Text>
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
  tapArea: {
    width: 180,
    height: 80,
    backgroundColor: COLORS.cardBackground,
    borderRadius: SIZES.radius,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  tapText: {
    color: COLORS.textSecondary,
    fontSize: SIZES.body4,
  },
});
