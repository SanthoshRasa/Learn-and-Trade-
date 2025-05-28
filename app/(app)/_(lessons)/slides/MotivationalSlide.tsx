import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS, SIZES, SPACING } from '../../../../constants/theme';

export default function MotivationalSlide({
  quote,
  author,
}: {
  quote: string;
  author?: string;
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.quote}>{quote}</Text>
      {author && <Text style={styles.author}>— {author}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: SPACING.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quote: {
    fontSize: SIZES.body2,
    fontStyle: 'italic',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 12,
  },
  author: {
    fontSize: SIZES.body4,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
});
