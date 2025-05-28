import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS, SIZES, SPACING } from '../../../../constants/theme';

export default function ChartPromptSlide({
  instruction,
}: {
  instruction: string;
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.instruction}>{instruction}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: SPACING.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  instruction: {
    fontSize: SIZES.body2,
    color: COLORS.text,
    textAlign: 'center',
  },
});
