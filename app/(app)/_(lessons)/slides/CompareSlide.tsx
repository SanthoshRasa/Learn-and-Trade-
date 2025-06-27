import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS, SPACING } from '../../../../constants/theme';

const SCREEN_WIDTH = Dimensions.get('window').width;

type TabKey = 'time' | 'risk' | 'profit';
interface CompareSlideProps {
  title?: string;
  xp?: number;
  slide?: number;
  totalSlides?: number;
  onPrev?: () => void;
  onNext?: () => void;
}

const TABS: { key: TabKey; label: string; icon: any }[] = [
  { key: 'time', label: 'Time', icon: 'time-outline' },
  { key: 'risk', label: 'Risk', icon: 'flash-outline' },
  { key: 'profit', label: 'Profit', icon: 'funnel-outline' },
];

const TABLE: Record<
  TabKey,
  { aspect: string; trading: string; investing: string }[]
> = {
  time: [
    {
      aspect: 'Time Frame',
      trading: 'Short-term (minutes to months)',
      investing: 'Long-term (years to decades)',
    },
    {
      aspect: 'Focus',
      trading: 'Price movements & timing',
      investing: 'Company growth & value',
    },
    {
      aspect: 'Activity Level',
      trading: 'More frequent actions',
      investing: 'Buy and hold',
    },
    {
      aspect: 'Risk Level',
      trading: 'Usually higher',
      investing: 'Usually lower',
    },
    {
      aspect: 'Profit Source',
      trading: 'Price changes',
      investing: 'Price changes + dividends',
    },
  ],
  risk: [
    {
      aspect: 'Risk Level',
      trading: 'Usually higher',
      investing: 'Usually lower',
    },
    { aspect: 'Volatility', trading: 'High', investing: 'Lower' },
    { aspect: 'Loss Potential', trading: 'Significant', investing: 'Moderate' },
  ],
  profit: [
    {
      aspect: 'Profit Source',
      trading: 'Price changes',
      investing: 'Price changes + dividends',
    },
    { aspect: 'Frequency', trading: 'Frequent', investing: 'Less frequent' },
    { aspect: 'Growth', trading: 'Rapid', investing: 'Steady' },
  ],
};

const styles = StyleSheet.create({
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#232B3B',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  headerBackBtn: {
    marginRight: 8,
    padding: 4,
  },
  headerLabel: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
  },
  headerTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  headerRightCol: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#181A20',
    borderRadius: 16,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginLeft: 6,
  },
  streakText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  xpBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#181A20',
    borderRadius: 16,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginLeft: 6,
  },
  xpBadgeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  scrollContainer: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: 24,
    alignItems: 'center',
  },
  subtitle: {
    color: COLORS.textSecondary,
    fontSize: 15,
    marginTop: 8,
    marginBottom: 12,
    textAlign: 'center',
    maxWidth: 340,
  },
  comparisonCard: {
    backgroundColor: '#232B3B',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
    width: '100%',
    maxWidth: 340,
  },
  comparisonCardText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 8,
    marginTop: 4,
    width: '100%',
    maxWidth: 340,
  },
  tabBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: 'transparent',
    marginHorizontal: 2,
  },
  tabBtnActive: {
    backgroundColor: '#E6EAF2',
  },
  tabText: {
    color: COLORS.textSecondary,
    fontWeight: 'bold',
    fontSize: 15,
  },
  tabTextActive: {
    color: COLORS.primary,
  },
  tableWrap: {
    backgroundColor: '#232B3B',
    borderRadius: 12,
    width: '100%',
    maxWidth: 340,
    marginBottom: 0,
    overflow: 'hidden',
    borderWidth: 0,
  },
  tableHeaderRow: {
    flexDirection: 'row',
    backgroundColor: '#2E3440',
    borderBottomWidth: 1,
    borderColor: '#232B3B',
  },
  tableHeaderCell: {
    flex: 1,
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    padding: 10,
    textAlign: 'center',
    backgroundColor: '#2E3440',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#232B3B',
    backgroundColor: '#232B3B',
  },
  tableCellAspect: {
    flex: 1,
    color: '#fff',
    fontSize: 14,
    padding: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    backgroundColor: '#2E3440',
  },
  tableCell: {
    flex: 1,
    color: '#fff',
    fontSize: 14,
    padding: 10,
    textAlign: 'center',
    backgroundColor: '#232B3B',
  },
  styleBtnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 340,
    marginBottom: 16,
    marginTop: 16,
    gap: 8,
  },
  styleBtn: {
    backgroundColor: '#232B3B',
    borderRadius: 10,
    paddingVertical: 16,
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 0,
    marginRight: 0,
    marginLeft: 0,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  styleBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  badgeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F7FA',
    borderRadius: 12,
    padding: 16,
    marginBottom: 18,
    width: '100%',
    maxWidth: 340,
  },
  badgeTitle: {
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 2,
  },
  badgeDesc: {
    color: COLORS.textSecondary,
    fontSize: 14,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#232B3B',
    borderRadius: 6,
    paddingHorizontal: 24,
    paddingVertical: 18,
    margin: 8,
  },
  circleBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#181A20',
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
  continueBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 4,
  },
  swipeText: {
    color: '#B0B4C1',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default function CompareSlide({
  title = 'Trading vs. Investing',
  xp = 20,
  slide = 6,
  totalSlides = 10,
  onPrev,
  onNext,
}: CompareSlideProps) {
  const [tab, setTab] = useState<TabKey>('time');
  const router = useRouter();
  const params = useLocalSearchParams();

  const handlePrev = () => {
    if (onPrev) {
      onPrev();
    } else {
      router.replace('/(app)/_(lessons)/slides/CaseStudySlide', { ...params });
    }
  };
  const handleNext = () => {
    if (onNext) {
      onNext();
    } else {
      router.replace('/(app)/_(lessons)/slides/MythBusterSlide', { ...params });
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.backgroundDark }}>
      {/* Header */}
      <View style={styles.headerBar}>
        <TouchableOpacity style={styles.headerBackBtn} onPress={onPrev}>
          <Ionicons name='chevron-back' size={20} color='#fff' />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerLabel}>Trading Basics</Text>
          <Text style={styles.headerTitle}>{title}</Text>
        </View>
        <View style={styles.headerRightCol}>
          <View style={styles.streakBadge}>
            <Ionicons
              name='flame-outline'
              size={16}
              color={COLORS.primary}
              style={{ marginRight: 4 }}
            />
            <Text style={styles.streakText}>3 day streak</Text>
          </View>
          <View style={styles.xpBadge}>
            <Text style={styles.xpBadgeText}>+{xp} XP</Text>
          </View>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Subtitle/Description */}
        <Text style={styles.subtitle}>
          While trading and investing both involve financial markets,
          they&apos;re quite different approaches.
        </Text>
        {/* Comparison Card */}
        <View style={styles.comparisonCard}>
          <Ionicons
            name='swap-horizontal-outline'
            size={32}
            color='#fff'
            style={{ marginBottom: 8 }}
          />
          <Text style={styles.comparisonCardText}>
            Trading vs Investing Comparison
          </Text>
        </View>
        {/* Tab Bar */}
        <View style={styles.tabBar}>
          {TABS.map(t => (
            <TouchableOpacity
              key={t.key}
              style={[styles.tabBtn, tab === t.key && styles.tabBtnActive]}
              onPress={() => setTab(t.key)}
            >
              <Ionicons
                name={t.icon}
                size={18}
                color={tab === t.key ? COLORS.primary : COLORS.textSecondary}
                style={{ marginRight: 4 }}
              />
              <Text
                style={[styles.tabText, tab === t.key && styles.tabTextActive]}
              >
                {t.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {/* Table */}
        <View style={styles.tableWrap}>
          <View style={styles.tableHeaderRow}>
            <Text style={styles.tableHeaderCell}>Aspect</Text>
            <Text style={styles.tableHeaderCell}>Trading</Text>
            <Text style={styles.tableHeaderCell}>Investing</Text>
          </View>
          {TABLE[tab].map(
            (
              row: { aspect: string; trading: string; investing: string },
              idx: number
            ) => (
              <View key={idx} style={styles.tableRow}>
                <Text style={styles.tableCellAspect}>{row.aspect}</Text>
                <Text style={styles.tableCell}>{row.trading}</Text>
                <Text style={styles.tableCell}>{row.investing}</Text>
              </View>
            )
          )}
        </View>
        {/* Style Buttons */}
        <View style={styles.styleBtnRow}>
          <TouchableOpacity style={styles.styleBtn}>
            <Text style={styles.styleBtnText}>Trading Style</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.styleBtn}>
            <Text style={styles.styleBtnText}>Investing Style</Text>
          </TouchableOpacity>
        </View>
        {/* Badge Unlocked */}
        <View style={styles.badgeBox}>
          <Ionicons
            name='ribbon-outline'
            size={28}
            color={COLORS.primary}
            style={{ marginRight: 10 }}
          />
          <View>
            <Text style={styles.badgeTitle}>Badge Unlocked!</Text>
            <Text style={styles.badgeDesc}>
              {' '}
              <Text style={{ color: '#E573C0' }}>●</Text> Mastered the
              Difference
            </Text>
          </View>
        </View>
        {/* Navigation Bar */}
        <View style={styles.footerRow}>
          <TouchableOpacity style={styles.circleBtn} onPress={handlePrev}>
            <Ionicons name='chevron-back' size={22} color={COLORS.primary} />
          </TouchableOpacity>
          <Text style={styles.swipeText}>Swipe to continue</Text>
          <TouchableOpacity style={styles.circleBtn} onPress={handleNext}>
            <Ionicons name='chevron-forward' size={22} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
