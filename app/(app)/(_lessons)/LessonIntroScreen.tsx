import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS } from '../../../constants/theme';

const { width } = Dimensions.get('window');

export default function LessonIntroScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  // Placeholder values for demo
  const lessonTitle = 'What is Trading?';
  const lessonSubtitle =
    "Learn how trading works and why it's different from investing.";
  const badge = 'Novice Navigator';
  const progress = 1; // 1/10
  const total = 10;
  const xp = 5;

  // Handler for continue
  const handleContinue = () => {
    alert('Continue to next step! (No next screen implemented yet)');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Text style={styles.appName}>TradingLearner</Text>
        <View style={styles.headerIcons}>
          <Ionicons
            name='flame'
            size={18}
            color={COLORS.primary}
            style={{ marginRight: 6 }}
          />
          <Text style={styles.headerStat}>3</Text>
          <MaterialCommunityIcons
            name='star-circle'
            size={18}
            color={COLORS.primary}
            style={{ marginLeft: 12, marginRight: 2 }}
          />
          <Text style={styles.headerStat}>120</Text>
        </View>
      </View>
      {/* Progress Bar */}
      <View style={styles.progressRow}>
        <View style={styles.progressBarBg}>
          <View
            style={[
              styles.progressBarFill,
              { width: `${(progress / total) * 100}%` },
            ]}
          />
        </View>
        <Text style={styles.progressText}>
          {progress}/{total}
        </Text>
      </View>
      {/* Title & Badge */}
      <Text style={styles.title}>{lessonTitle}</Text>
      <Text style={styles.subtitle}>{lessonSubtitle}</Text>
      <View style={styles.badgeWrap}>
        <MaterialCommunityIcons
          name='flag-checkered'
          size={18}
          color={COLORS.primary}
        />
        <Text style={styles.badgeText}>{badge}</Text>
      </View>
      {/* Hero Illustration */}
      <View style={styles.heroCard}>
        {/* Placeholder for illustration */}
        <MaterialCommunityIcons
          name='chart-line'
          size={48}
          color={COLORS.primary}
          style={{ marginBottom: 8 }}
        />
        <MaterialCommunityIcons
          name='account-circle'
          size={40}
          color={COLORS.info}
          style={{ position: 'absolute', right: 24, bottom: 18 }}
        />
        <Text style={styles.heroText}>Stock market chart with trader</Text>
      </View>
      {/* XP Reward */}
      <View style={styles.xpRewardWrap}>
        <MaterialCommunityIcons
          name='star-circle'
          size={22}
          color='#F6C244'
          style={{ marginRight: 4 }}
        />
        <Text style={styles.xpRewardText}>+{xp} XP</Text>
        <Text style={styles.xpRewardSub}>Complete this lesson</Text>
      </View>
      {/* Swipe to continue */}
      <TouchableOpacity
        style={styles.ctaBtn}
        onPress={handleContinue}
        activeOpacity={0.85}
      >
        <Text style={styles.ctaBtnText}>Swipe to continue</Text>
        <Ionicons
          name='arrow-forward'
          size={20}
          color='#fff'
          style={{ marginLeft: 8 }}
        />
      </TouchableOpacity>
      <View style={styles.swipeHintRow}>
        <Ionicons name='chevron-forward' size={18} color={COLORS.primary} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 18,
    paddingTop: 32,
    alignItems: 'center',
  },
  headerRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  appName: {
    fontWeight: 'bold',
    fontSize: 18,
    color: COLORS.primary,
    letterSpacing: 0.5,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerStat: {
    fontWeight: 'bold',
    color: COLORS.text,
    fontSize: 15,
  },
  progressRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
    marginTop: 2,
  },
  progressBarBg: {
    flex: 1,
    height: 7,
    backgroundColor: COLORS.cardBackground,
    borderRadius: 6,
    marginRight: 10,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 6,
  },
  progressText: {
    fontWeight: 'bold',
    color: COLORS.primary,
    fontSize: 13,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.text,
    marginTop: 18,
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginBottom: 12,
    textAlign: 'center',
    lineHeight: 22,
  },
  badgeWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#F6F8FC',
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginBottom: 18,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  badgeText: {
    fontWeight: 'bold',
    color: COLORS.primary,
    fontSize: 15,
    marginLeft: 6,
  },
  heroCard: {
    width: width - 48,
    height: 160,
    backgroundColor: '#E6EAF2',
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
    marginTop: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    position: 'relative',
  },
  heroText: {
    color: COLORS.textSecondary,
    fontSize: 15,
    marginTop: 8,
  },
  xpRewardWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fffbe7',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 10,
    shadowColor: '#F6C244',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  xpRewardText: {
    color: '#F6C244',
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 8,
  },
  xpRewardSub: {
    color: COLORS.textSecondary,
    fontSize: 13,
    marginLeft: 4,
  },
  ctaBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.text,
    borderRadius: 22,
    paddingVertical: 14,
    paddingHorizontal: 36,
    marginTop: 10,
    marginBottom: 6,
    alignSelf: 'center',
    shadowColor: COLORS.text,
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  ctaBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
    marginRight: 6,
  },
  swipeHintRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
});
