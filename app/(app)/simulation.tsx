import { Ionicons } from '@expo/vector-icons';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import { COLORS, SIZES, SPACING } from '../../constants/theme';

export default function SimulationScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: isDark ? COLORS.backgroundDark : COLORS.background },
      ]}
    >
      <View style={styles.header}>
        <Text
          style={[
            styles.sectionTitle,
            { color: isDark ? COLORS.textDark : COLORS.text },
          ]}
        >
          Trading Simulation
        </Text>
        <Text
          style={[
            styles.subtitle,
            { color: isDark ? COLORS.textSecondaryDark : COLORS.textSecondary },
          ]}
        >
          Practice with virtual money
        </Text>
      </View>

      <View
        style={[
          styles.balanceCard,
          {
            backgroundColor: isDark
              ? COLORS.cardBackgroundDark
              : COLORS.cardBackground,
          },
        ]}
      >
        <Text
          style={[
            styles.balanceLabel,
            {
              color: isDark ? COLORS.textSecondaryDark : COLORS.textSecondary,
            },
          ]}
        >
          Virtual Balance
        </Text>
        <Text
          style={[
            styles.balanceAmount,
            { color: isDark ? COLORS.textDark : COLORS.text },
          ]}
        >
          $10,000.00
        </Text>
      </View>

      <View style={styles.chartContainer}>
        <View
          style={[
            styles.chart,
            {
              backgroundColor: isDark
                ? COLORS.cardBackgroundDark
                : COLORS.cardBackground,
            },
          ]}
        >
          <Text
            style={[
              styles.chartPlaceholder,
              {
                color: isDark ? COLORS.textSecondaryDark : COLORS.textSecondary,
              },
            ]}
          >
            Chart Coming Soon
          </Text>
        </View>
      </View>

      <View style={styles.controls}>
        <View style={styles.marketSelector}>
          <TouchableOpacity
            style={[
              styles.marketButton,
              {
                backgroundColor: isDark
                  ? COLORS.cardBackgroundDark
                  : COLORS.cardBackground,
              },
            ]}
          >
            <Ionicons
              name='trending-up'
              size={24}
              color={isDark ? COLORS.primary : COLORS.primary}
            />
            <Text
              style={[
                styles.marketButtonText,
                { color: isDark ? COLORS.textDark : COLORS.text },
              ]}
            >
              Select Market
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.tradeButtons}>
          <TouchableOpacity
            style={[styles.tradeButton, { backgroundColor: COLORS.success }]}
          >
            <Text style={styles.tradeButtonText}>Buy</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tradeButton, { backgroundColor: COLORS.error }]}
          >
            <Text style={styles.tradeButtonText}>Sell</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.positionsContainer}>
        <Text
          style={[
            styles.sectionTitle,
            { color: isDark ? COLORS.textDark : COLORS.text },
          ]}
        >
          Open Positions
        </Text>
        <View
          style={[
            styles.positionsList,
            {
              backgroundColor: isDark
                ? COLORS.cardBackgroundDark
                : COLORS.cardBackground,
            },
          ]}
        >
          <Text
            style={[
              styles.emptyText,
              {
                color: isDark ? COLORS.textSecondaryDark : COLORS.textSecondary,
              },
            ]}
          >
            No open positions
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: SPACING.lg,
  },
  sectionTitle: {
    fontSize: SIZES.h3,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.md,
    marginLeft: 0,
  },
  subtitle: {
    fontSize: SIZES.body3,
    marginTop: SPACING.xs,
  },
  balanceCard: {
    margin: SPACING.lg,
    padding: SPACING.lg,
    borderRadius: SIZES.radius,
  },
  balanceLabel: {
    fontSize: SIZES.body4,
  },
  balanceAmount: {
    fontSize: SIZES.h1,
    fontWeight: 'bold',
    marginTop: SPACING.xs,
  },
  chartContainer: {
    padding: SPACING.lg,
  },
  chart: {
    height: 300,
    borderRadius: SIZES.radius,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chartPlaceholder: {
    fontSize: SIZES.body3,
  },
  controls: {
    padding: SPACING.lg,
  },
  marketSelector: {
    marginBottom: SPACING.lg,
  },
  marketButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    borderRadius: SIZES.radius,
  },
  marketButtonText: {
    fontSize: SIZES.body3,
    marginLeft: SPACING.sm,
  },
  tradeButtons: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  tradeButton: {
    flex: 1,
    height: 56,
    borderRadius: SIZES.radius,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tradeButtonText: {
    color: COLORS.background,
    fontSize: SIZES.body3,
    fontWeight: 'bold',
  },
  positionsContainer: {
    padding: SPACING.lg,
  },
  positionsList: {
    borderRadius: SIZES.radius,
    padding: SPACING.lg,
    minHeight: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: SIZES.body3,
  },
  title: {
    display: 'none',
  },
});
