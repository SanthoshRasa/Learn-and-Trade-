import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS, SIZES, SPACING } from '../../../../constants/theme';

type GlossaryTerm = { term: string; definition: string };

export default function GlossarySlide({ terms }: { terms: GlossaryTerm[] }) {
  return (
    <View style={styles.container}>
      {terms.map((item, idx) => (
        <View key={idx} style={styles.termBlock}>
          <Text style={styles.term}>{item.term}</Text>
          <Text style={styles.definition}>{item.definition}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: SPACING.xl,
  },
  termBlock: {
    marginBottom: 16,
  },
  term: {
    fontWeight: 'bold',
    fontSize: SIZES.body2,
    color: COLORS.text,
  },
  definition: {
    fontSize: SIZES.body4,
    color: COLORS.textSecondary,
  },
});
