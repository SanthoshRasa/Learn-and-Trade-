import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import { COLORS, SIZES } from '../../constants/theme';

const MOCK_PROFILE = {
  avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=trader',
  name: 'TraderNinja',
  badge: 'SGT',
  learningStyle: 'Visual',
  level: 4,
  levelName: 'Risk Tactician',
  xp: 830,
  xpMax: 1000,
  topBadge: 'Streak Champ',
  trainingMode: true,
  currentLevel: 5,
  currentLevelName: 'Market Explorer',
  currentCourse: 'Swing Trading',
  skillProgress: 0.72,
  bookmarked: ['Trend Basics', 'Risk Mgmt', 'Market News'],
  badges: [
    { icon: 'star', label: 'First Trade' },
    { icon: 'swap-horizontal', label: '100 XP Club' },
    { icon: 'flash', label: 'Streak Champ' },
    { icon: 'lock-closed', label: 'Pro Trader Unlock at L6', locked: true },
  ],
  stats: [
    { icon: 'flame', label: 'Day Streak', value: 12 },
    { icon: 'timer', label: 'Longest Streak', value: 21 },
    { icon: 'help-circle', label: 'Quizzes Completed', value: 8 },
    { icon: 'trending-up', label: 'Trades Simulated', value: 15 },
    { icon: 'book', label: 'Lessons Finished', value: 19 },
    { icon: 'layers', label: 'Modules Unlocked', value: 6 },
  ],
  friends: [
    {
      name: 'Jack',
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=jack',
      xp: 900,
    },
    {
      name: 'You',
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=you',
      xp: 830,
    },
    {
      name: 'Lina',
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=lina',
      xp: 750,
    },
  ],
  rank: 12,
};

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [trainingMode, setTrainingMode] = useState(MOCK_PROFILE.trainingMode);

  return (
    <ScrollView
      style={{
        backgroundColor: isDark ? COLORS.backgroundDark : COLORS.background,
      }}
    >
      {/* Profile Card */}
      <View
        style={[
          styles.card,
          {
            backgroundColor: isDark
              ? COLORS.cardBackgroundDark
              : COLORS.cardBackground,
          },
        ]}
      >
        <View style={styles.profileRow}>
          <View style={{ position: 'relative' }}>
            <Image
              source={{ uri: MOCK_PROFILE.avatar }}
              style={styles.avatar}
            />
            <View style={styles.notifBadge}>
              <Text style={styles.notifBadgeText}>3</Text>
            </View>
          </View>
          <View style={{ flex: 1, marginLeft: 16 }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 2,
              }}
            >
              <Text
                style={[
                  styles.name,
                  { color: isDark ? COLORS.textDark : COLORS.text },
                ]}
              >
                {' '}
                {MOCK_PROFILE.name}{' '}
              </Text>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{MOCK_PROFILE.badge}</Text>
              </View>
            </View>
            <Text
              style={[
                styles.learningStyle,
                {
                  color: isDark
                    ? COLORS.textSecondaryDark
                    : COLORS.textSecondary,
                },
              ]}
            >
              Learning Style:{' '}
              <Text style={styles.learningStyleValue}>
                {MOCK_PROFILE.learningStyle}
              </Text>
            </Text>
          </View>
        </View>
        <View style={styles.levelRow}>
          <Ionicons
            name='barbell'
            size={18}
            color={COLORS.primary}
            style={{ marginRight: 4 }}
          />
          <Text
            style={[
              styles.levelText,
              { color: isDark ? COLORS.textDark : COLORS.text },
            ]}
          >
            Level {MOCK_PROFILE.level}: {MOCK_PROFILE.levelName}
          </Text>
          <Text
            style={[
              styles.xpText,
              {
                color: isDark ? COLORS.textSecondaryDark : COLORS.textSecondary,
              },
            ]}
          >
            {MOCK_PROFILE.xp} / {MOCK_PROFILE.xpMax} XP
          </Text>
        </View>
        <View style={styles.xpBarBg}>
          <View
            style={[
              styles.xpBarFill,
              { width: `${(MOCK_PROFILE.xp / MOCK_PROFILE.xpMax) * 100}%` },
            ]}
          />
        </View>
        <View style={styles.topBadgeRow}>
          <MaterialCommunityIcons
            name='chart-bar'
            size={18}
            color={COLORS.primary}
            style={{ marginRight: 4 }}
          />
          <Text
            style={[
              styles.topBadgeLabel,
              {
                color: isDark ? COLORS.textSecondaryDark : COLORS.textSecondary,
              },
            ]}
          >
            Top Badge:
          </Text>
          <Text
            style={[
              styles.topBadgeValue,
              { color: isDark ? COLORS.primary : COLORS.primary },
            ]}
          >
            {' '}
            {MOCK_PROFILE.topBadge}
          </Text>
        </View>
        <View style={styles.trainingRow}>
          <MaterialCommunityIcons
            name='run'
            size={18}
            color={COLORS.primary}
            style={{ marginRight: 4 }}
          />
          <Text
            style={[
              styles.trainingLabel,
              { color: isDark ? COLORS.textDark : COLORS.text },
            ]}
          >
            Training Mode
          </Text>
          <Switch value={trainingMode} onValueChange={setTrainingMode} />
        </View>
      </View>

      {/* Current Level & Course Card */}
      <View
        style={[
          styles.card,
          {
            backgroundColor: isDark
              ? COLORS.cardBackgroundDark
              : COLORS.cardBackground,
          },
        ]}
      >
        <View style={styles.levelCourseRow}>
          <Ionicons
            name='medal'
            size={18}
            color={COLORS.primary}
            style={{ marginRight: 4 }}
          />
          <Text
            style={[
              styles.currentLevelText,
              { color: isDark ? COLORS.textDark : COLORS.text },
            ]}
          >
            L{MOCK_PROFILE.currentLevel}: {MOCK_PROFILE.currentLevelName}
          </Text>
          <TouchableOpacity style={styles.pathBtn}>
            <Text style={styles.pathBtnText}>Path</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.courseRow}>
          <Text
            style={[
              styles.courseLabel,
              {
                color: isDark ? COLORS.textSecondaryDark : COLORS.textSecondary,
              },
            ]}
          >
            Current Course
          </Text>
          <Text
            style={[
              styles.courseName,
              { color: isDark ? COLORS.textDark : COLORS.text },
            ]}
          >
            {MOCK_PROFILE.currentCourse}
          </Text>
          <View style={styles.skillProgressCircle}>
            <Text style={styles.skillProgressText}>
              {Math.round(MOCK_PROFILE.skillProgress * 100)}%
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={[styles.resumeBtn, { backgroundColor: COLORS.primary }]}
        >
          <Text style={[styles.resumeBtnText, { color: '#fff' }]}>Resume</Text>
        </TouchableOpacity>
        <View style={styles.bookmarkedRow}>
          {MOCK_PROFILE.bookmarked.map((mod, i) => (
            <View key={i} style={styles.bookmarkChip}>
              <Text style={styles.bookmarkChipText}>{mod}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Badges Section */}
      <View style={styles.sectionHeaderRow}>
        <Ionicons
          name='trophy'
          size={20}
          color={COLORS.primary}
          style={{ marginRight: 4 }}
        />
        <Text
          style={[
            styles.sectionTitle,
            { color: isDark ? COLORS.textDark : COLORS.text },
          ]}
        >
          Badges
        </Text>
        <TouchableOpacity style={{ marginLeft: 'auto' }}>
          <Text style={[styles.viewAll, { color: COLORS.primary }]}>
            View All
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.badgesGrid}>
        {MOCK_PROFILE.badges.map((b, i) => (
          <View
            key={i}
            style={[
              styles.badgeCard,
              b.locked && styles.badgeLocked,
              {
                backgroundColor: isDark
                  ? COLORS.cardBackgroundDark
                  : COLORS.cardBackground,
              },
            ]}
          >
            <Ionicons
              name={b.icon as any}
              size={28}
              color={b.locked ? COLORS.textSecondary : COLORS.primary}
            />
            <Text
              style={[
                styles.badgeCardLabel,
                b.locked && styles.badgeLockedText,
                { color: isDark ? COLORS.textDark : COLORS.text },
              ]}
            >
              {b.label}
            </Text>
          </View>
        ))}
      </View>

      {/* Stats Grid */}
      <View style={styles.statsGrid}>
        {MOCK_PROFILE.stats.map((s, i) => (
          <View
            key={i}
            style={[
              styles.statCard,
              {
                backgroundColor: isDark
                  ? COLORS.cardBackgroundDark
                  : COLORS.cardBackground,
              },
            ]}
          >
            <Ionicons name={s.icon as any} size={22} color={COLORS.primary} />
            <Text
              style={[
                styles.statValue,
                { color: isDark ? COLORS.textDark : COLORS.text },
              ]}
            >
              {s.value}
            </Text>
            <Text
              style={[
                styles.statLabel,
                {
                  color: isDark
                    ? COLORS.textSecondaryDark
                    : COLORS.textSecondary,
                },
              ]}
            >
              {s.label}
            </Text>
          </View>
        ))}
      </View>

      {/* Friends Card */}
      <View
        style={[
          styles.card,
          styles.friendsCard,
          {
            backgroundColor: isDark
              ? COLORS.cardBackgroundDark
              : COLORS.cardBackground,
          },
        ]}
      >
        <View style={styles.friendsHeaderRow}>
          <Ionicons
            name='people'
            size={20}
            color={COLORS.primary}
            style={{ marginRight: 4 }}
          />
          <Text
            style={[
              styles.sectionTitle,
              { color: isDark ? COLORS.textDark : COLORS.text },
            ]}
          >
            Friends
          </Text>
          <Text
            style={[
              styles.rankText,
              {
                color: isDark ? COLORS.textSecondaryDark : COLORS.textSecondary,
              },
            ]}
          >
            Rank: #{MOCK_PROFILE.rank}
          </Text>
        </View>
        <View style={styles.friendsAvatarsRow}>
          {MOCK_PROFILE.friends.map((f, i) => (
            <View key={i} style={styles.friendAvatarCol}>
              <Image
                source={{ uri: f.avatar }}
                style={[
                  styles.friendAvatar,
                  {
                    backgroundColor: isDark
                      ? COLORS.cardBackgroundDark
                      : COLORS.cardBackground,
                  },
                ]}
              />
              <Text
                style={[
                  styles.friendName,
                  { color: isDark ? COLORS.textDark : COLORS.text },
                ]}
              >
                {f.name}
              </Text>
              <Text
                style={[
                  styles.friendXP,
                  {
                    color: isDark
                      ? COLORS.textSecondaryDark
                      : COLORS.textSecondary,
                  },
                ]}
              >
                {f.xp} XP
              </Text>
            </View>
          ))}
        </View>
        <View style={styles.friendsBtnRow}>
          <TouchableOpacity
            style={[styles.friendBtn, { backgroundColor: COLORS.primary }]}
          >
            <Text style={[styles.friendBtnText, { color: '#fff' }]}>
              Add Friend
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.friendBtn, { backgroundColor: COLORS.primary }]}
          >
            <Text style={[styles.friendBtnText, { color: '#fff' }]}>
              Invite
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionBtnCol}>
        <TouchableOpacity style={styles.actionBtn}>
          <Text style={styles.actionBtnText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn}>
          <Text style={styles.actionBtnText}>Customize Avatar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn}>
          <Text style={styles.actionBtnText}>Share Progress</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn}>
          <Text style={styles.actionBtnText}>Switch Course</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn}>
          <Text style={styles.actionBtnText}>Settings</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <Text style={styles.footer}>
        © 2025 TradingLearner. All rights reserved.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    margin: 16,
    marginBottom: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: COLORS.cardBackground,
  },
  notifBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  notifBadgeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  name: {
    fontWeight: 'bold',
    fontSize: SIZES.h3,
    marginRight: 8,
  },
  badge: {
    backgroundColor: COLORS.primary + '22',
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 4,
  },
  badgeText: {
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: SIZES.body5,
  },
  learningStyle: {
    fontSize: SIZES.body5,
    marginTop: 2,
  },
  learningStyleValue: {
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  levelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 2,
  },
  levelText: {
    fontWeight: 'bold',
    fontSize: SIZES.body4,
    marginRight: 8,
  },
  xpText: {
    fontSize: SIZES.body5,
    color: COLORS.textSecondary,
    marginLeft: 'auto',
  },
  xpBarBg: {
    height: 8,
    backgroundColor: COLORS.cardBackground,
    borderRadius: 4,
    marginVertical: 4,
    overflow: 'hidden',
  },
  xpBarFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 4,
  },
  topBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  topBadgeLabel: {
    fontSize: SIZES.body5,
    color: COLORS.textSecondary,
    marginRight: 4,
  },
  topBadgeValue: {
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  trainingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  trainingLabel: {
    fontSize: SIZES.body5,
    marginRight: 8,
  },
  levelCourseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  currentLevelText: {
    fontWeight: 'bold',
    fontSize: SIZES.body4,
    marginRight: 8,
  },
  pathBtn: {
    backgroundColor: COLORS.primary + '22',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 2,
    marginLeft: 'auto',
  },
  pathBtnText: {
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: SIZES.body5,
  },
  courseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  courseLabel: {
    fontSize: SIZES.body5,
    color: COLORS.textSecondary,
    marginRight: 8,
  },
  courseName: {
    fontWeight: 'bold',
    fontSize: SIZES.body3,
    marginRight: 8,
  },
  skillProgressCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.cardBackground,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 'auto',
  },
  skillProgressText: {
    fontWeight: 'bold',
    fontSize: SIZES.body3,
    color: COLORS.primary,
  },
  resumeBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: 'center',
    marginBottom: 8,
  },
  resumeBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: SIZES.body4,
  },
  bookmarkedRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 4,
  },
  bookmarkChip: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 2,
    marginRight: 8,
    marginBottom: 4,
  },
  bookmarkChipText: {
    color: COLORS.textSecondary,
    fontSize: SIZES.body5,
    fontWeight: 'bold',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    marginHorizontal: 16,
    marginBottom: 4,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: SIZES.body2,
    marginRight: 8,
  },
  viewAll: {
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: SIZES.body5,
  },
  badgesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 16,
    marginBottom: 8,
  },
  badgeCard: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: COLORS.cardBackground,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 4,
  },
  badgeCardLabel: {
    fontSize: SIZES.body5,
    fontWeight: 'bold',
    marginTop: 4,
    color: COLORS.text,
    textAlign: 'center',
  },
  badgeLocked: {
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.cardBackground,
  },
  badgeLockedText: {
    color: COLORS.textSecondary,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 16,
    marginBottom: 8,
  },
  statCard: {
    width: '47%',
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 4,
    padding: 12,
  },
  statValue: {
    fontWeight: 'bold',
    fontSize: SIZES.body2,
    marginTop: 2,
    color: COLORS.primary,
  },
  statLabel: {
    fontSize: SIZES.body5,
    color: COLORS.textSecondary,
    marginTop: 2,
    textAlign: 'center',
  },
  friendsCard: {
    marginTop: 16,
    marginBottom: 8,
  },
  friendsHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rankText: {
    marginLeft: 'auto',
    color: COLORS.textSecondary,
    fontWeight: 'bold',
  },
  friendsAvatarsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  friendAvatarCol: {
    alignItems: 'center',
    marginHorizontal: 8,
  },
  friendAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.cardBackground,
  },
  friendName: {
    fontWeight: 'bold',
    fontSize: SIZES.body5,
    marginTop: 2,
    color: COLORS.text,
  },
  friendXP: {
    fontSize: SIZES.body5,
    color: COLORS.textSecondary,
  },
  friendsBtnRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 4,
  },
  friendBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 8,
  },
  friendBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: SIZES.body4,
  },
  actionBtnCol: {
    margin: 16,
    marginTop: 8,
  },
  actionBtn: {
    backgroundColor: COLORS.text,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 12,
  },
  actionBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: SIZES.body3,
  },
  footer: {
    textAlign: 'center',
    color: COLORS.textSecondary,
    fontSize: SIZES.body5,
    marginVertical: 24,
  },
});
