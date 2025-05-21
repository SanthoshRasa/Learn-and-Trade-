import { Ionicons } from '@expo/vector-icons';
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import { COLORS, SIZES, SPACING } from '../../constants/theme';

const topTraders = [
  {
    id: 1,
    name: 'John Doe',
    rank: 1,
    profit: '+$2,450.00',
    winRate: '85%',
  },
  {
    id: 2,
    name: 'Jane Smith',
    rank: 2,
    profit: '+$1,980.00',
    winRate: '78%',
  },
  {
    id: 3,
    name: 'Mike Johnson',
    rank: 3,
    profit: '+$1,750.00',
    winRate: '72%',
  },
  {
    id: 4,
    name: 'Sarah Williams',
    rank: 4,
    profit: '+$1,500.00',
    winRate: '68%',
  },
  {
    id: 5,
    name: 'David Brown',
    rank: 5,
    profit: '+$1,250.00',
    winRate: '65%',
  },
];

export default function LeaderboardScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: isDark ? COLORS.backgroundDark : COLORS.background,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      }}
    >
      <ScrollView
        style={[
          styles.container,
          {
            backgroundColor: isDark ? COLORS.backgroundDark : COLORS.background,
          },
        ]}
      >
        <View style={styles.header}>
          <Text
            style={[
              styles.sectionTitle,
              { color: isDark ? COLORS.textDark : COLORS.text },
            ]}
          >
            Leaderboard
          </Text>
          <Text
            style={[
              styles.subtitle,
              {
                color: isDark ? COLORS.textSecondaryDark : COLORS.textSecondary,
              },
            ]}
          >
            Top traders this week
          </Text>
        </View>

        <View style={styles.filters}>
          <TouchableOpacity
            style={[
              styles.filterButton,
              {
                backgroundColor: isDark
                  ? COLORS.cardBackgroundDark
                  : COLORS.cardBackground,
              },
            ]}
          >
            <Text
              style={[
                styles.filterButtonText,
                { color: isDark ? COLORS.textDark : COLORS.text },
              ]}
            >
              All Markets
            </Text>
            <Ionicons
              name='chevron-down'
              size={20}
              color={isDark ? COLORS.textDark : COLORS.text}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.leaderboard}>
          {topTraders.map(trader => (
            <View
              key={trader.id}
              style={[
                styles.traderCard,
                {
                  backgroundColor: isDark
                    ? COLORS.cardBackgroundDark
                    : COLORS.cardBackground,
                },
              ]}
            >
              <View style={styles.rankContainer}>
                <Text
                  style={[
                    styles.rank,
                    { color: isDark ? COLORS.textDark : COLORS.text },
                  ]}
                >
                  #{trader.rank}
                </Text>
              </View>
              <View style={styles.traderInfo}>
                <Text
                  style={[
                    styles.traderName,
                    { color: isDark ? COLORS.textDark : COLORS.text },
                  ]}
                >
                  {trader.name}
                </Text>
                <Text
                  style={[
                    styles.traderStats,
                    {
                      color: isDark
                        ? COLORS.textSecondaryDark
                        : COLORS.textSecondary,
                    },
                  ]}
                >
                  Win Rate: {trader.winRate}
                </Text>
              </View>
              <View style={styles.profitContainer}>
                <Text style={[styles.profit, { color: COLORS.success }]}>
                  {trader.profit}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.yourRank}>
          <Text
            style={[
              styles.yourRankTitle,
              { color: isDark ? COLORS.textDark : COLORS.text },
            ]}
          >
            Your Rank
          </Text>
          <View
            style={[
              styles.yourRankCard,
              {
                backgroundColor: isDark
                  ? COLORS.cardBackgroundDark
                  : COLORS.cardBackground,
              },
            ]}
          >
            <View style={styles.rankContainer}>
              <Text
                style={[
                  styles.rank,
                  { color: isDark ? COLORS.textDark : COLORS.text },
                ]}
              >
                #42
              </Text>
            </View>
            <View style={styles.traderInfo}>
              <Text
                style={[
                  styles.traderName,
                  { color: isDark ? COLORS.textDark : COLORS.text },
                ]}
              >
                You
              </Text>
              <Text
                style={[
                  styles.traderStats,
                  {
                    color: isDark
                      ? COLORS.textSecondaryDark
                      : COLORS.textSecondary,
                  },
                ]}
              >
                Win Rate: 60%
              </Text>
            </View>
            <View style={styles.profitContainer}>
              <Text style={[styles.profit, { color: COLORS.success }]}>
                +$450.00
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
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
  filters: {
    padding: SPACING.lg,
    paddingTop: 0,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.md,
    borderRadius: SIZES.radius,
  },
  filterButtonText: {
    fontSize: SIZES.body3,
    fontWeight: 'bold',
  },
  leaderboard: {
    padding: SPACING.lg,
    paddingTop: 0,
  },
  traderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    borderRadius: SIZES.radius,
    marginBottom: SPACING.md,
  },
  rankContainer: {
    width: 40,
    alignItems: 'center',
  },
  rank: {
    fontSize: SIZES.body3,
    fontWeight: 'bold',
  },
  traderInfo: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  traderName: {
    fontSize: SIZES.body3,
    fontWeight: 'bold',
  },
  traderStats: {
    fontSize: SIZES.body5,
    marginTop: SPACING.xs,
  },
  profitContainer: {
    marginLeft: SPACING.md,
  },
  profit: {
    fontSize: SIZES.body3,
    fontWeight: 'bold',
  },
  yourRank: {
    padding: SPACING.lg,
    paddingTop: 0,
  },
  yourRankTitle: {
    fontSize: SIZES.h3,
    fontWeight: 'bold',
    marginBottom: SPACING.md,
  },
  yourRankCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    borderRadius: SIZES.radius,
  },
});
