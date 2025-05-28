import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS, SIZES, SPACING } from '../../../../constants/theme';

export default function InteractiveMatchSlide({
  leftItems,
  rightItems,
}: {
  leftItems: string[];
  rightItems: string[];
}) {
  return (
    <View style={styles.container}>
      <View style={styles.col}>
        {leftItems.map((item, idx) => (
          <Text key={idx} style={styles.item}>
            {item}
          </Text>
        ))}
      </View>
      <View style={styles.col}>
        {rightItems.map((item, idx) => (
          <Text key={idx} style={styles.item}>
            {item}
          </Text>
        ))}
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
  item: {
    fontSize: SIZES.body3,
    color: COLORS.text,
    marginBottom: 10,
    textAlign: 'center',
  },
});
