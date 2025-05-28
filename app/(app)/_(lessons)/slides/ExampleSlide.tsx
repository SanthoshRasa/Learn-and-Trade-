import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS, SIZES, SPACING } from '../../../../constants/theme';

export default function ExampleSlide({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: SPACING.xl,
  },
  title: {
    fontSize: SIZES.h3,
    fontWeight: 'bold',
    marginBottom: 10,
    color: COLORS.text,
  },
  description: {
    fontSize: SIZES.body3,
    color: COLORS.textSecondary,
  },
});
