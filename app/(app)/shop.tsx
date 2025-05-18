import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import { COLORS, SHADOWS, SIZES, SPACING } from '../../constants/theme';

const MOCK_SHOP_ITEMS = [
  {
    id: 1,
    icon: 'flash',
    color: COLORS.primary,
    label: 'XP Boost',
    price: 100,
  },
  {
    id: 2,
    icon: 'shirt',
    color: COLORS.accent,
    label: 'Avatar Shirt',
    price: 200,
  },
  {
    id: 3,
    icon: 'color-palette',
    color: COLORS.secondary,
    label: 'Theme',
    price: 150,
  },
];

export default function ShopScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  return (
    <ScrollView
      style={{
        backgroundColor: isDark ? COLORS.backgroundDark : COLORS.background,
      }}
    >
      <Text
        style={[
          styles.sectionTitle,
          { color: isDark ? COLORS.textDark : COLORS.text },
        ]}
      >
        Shop
      </Text>
      <View style={styles.itemsRow}>
        {MOCK_SHOP_ITEMS.map(item => (
          <View
            key={item.id}
            style={[
              styles.itemCard,
              {
                backgroundColor: isDark
                  ? COLORS.cardBackgroundDark
                  : item.color + '20',
              },
            ]}
          >
            <Ionicons name={item.icon as any} size={32} color={item.color} />
            <Text
              style={[
                styles.itemLabel,
                { color: isDark ? COLORS.textDark : COLORS.text },
              ]}
            >
              {item.label}
            </Text>
            <Text
              style={[
                styles.itemPrice,
                {
                  color: isDark
                    ? COLORS.textSecondaryDark
                    : COLORS.textSecondary,
                },
              ]}
            >
              {item.price} XP
            </Text>
            <TouchableOpacity style={styles.buyBtn}>
              <Text style={styles.buyBtnText}>Buy</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: SIZES.h3,
    fontWeight: 'bold',
    color: COLORS.text,
    margin: SPACING.lg,
    marginBottom: SPACING.md,
    marginLeft: 0,
  },
  itemsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginHorizontal: SPACING.lg,
  },
  itemCard: {
    width: 140,
    alignItems: 'center',
    borderRadius: SIZES.radius,
    padding: SPACING.md,
    marginBottom: SPACING.lg,
    ...SHADOWS.light,
  },
  itemLabel: {
    fontWeight: 'bold',
    fontSize: SIZES.body3,
    color: COLORS.text,
    marginTop: 8,
  },
  itemPrice: {
    color: COLORS.textSecondary,
    fontSize: SIZES.body4,
    marginTop: 4,
  },
  buyBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginTop: 10,
  },
  buyBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: SIZES.body4,
  },
  title: {
    display: 'none',
  },
});
