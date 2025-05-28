import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS, SIZES, SPACING } from '../../../../constants/theme';

export default function ConceptSlide({
  title,
  bullets,
}: {
  title: string;
  bullets: string[];
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {bullets.map((point, idx) => (
        <Text key={idx} style={styles.bullet}>
          {'• ' + point}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: SPACING.xl,
  },
  title: {
    fontSize: SIZES.h2,
    fontWeight: 'bold',
    marginBottom: 12,
    color: COLORS.text,
  },
  bullet: {
    fontSize: SIZES.body3,
    marginBottom: 6,
    color: COLORS.textSecondary,
  },
});
