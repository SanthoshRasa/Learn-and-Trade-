import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import { COLORS, SIZES, SPACING } from '../../constants/theme';

const XP = 1250;
const COINS = 350;
const LEVEL = 2;
const TOTAL_LEVELS = 10;
const PROGRESS = 0.2;
const ADVANCED_TOPICS = [
  {
    title: 'Forex Trading',
    xp: 350,
    level: 'Intermediate',
    icon: 'trending-up',
  },
  { title: 'Day Trading', xp: 210, level: 'Intermediate', icon: 'bar-chart' },
  { title: 'Crypto Trading', xp: 320, level: 'Advanced', icon: 'logo-bitcoin' },
  { title: 'Price Action', xp: 180, level: 'Beginner', icon: 'analytics' },
];

export default function LearnScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const router = useRouter();
  const backgroundColor = isDark ? COLORS.backgroundDark : COLORS.background;
  const cardBackground = isDark
    ? COLORS.cardBackgroundDark
    : COLORS.cardBackground;
  const progressBarBackground = isDark ? COLORS.cardBackgroundDark : '#eee';
  const advancedCardBackground = isDark ? 'rgba(255,255,255,0.06)' : '#F8F9FB';
  const advancedCardBorder = isDark ? 'rgba(255,255,255,0.10)' : '#E6EAF2';
  const advancedTextColor = '#fff';

  return (
    <SafeAreaView
      style={[
        styles.container,
        { paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
      ]}
    >
      {/* Section Title */}
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: '#fff' }]}>
          Choose Your Learning Journey
        </Text>
        <Text style={[styles.sectionSubtitle, { color: '#fff' }]}>
          Learn the way that suits you best!
        </Text>
      </View>
      {/* Full Learning Path Card */}
      <View style={[styles.card, { backgroundColor: cardBackground }]}>
        <View style={styles.cardHeaderRow}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons
              name='rocket-outline'
              size={18}
              color={COLORS.primary}
              style={{ marginRight: 6 }}
            />
            <Text style={[styles.cardTitle, { color: '#fff' }]}>
              Full Learning Path
            </Text>
          </View>
          <View style={styles.levelBadge}>
            <Text style={[styles.levelBadgeText, { color: '#fff' }]}>
              Level {LEVEL}/{TOTAL_LEVELS}
            </Text>
          </View>
        </View>
        <Text style={[styles.cardDesc, { color: '#fff' }]}>
          Complete structured journey across 10+ levels, from novice to master
          trader.
        </Text>
        <View style={styles.stepsRow}>
          <View style={styles.stepCol}>
            <View
              style={[
                styles.stepCircleActive,
                { backgroundColor: COLORS.primary },
              ]}
            >
              <Text style={[styles.stepCircleText, { color: '#fff' }]}>1</Text>
            </View>
            <Text style={[styles.stepLabel, { color: '#fff' }]}>Unlocked</Text>
          </View>
          <View style={styles.stepCol}>
            <View
              style={[
                styles.stepCircleCurrent,
                { backgroundColor: isDark ? COLORS.textDark : COLORS.text },
              ]}
            >
              <Text style={[styles.stepCircleText, { color: '#222' }]}>2</Text>
            </View>
            <Text style={[styles.stepLabel, { color: '#fff' }]}>Current</Text>
          </View>
          <View style={styles.stepCol}>
            <View
              style={[
                styles.stepCircleLocked,
                { backgroundColor: progressBarBackground },
              ]}
            >
              <Ionicons
                name='lock-closed'
                size={14}
                color={COLORS.textSecondary}
              />
            </View>
            <Text style={[styles.stepLabel, { color: '#fff' }]}>Locked</Text>
          </View>
          <View style={styles.stepCol}>
            <View
              style={[
                styles.stepCircleLocked,
                { backgroundColor: progressBarBackground },
              ]}
            >
              <Ionicons
                name='lock-closed'
                size={14}
                color={COLORS.textSecondary}
              />
            </View>
            <Text style={[styles.stepLabel, { color: '#fff' }]}>Locked</Text>
          </View>
          <View style={styles.stepCol}>
            <View
              style={[
                styles.stepCircleLocked,
                { backgroundColor: progressBarBackground },
              ]}
            >
              <Ionicons
                name='lock-closed'
                size={14}
                color={COLORS.textSecondary}
              />
            </View>
            <Text style={[styles.stepLabel, { color: '#fff' }]}>Locked</Text>
          </View>
          <View style={styles.stepCol}>
            <View
              style={[
                styles.stepCircleLocked,
                { backgroundColor: progressBarBackground },
              ]}
            >
              <Ionicons
                name='lock-closed'
                size={14}
                color={COLORS.textSecondary}
              />
            </View>
            <Text style={[styles.stepLabel, { color: '#fff' }]}>Locked</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.ctaBtn}
          onPress={() => router.push('/learning-path')}
        >
          <Text style={[styles.ctaBtnText, { color: '#fff' }]}>
            Start Your Journey
          </Text>
        </TouchableOpacity>
        <View style={styles.xpRowCard}>
          <Ionicons
            name='flash'
            size={14}
            color={COLORS.primary}
            style={{ marginRight: 2 }}
          />
          <Text style={[styles.xpText, { color: '#fff' }]}>+100 XP</Text>
        </View>
        {/* Progress Bar and Label */}
        <View style={{ width: '100%', marginTop: 10, marginBottom: 2 }}>
          <View
            style={{
              height: 8,
              backgroundColor: isDark ? '#6B7280' : '#E6EAF2',
              borderRadius: 4,
              overflow: 'hidden',
              width: '100%',
            }}
          >
            <View
              style={{
                height: '100%',
                backgroundColor: COLORS.primary,
                borderRadius: 4,
                width: `${PROGRESS * 100}%`,
              }}
            />
          </View>
        </View>
        <Text style={[styles.progressLabel, { color: '#fff' }]}>
          Progress {LEVEL}/{TOTAL_LEVELS}
        </Text>
      </View>
      {/* Divider */}
      <View style={styles.sectionDivider} />
      {/* Advanced Learning Card */}
      <View style={[styles.card, { backgroundColor: cardBackground }]}>
        <View style={styles.cardHeaderRow}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons
              name='bulb-outline'
              size={18}
              color={COLORS.primary}
              style={{ marginRight: 6 }}
            />
            <Text style={[styles.cardTitle, { color: '#fff' }]}>
              Advanced Learning
            </Text>
          </View>
          <TouchableOpacity onPress={() => router.push('/advanced-learning')}>
            <Text style={[styles.viewAll, { color: '#fff' }]}>View All</Text>
          </TouchableOpacity>
        </View>
        <Text style={[styles.cardDesc, { color: '#fff' }]}>
          Pick exactly what you want to learn — Forex, Crypto, Price Action, and
          more.
        </Text>
        <View style={styles.advancedGrid}>
          {ADVANCED_TOPICS.map((topic, idx) => (
            <View
              key={idx}
              style={[
                styles.advancedCard,
                {
                  backgroundColor: advancedCardBackground,
                  borderWidth: 1,
                  borderColor: advancedCardBorder,
                },
              ]}
            >
              <Ionicons
                name={topic.icon as any}
                size={28}
                color={COLORS.primary}
                style={{ marginBottom: 4 }}
              />
              <Text
                style={[styles.advancedTitle, { color: advancedTextColor }]}
              >
                {topic.title}
              </Text>
              <Text
                style={[styles.advancedLevel, { color: advancedTextColor }]}
              >
                {topic.level}
              </Text>
              <Text style={[styles.advancedXP, { color: advancedTextColor }]}>
                XP: {topic.xp}
              </Text>
              <TouchableOpacity style={styles.advancedBtn}>
                <Text
                  style={[styles.advancedBtnText, { color: advancedTextColor }]}
                >
                  Start Learning
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  sectionHeader: {
    paddingHorizontal: SPACING.lg,
    marginTop: 8,
    marginBottom: 2,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: SIZES.body2,
    color: COLORS.text,
    marginBottom: 2,
  },
  sectionSubtitle: {
    fontSize: SIZES.body5,
    color: COLORS.textSecondary,
    marginBottom: 8,
  },
  card: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: SIZES.radius,
    padding: SPACING.lg,
    marginHorizontal: 12,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  cardTitle: { fontWeight: 'bold', fontSize: SIZES.body3, color: COLORS.text },
  cardDesc: {
    color: COLORS.textSecondary,
    fontSize: SIZES.body5,
    marginBottom: 8,
  },
  levelBadge: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginLeft: 8,
  },
  levelBadgeText: { color: '#fff', fontWeight: 'bold', fontSize: 12 },
  stepsRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    marginBottom: 10,
    marginTop: 4,
  },
  stepCol: {
    alignItems: 'center',
    marginRight: 12,
    minWidth: 40,
  },
  stepCircleActive: {
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepCircleCurrent: {
    backgroundColor: COLORS.text,
    borderRadius: 16,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepCircleLocked: {
    backgroundColor: '#E6EAF2',
    borderRadius: 16,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepCircleText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
  stepLabel: {
    fontSize: SIZES.body5,
    color: COLORS.textSecondary,
    marginTop: 2,
    textAlign: 'center',
  },
  ctaBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  ctaBtnText: { color: '#fff', fontWeight: 'bold', fontSize: SIZES.body4 },
  xpRowCard: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  xpText: { color: COLORS.primary, fontWeight: 'bold', fontSize: SIZES.body5 },
  progressBarBg: {
    height: 6,
    backgroundColor: '#E6EAF2',
    borderRadius: 3,
    marginTop: 10,
    marginBottom: 2,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 3,
  },
  progressLabel: {
    fontSize: SIZES.body5,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  sectionDivider: {
    height: 12,
    backgroundColor: 'transparent',
  },
  viewAll: { color: COLORS.primary, fontWeight: 'bold', fontSize: SIZES.body5 },
  advancedGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  advancedCard: {
    backgroundColor: '#F8F9FB',
    borderRadius: 12,
    padding: 12,
    width: '47%',
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  advancedTitle: {
    fontWeight: 'bold',
    fontSize: SIZES.body5,
    color: COLORS.text,
    marginBottom: 2,
    textAlign: 'center',
  },
  advancedLevel: {
    fontSize: SIZES.body5,
    color: COLORS.textSecondary,
    marginBottom: 2,
  },
  advancedXP: {
    fontSize: SIZES.body5,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  advancedBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginTop: 6,
  },
  advancedBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: SIZES.body5,
  },
});
