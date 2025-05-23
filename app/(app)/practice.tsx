import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
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

// Mock dynamic data structure for challenges
const CHALLENGES = [
  {
    id: 1,
    icon: 'swap-horizontal',
    title: 'Virtual Trading',
    description:
      'Simulate trades with virtual money in real-time market conditions.',
    tag: 'Beginner to Advanced',
    xp: 30,
    action: 'Start Trading',
    progress: null,
  },
  {
    id: 2,
    icon: 'help-circle-outline',
    title: 'Quiz Challenges',
    description:
      'Answer quizzes from selected topics (e.g., Forex, Price Action).',
    tag: 'Custom',
    xp: 25,
    action: 'Choose Topics',
    progress: null,
  },
  {
    id: 3,
    icon: 'trending-up',
    title: 'Guess the Trend',
    description: 'View candlestick patterns, guess the next move (Up/Down).',
    tag: null,
    xp: 20,
    action: 'Play',
    progress: 0.75,
  },
  {
    id: 4,
    icon: 'newspaper-outline',
    title: 'Market Reaction',
    description:
      'Read fake news headlines, guess how markets reacted (Bullish/Bearish).',
    tag: 'Intermediate',
    xp: 20,
    action: 'React!',
    progress: null,
  },
  {
    id: 5,
    icon: 'time-outline',
    title: 'Trade the Past',
    description:
      'Explore historical charts and pick entry/exit points for maximum gain.',
    tag: 'Advanced',
    xp: 40,
    action: 'Simulate',
    progress: null,
  },
  {
    id: 6,
    icon: 'flash-outline',
    title: 'Speed Round',
    description: '60-second rapid-fire trading trivia.',
    tag: null,
    xp: 25,
    action: 'Go!',
    progress: null,
  },
];

export default function PracticeScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const router = useRouter();

  // TODO: Replace with real user stats
  const userStats = { xp: 45, streak: 7, coins: 320 };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: isDark ? COLORS.backgroundDark : COLORS.background,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      }}
    >
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        {/* Header */}
        <View
          style={[
            styles.header,
            {
              backgroundColor: isDark
                ? COLORS.backgroundDark
                : COLORS.background,
            },
          ]}
        >
          <View>
            <Text
              style={[
                styles.title,
                { color: isDark ? COLORS.textDark : COLORS.text },
              ]}
            >
              Practice & Train
            </Text>
            <Text
              style={[
                styles.subtitle,
                {
                  color: isDark
                    ? COLORS.textSecondaryDark
                    : COLORS.textSecondary,
                },
              ]}
            >
              Sharpen your trading skills with interactive challenges!
            </Text>
          </View>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.headerIconBtn}>
              <Ionicons
                name='notifications-outline'
                size={20}
                color={isDark ? COLORS.textDark : COLORS.text}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerIconBtn}>
              <Ionicons
                name='settings-outline'
                size={20}
                color={isDark ? COLORS.textDark : COLORS.text}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View
            style={[
              styles.statCard,
              {
                backgroundColor: isDark
                  ? COLORS.cardBackgroundDark
                  : COLORS.cardBackground,
              },
            ]}
          >
            <Text
              style={[
                styles.statValue,
                { color: isDark ? COLORS.textDark : COLORS.text },
              ]}
            >
              {userStats.xp}
            </Text>
            <Text style={styles.statLabel}>XP Today</Text>
          </View>
          <View
            style={[
              styles.statCard,
              {
                backgroundColor: isDark
                  ? COLORS.cardBackgroundDark
                  : COLORS.cardBackground,
              },
            ]}
          >
            <Ionicons name='flame' size={18} color='#FF7A00' />
            <Text
              style={[
                styles.statValue,
                { color: isDark ? COLORS.textDark : COLORS.text },
              ]}
            >
              {userStats.streak}
            </Text>
            <Text style={styles.statLabel}>Streak</Text>
          </View>
          <View
            style={[
              styles.statCard,
              {
                backgroundColor: isDark
                  ? COLORS.cardBackgroundDark
                  : COLORS.cardBackground,
              },
            ]}
          >
            <Ionicons name='logo-bitcoin' size={18} color='#F6C244' />
            <Text
              style={[
                styles.statValue,
                { color: isDark ? COLORS.textDark : COLORS.text },
              ]}
            >
              {userStats.coins}
            </Text>
            <Text style={styles.statLabel}>Coins</Text>
          </View>
        </View>

        {/* Challenge List */}
        <View style={styles.challengeList}>
          {CHALLENGES.map(challenge => (
            <View
              key={challenge.id}
              style={[
                styles.challengeCard,
                {
                  backgroundColor: isDark
                    ? COLORS.cardBackgroundDark
                    : COLORS.cardBackground,
                },
              ]}
            >
              <View style={styles.challengeHeaderRow}>
                <Ionicons
                  name={challenge.icon as any}
                  size={22}
                  color={COLORS.primary}
                  style={{ marginRight: 8 }}
                />
                <Text
                  style={[
                    styles.challengeTitle,
                    { color: isDark ? COLORS.textDark : COLORS.text },
                  ]}
                >
                  {challenge.title}
                </Text>
                <View style={styles.xpBadge}>
                  <Ionicons name='star' size={14} color='#F6C244' />
                  <Text style={styles.xpBadgeText}>+{challenge.xp}</Text>
                </View>
              </View>
              <Text
                style={[
                  styles.challengeDesc,
                  {
                    color: isDark
                      ? COLORS.textSecondaryDark
                      : COLORS.textSecondary,
                  },
                ]}
              >
                {challenge.description}
              </Text>
              <View style={styles.challengeFooterRow}>
                {challenge.progress !== null && (
                  <View style={styles.progressBarBg}>
                    <View
                      style={[
                        styles.progressBarFill,
                        { width: `${challenge.progress * 100}%` },
                      ]}
                    />
                  </View>
                )}
                <TouchableOpacity
                  style={styles.actionBtn}
                  onPress={() => {
                    if (
                      challenge.title === 'Quiz Challenges' &&
                      challenge.action === 'Choose Topics'
                    ) {
                      router.push('/quiz');
                    }
                    /* TODO: navigate to challenge */
                  }}
                >
                  <Text style={styles.actionBtnText}>{challenge.action}</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: SPACING.lg,
    paddingTop: SPACING.xl,
  },
  title: {
    fontSize: SIZES.body2,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  subtitle: {
    fontSize: SIZES.body5,
    marginBottom: 8,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIconBtn: {
    padding: 8,
    borderRadius: 16,
    marginLeft: 4,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SIZES.radius,
    paddingVertical: SPACING.md,
    marginHorizontal: 4,
  },
  statValue: {
    fontSize: SIZES.body2,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: SIZES.body5,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  challengeList: {
    paddingHorizontal: SPACING.lg,
  },
  challengeCard: {
    borderRadius: SIZES.radius,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
  },
  challengeHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  challengeTitle: {
    fontSize: SIZES.body3,
    fontWeight: 'bold',
    flex: 1,
  },
  xpBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF7E0',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginLeft: 8,
  },
  xpBadgeText: {
    color: '#F6C244',
    fontWeight: 'bold',
    fontSize: SIZES.body5,
    marginLeft: 2,
  },
  challengeDesc: {
    fontSize: SIZES.body5,
    marginBottom: 8,
  },
  challengeFooterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  progressBarBg: {
    flex: 1,
    height: 6,
    backgroundColor: '#eee',
    borderRadius: 3,
    marginHorizontal: 8,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 3,
  },
  actionBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginLeft: 8,
  },
  actionBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: SIZES.body4,
  },
});
