// The contents of the previous home2.tsx file should be placed here.
// ... (copy all code from home2.tsx here) ...
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  Image,
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

const MOCK_USER = {
  name: 'Alex',
  level: 'Novice Apprentice – Level 2',
  avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Alex',
  xp: 120,
  coins: 300,
  streak: 7,
};

const MOCK_LESSONS = [
  {
    id: 1,
    title: 'Trading Basics',
    status: 'Completed',
    icon: 'trending-up',
    xp: 100,
    progress: 1,
  },
  {
    id: 2,
    title: 'Risk Management',
    status: 'In Progress',
    icon: 'balance-scale',
    xp: 20,
    progress: 0.4,
  },
];

const MOCK_DAILY_GOAL = {
  text: 'Complete 1 Lesson',
  progress: 0,
  total: 1,
};

const MOCK_DAILY_CHALLENGE = {
  text: 'Complete a quiz',
  reward: 50,
};

export default function Home2Screen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const router = useRouter();

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
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={() => router.push('/profile')}>
              <Image source={{ uri: MOCK_USER.avatar }} style={styles.avatar} />
            </TouchableOpacity>
            <View>
              <Text
                style={[
                  styles.greeting,
                  { color: isDark ? COLORS.textDark : COLORS.text },
                ]}
              >
                Good Morning, {MOCK_USER.name} <Text>👋</Text>
              </Text>
              <Text
                style={[
                  styles.level,
                  {
                    color: isDark
                      ? COLORS.textSecondaryDark
                      : COLORS.textSecondary,
                  },
                ]}
              >
                {MOCK_USER.level}
              </Text>
            </View>
          </View>
          <TouchableOpacity style={styles.notifBtn}>
            <Ionicons
              name='notifications-outline'
              size={22}
              color={isDark ? COLORS.textDark : COLORS.text}
            />
          </TouchableOpacity>
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
              {MOCK_USER.xp}
            </Text>
            <Text style={styles.statLabel}>XP</Text>
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
            <Ionicons name='logo-bitcoin' size={20} color='#F6C244' />
            <Text
              style={[
                styles.statValue,
                { color: isDark ? COLORS.textDark : COLORS.text },
              ]}
            >
              {MOCK_USER.coins}
            </Text>
            <Text style={styles.statLabel}>Coins</Text>
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
            <Ionicons name='flame' size={20} color='#FF7A00' />
            <Text
              style={[
                styles.statValue,
                { color: isDark ? COLORS.textDark : COLORS.text },
              ]}
            >
              {MOCK_USER.streak}
            </Text>
            <Text style={styles.statLabel}>Streak</Text>
          </View>
        </View>

        {/* Daily Goal Card */}
        <View
          style={[
            styles.goalCard,
            { backgroundColor: isDark ? COLORS.cardBackgroundDark : '#232B3B' },
          ]}
        >
          <Text style={styles.goalText}>
            🎯 Daily Goal: {MOCK_DAILY_GOAL.text}{' '}
            <Text style={styles.goalProgress}>0/1</Text>
          </Text>
          <View style={styles.goalProgressBarBg}>
            <View
              style={[
                styles.goalProgressBarFill,
                { width: `${MOCK_DAILY_GOAL.progress * 100}%` },
              ]}
            />
          </View>
          <Text style={styles.goalSubText}>Keep your streak alive!</Text>
        </View>

        {/* Lessons Section */}
        <View style={styles.sectionHeaderRow}>
          <Text
            style={[
              styles.sectionTitle,
              { color: isDark ? COLORS.textDark : COLORS.text },
            ]}
          >
            Your Lessons
          </Text>
          <TouchableOpacity>
            <Text style={[styles.sectionAction, { color: COLORS.primary }]}>
              See All
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.lessonsRow}
        >
          {MOCK_LESSONS.map(lesson => (
            <View
              key={lesson.id}
              style={[
                styles.lessonCard,
                {
                  backgroundColor: isDark
                    ? COLORS.cardBackgroundDark
                    : COLORS.cardBackground,
                },
              ]}
            >
              <View style={styles.lessonStatusRow}>
                {lesson.icon === 'balance-scale' ? (
                  <MaterialCommunityIcons
                    name='scale-balance'
                    size={20}
                    color={COLORS.primary}
                  />
                ) : (
                  <Ionicons
                    name={lesson.icon as any}
                    size={20}
                    color={COLORS.primary}
                  />
                )}
                <Text
                  style={[
                    styles.lessonStatus,
                    {
                      color:
                        lesson.status === 'Completed'
                          ? COLORS.success
                          : COLORS.info,
                    },
                  ]}
                >
                  {lesson.status}
                </Text>
              </View>
              <Text
                style={[
                  styles.lessonTitle,
                  { color: isDark ? COLORS.textDark : COLORS.text },
                ]}
              >
                {lesson.title}
              </Text>
              <Text style={styles.lessonXP}>{lesson.xp} XP earned</Text>
              <View style={styles.lessonProgressBarBg}>
                <View
                  style={[
                    styles.lessonProgressBarFill,
                    {
                      width: `${lesson.progress * 100}%`,
                      backgroundColor:
                        lesson.status === 'Completed'
                          ? COLORS.success
                          : COLORS.primary,
                    },
                  ]}
                />
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Daily Challenges Section */}
        <View style={styles.sectionHeaderRow}>
          <Text
            style={[
              styles.sectionTitle,
              { color: isDark ? COLORS.textDark : COLORS.text },
            ]}
          >
            Daily Challenges
          </Text>
          <TouchableOpacity>
            <Text style={[styles.sectionAction, { color: COLORS.primary }]}>
              View All
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={[
            styles.challengeCard,
            {
              backgroundColor: isDark
                ? COLORS.cardBackgroundDark
                : COLORS.cardBackground,
            },
          ]}
        >
          <View style={styles.challengeRow}>
            <Ionicons
              name='trophy-outline'
              size={24}
              color={COLORS.primary}
              style={{ marginRight: 12 }}
            />
            <View style={{ flex: 1 }}>
              <Text
                style={[
                  styles.challengeText,
                  { color: isDark ? COLORS.textDark : COLORS.text },
                ]}
              >
                {MOCK_DAILY_CHALLENGE.text}
              </Text>
              <Text style={styles.challengeReward}>
                Earn {MOCK_DAILY_CHALLENGE.reward} XP bonus today
              </Text>
            </View>
            <TouchableOpacity style={styles.challengeStartBtn}>
              <Text style={styles.challengeStartBtnText}>Start</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      {/* Bottom Navigation Placeholder (actual nav handled by layout) */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.lg,
    paddingTop: SPACING.xl,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: SPACING.md,
    backgroundColor: COLORS.cardBackground,
  },
  greeting: {
    fontSize: SIZES.body2,
    fontWeight: 'bold',
  },
  level: {
    fontSize: SIZES.body5,
    marginTop: 2,
  },
  notifBtn: {
    padding: 8,
    borderRadius: 16,
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
    fontSize: SIZES.h3,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: SIZES.body5,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  goalCard: {
    borderRadius: SIZES.radius,
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
    padding: SPACING.lg,
  },
  goalText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: SIZES.body3,
    marginBottom: 6,
  },
  goalProgress: {
    color: '#fff',
    fontWeight: 'normal',
    fontSize: SIZES.body4,
  },
  goalProgressBarBg: {
    height: 8,
    backgroundColor: '#fff2',
    borderRadius: 4,
    marginBottom: 6,
    overflow: 'hidden',
  },
  goalProgressBarFill: {
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 4,
  },
  goalSubText: {
    color: '#fff',
    fontSize: SIZES.body5,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: SPACING.lg,
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: SIZES.body2,
    fontWeight: 'bold',
  },
  sectionAction: {
    fontSize: SIZES.body4,
    fontWeight: 'bold',
  },
  lessonsRow: {
    flexDirection: 'row',
    paddingLeft: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  lessonCard: {
    width: 180,
    borderRadius: SIZES.radius,
    padding: SPACING.lg,
    marginRight: SPACING.md,
  },
  lessonStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  lessonStatus: {
    fontSize: SIZES.body5,
    fontWeight: 'bold',
    marginLeft: 6,
  },
  lessonTitle: {
    fontSize: SIZES.body3,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  lessonXP: {
    fontSize: SIZES.body5,
    color: COLORS.textSecondary,
    marginBottom: 6,
  },
  lessonProgressBarBg: {
    height: 6,
    backgroundColor: '#eee',
    borderRadius: 3,
    overflow: 'hidden',
  },
  lessonProgressBarFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 3,
  },
  challengeCard: {
    borderRadius: SIZES.radius,
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
    padding: SPACING.lg,
  },
  challengeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  challengeText: {
    fontSize: SIZES.body3,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  challengeReward: {
    fontSize: SIZES.body5,
    color: COLORS.textSecondary,
    marginBottom: 2,
  },
  challengeStartBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 8,
  },
  challengeStartBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: SIZES.body4,
  },
});
