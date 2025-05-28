import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS, SIZES, SPACING } from '../../../../constants/theme';

export default function CompareSlide({
  leftTitle,
  leftDesc,
  rightTitle,
  rightDesc,
}: {
  leftTitle: string;
  leftDesc: string;
  rightTitle: string;
  rightDesc: string;
}) {
  return (
    <View style={styles.container}>
      <View style={styles.col}>
        <Text style={styles.title}>{leftTitle}</Text>
        <Text style={styles.desc}>{leftDesc}</Text>
      </View>
      <View style={styles.col}>
        <Text style={styles.title}>{rightTitle}</Text>
        <Text style={styles.desc}>{rightDesc}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: SPACING.xl,
  },
  col: {
    flex: 1,
    marginHorizontal: 8,
  },
  title: {
    fontWeight: 'bold',
    fontSize: SIZES.body2,
    color: COLORS.text,
    marginBottom: 6,
    textAlign: 'center',
  },
  desc: {
    fontSize: SIZES.body4,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
});
