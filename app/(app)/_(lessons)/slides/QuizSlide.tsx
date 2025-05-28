import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS, SIZES, SPACING } from '../../../../constants/theme';

export default function QuizSlide({
  question,
  options,
}: {
  question: string;
  options: string[];
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.question}>{question}</Text>
      {options.map((opt, idx) => (
        <View key={idx} style={styles.optionBox}>
          <Text style={styles.option}>{opt}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: SPACING.xl,
  },
  question: {
    fontWeight: 'bold',
    fontSize: SIZES.body2,
    color: COLORS.text,
    marginBottom: 16,
  },
  optionBox: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: SIZES.radius,
    padding: SPACING.md,
    marginBottom: 10,
  },
  option: {
    fontSize: SIZES.body3,
    color: COLORS.textSecondary,
  },
});
