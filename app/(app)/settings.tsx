import { Ionicons } from '@expo/vector-icons';
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

const MOCK_USER = {
  avatar: 'https://api.dicebear.com/7.x/micah/svg?seed=Jane',
  name: 'Jane Doe',
  nickname: 'traderjane',
  email: 'jane@email.com',
};

export default function SettingsScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [quizReminders, setQuizReminders] = useState(true);
  const [badgeUnlocks, setBadgeUnlocks] = useState(true);
  const [levelUps, setLevelUps] = useState(true);
  const [newModules, setNewModules] = useState(false);
  const [audioAutoplay, setAudioAutoplay] = useState(false);
  const [xpAnimations, setXpAnimations] = useState(true);
  const [leaderboardVis, setLeaderboardVis] = useState(true);
  const [soundEffects, setSoundEffects] = useState(false);
  const [dailyReminder, setDailyReminder] = useState(true);
  const [weeklyReport, setWeeklyReport] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [leaderboardComp, setLeaderboardComp] = useState(false);
  const [privacyMode, setPrivacyMode] = useState(false);
  const [theme, setTheme] = useState('Light');

  const textColor = isDark ? '#fff' : COLORS.text;

  return (
    <ScrollView
      style={{
        backgroundColor: isDark ? COLORS.backgroundDark : COLORS.background,
      }}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text
          style={[
            styles.headerTitle,
            {
              color: textColor,
              textAlign: 'center',
              flex: 1,
            },
          ]}
        >
          Settings
        </Text>
      </View>

      {/* Account Section */}
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
        <Text
          style={[
            styles.sectionLabel,
            { color: textColor, fontWeight: 'bold' },
          ]}
        >
          Account
        </Text>
        <View style={styles.accountRow}>
          <Image source={{ uri: MOCK_USER.avatar }} style={styles.avatar} />
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text
              style={[
                styles.accountName,
                { color: textColor, fontWeight: 'bold' },
              ]}
            >
              {MOCK_USER.name}
            </Text>
            <Text style={[styles.accountSub, { color: textColor }]}>
              Nickname: {MOCK_USER.nickname}
            </Text>
            <Text style={[styles.accountSub, { color: textColor }]}>
              {MOCK_USER.email}
            </Text>
          </View>
          <TouchableOpacity>
            <Ionicons name='pencil' size={20} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.rowBtn}>
          <Text
            style={[
              styles.rowBtnText,
              { color: textColor, fontWeight: 'bold' },
            ]}
          >
            Change Password
          </Text>
        </TouchableOpacity>
      </View>

      {/* Learning Preferences */}
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
        <Text
          style={[
            styles.sectionLabel,
            { color: textColor, fontWeight: 'bold' },
          ]}
        >
          Learning Preferences
        </Text>
        <View style={styles.rowBetween}>
          <Text style={[styles.rowLabel, { color: '#fff' }]}>Daily Goal</Text>
          <TouchableOpacity style={styles.dropdown}>
            <Text style={[styles.dropdownText, { color: '#fff' }]}>
              10 min/day
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={[styles.sectionSubLabel, { color: textColor }]}>
          Notifications
        </Text>
        <View style={styles.rowBetween}>
          <Text style={[styles.rowLabel, { color: textColor }]}>
            Quiz Reminders
          </Text>
          <Switch value={quizReminders} onValueChange={setQuizReminders} />
        </View>
        <View style={styles.rowBetween}>
          <Text style={[styles.rowLabel, { color: textColor }]}>
            Badge Unlocks
          </Text>
          <Switch value={badgeUnlocks} onValueChange={setBadgeUnlocks} />
        </View>
        <View style={styles.rowBetween}>
          <Text style={[styles.rowLabel, { color: textColor }]}>Level Ups</Text>
          <Switch value={levelUps} onValueChange={setLevelUps} />
        </View>
        <View style={styles.rowBetween}>
          <Text style={[styles.rowLabel, { color: textColor }]}>
            New Modules
          </Text>
          <Switch value={newModules} onValueChange={setNewModules} />
        </View>
        <View style={styles.rowBetween}>
          <Text style={[styles.rowLabel, { color: textColor }]}>
            Audio Lessons Autoplay
          </Text>
          <Switch value={audioAutoplay} onValueChange={setAudioAutoplay} />
        </View>
      </View>

      {/* Reminders & Streaks */}
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
        <Text
          style={[
            styles.sectionLabel,
            { color: textColor, fontWeight: 'bold' },
          ]}
        >
          Reminders & Streaks
        </Text>
        <View style={styles.rowBetween}>
          <Text style={[styles.rowLabel, { color: '#fff' }]}>
            Daily Reminder
          </Text>
          <TouchableOpacity style={styles.timeBtn}>
            <Text style={[styles.timeBtnText, { color: '#fff' }]}>09:00</Text>
          </TouchableOpacity>
          <Switch value={dailyReminder} onValueChange={setDailyReminder} />
        </View>
        <View style={styles.rowBetween}>
          <Text style={[styles.rowLabel, { color: textColor }]}>
            Weekly Progress Report
          </Text>
          <Switch value={weeklyReport} onValueChange={setWeeklyReport} />
        </View>
        <View style={styles.rowBetween}>
          <Text style={[styles.rowLabel, { color: textColor }]}>
            Push Notifications
          </Text>
          <Switch
            value={pushNotifications}
            onValueChange={setPushNotifications}
          />
        </View>
      </View>

      {/* Community & Friends */}
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
        <Text
          style={[
            styles.sectionLabel,
            { color: textColor, fontWeight: 'bold' },
          ]}
        >
          Community & Friends
        </Text>
        <TouchableOpacity style={styles.rowBtn}>
          <Text
            style={[
              styles.rowBtnText,
              { color: textColor, fontWeight: 'bold' },
            ]}
          >
            Manage Friends
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.rowBtn}>
          <Text
            style={[
              styles.rowBtnText,
              { color: textColor, fontWeight: 'bold' },
            ]}
          >
            Block/Unblock Users
          </Text>
        </TouchableOpacity>
      </View>

      {/* App Settings (merged) */}
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
        <Text
          style={[
            styles.sectionLabel,
            { color: textColor, fontWeight: 'bold' },
          ]}
        >
          App Settings
        </Text>
        <View style={styles.rowBetween}>
          <Text style={[styles.rowLabel, { color: textColor }]}>Version</Text>
          <Text style={[styles.versionText, { color: textColor }]}>
            v3.2.1 (2025)
          </Text>
        </View>
        <TouchableOpacity style={styles.rowBtn}>
          <Text
            style={[
              styles.rowBtnText,
              { color: textColor, fontWeight: 'bold' },
            ]}
          >
            Contact Support
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.rowBtn}>
          <Text
            style={[
              styles.rowBtnText,
              { color: textColor, fontWeight: 'bold' },
            ]}
          >
            Submit Feedback
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.rowBtn}>
          <Text
            style={[
              styles.rowBtnText,
              { color: textColor, fontWeight: 'bold' },
            ]}
          >
            Report a Bug
          </Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Action Buttons */}
      <View style={{ marginHorizontal: 16, marginTop: 24, marginBottom: 32 }}>
        <TouchableOpacity
          style={{
            backgroundColor: isDark ? '#181F2A' : '#181F2A',
            borderRadius: 8,
            paddingVertical: 16,
            alignItems: 'center',
            marginBottom: 12,
          }}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>
            Logout
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: '#fff',
            borderColor: '#181F2A',
            borderWidth: 2,
            borderRadius: 8,
            paddingVertical: 16,
            alignItems: 'center',
            marginBottom: 12,
          }}
        >
          <Text style={{ color: '#181F2A', fontWeight: 'bold', fontSize: 18 }}>
            Delete Account
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: isDark ? '#232B38' : '#F3F4F6',
            borderRadius: 8,
            paddingVertical: 16,
            alignItems: 'center',
          }}
        >
          <Text style={{ color: '#6B7280', fontWeight: 'bold', fontSize: 18 }}>
            Progress Reset
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    marginBottom: 8,
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: SIZES.h2,
  },
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
  sectionLabel: {
    fontWeight: 'bold',
    fontSize: SIZES.body2,
    marginBottom: 8,
  },
  sectionSubLabel: {
    color: COLORS.textSecondary,
    fontSize: SIZES.body5,
    marginTop: 8,
    marginBottom: 2,
  },
  accountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.cardBackground,
  },
  accountName: {
    fontWeight: 'bold',
    fontSize: SIZES.body3,
  },
  accountSub: {
    color: COLORS.textSecondary,
    fontSize: SIZES.body5,
  },
  rowBtn: {
    paddingVertical: 10,
  },
  rowBtnText: {
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: SIZES.body4,
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  rowLabel: {
    fontSize: SIZES.body4,
    color: COLORS.text,
  },
  dropdown: {
    backgroundColor: COLORS.background,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  dropdownText: {
    color: COLORS.text,
    fontWeight: 'bold',
  },
  timeBtn: {
    backgroundColor: COLORS.background,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginRight: 8,
  },
  timeBtnText: {
    color: COLORS.text,
    fontWeight: 'bold',
  },
  resetBtn: {
    backgroundColor: COLORS.background,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  resetBtnText: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  inviteBtn: {
    backgroundColor: COLORS.background,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginRight: 8,
  },
  inviteBtnText: {
    color: COLORS.textSecondary,
    fontWeight: 'bold',
  },
  joinBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  joinBtnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  versionText: {
    color: COLORS.textSecondary,
    fontSize: SIZES.body5,
  },
  logoutBtn: {
    backgroundColor: COLORS.text,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 16,
  },
  logoutBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: SIZES.body3,
  },
  deleteBtn: {
    borderWidth: 1,
    borderColor: COLORS.text,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  deleteBtnText: {
    color: COLORS.text,
    fontWeight: 'bold',
    fontSize: SIZES.body3,
  },
  progressBtn: {
    borderWidth: 1,
    borderColor: COLORS.cardBackground,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 8,
  },
  progressBtnText: {
    color: COLORS.textSecondary,
    fontWeight: 'bold',
    fontSize: SIZES.body4,
  },
});
