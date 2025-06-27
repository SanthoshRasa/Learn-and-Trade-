import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS } from '../../../../constants/theme';

const TERMS = [
  {
    term: 'Asset',
    def: 'Anything of value you can trade, like stocks or crypto.',
    icon: 'layers-outline',
  },
  {
    term: 'Market',
    def: 'A place where trading happens.',
    icon: 'business-outline',
  },
  {
    term: 'Risk',
    def: 'The chance you will lose money in a trade.',
    icon: 'warning-outline',
  },
  {
    term: 'Profit',
    def: 'Money you make when prices go your way.',
    icon: 'trending-up-outline',
  },
  {
    term: 'Trendline',
    def: 'A line on a chart showing price direction.',
    icon: 'stats-chart-outline',
  },
];

function GlossarySlide({
  lessonTitle = 'Glossary of Key Terms',
  onPrev,
  onNext,
}: {
  lessonTitle?: string;
  onPrev?: () => void;
  onNext?: () => void;
}) {
  const [showNav, setShowNav] = useState(false);
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const isAtBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 24;
    setShowNav(isAtBottom);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerBar}>
        <TouchableOpacity style={styles.headerBackBtn} onPress={onPrev}>
          <Ionicons name='chevron-back' size={20} color='#fff' />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerLabel}>Trading Basics</Text>
          <Text style={styles.headerTitle}>{lessonTitle}</Text>
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
            <Text style={styles.xpBadgeText}>+20 XP</Text>
          </View>
        </View>
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollWrap}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <View style={styles.card}>
          <View style={styles.topRow}>
            <Text style={styles.slideCount}>Slide 13 of 15</Text>
            <View style={styles.xpBadge}>
              <Ionicons
                name='flash'
                size={14}
                color='#fff'
                style={{ marginRight: 4 }}
              />
              <Text style={styles.xpBadgeText}>+10 XP</Text>
            </View>
          </View>
          <Text style={styles.title}>{lessonTitle}</Text>
          <Text style={styles.subtitle}>
            Here are some trading terms you&apos;ve learned:
          </Text>
          {/* Table */}
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderCell}>Term</Text>
              <Text style={styles.tableHeaderCell}>Definition</Text>
              <Text style={styles.tableHeaderCell}>Icon</Text>
            </View>
            {TERMS.map((row, idx) => (
              <View
                key={row.term}
                style={[styles.tableRow, idx % 2 === 1 && styles.tableRowAlt]}
              >
                <Text style={styles.tableCellTerm}>{row.term}</Text>
                <Text style={styles.tableCellDef}>{row.def}</Text>
                <View style={styles.iconCircle}>
                  <Ionicons name={row.icon as any} size={22} color='#fff' />
                </View>
              </View>
            ))}
          </View>
          {/* Did You Know Card */}
          <View style={styles.didYouKnowCard}>
            <Ionicons
              name='bulb-outline'
              size={18}
              color={COLORS.primary}
              style={{ marginRight: 8 }}
            />
            <View>
              <Text style={styles.didYouKnowTitle}>Did You Know?</Text>
              <Text style={styles.didYouKnowText}>
                Learn these terms to speak the language of traders!
              </Text>
            </View>
          </View>
          {/* XP Unlocked Card */}
          <View style={styles.xpUnlockedCard}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginBottom: 4,
              }}
            >
              <Ionicons
                name='star'
                size={18}
                color={'#fff'}
                style={{ marginHorizontal: 2 }}
              />
              <Ionicons
                name='star'
                size={18}
                color={'#fff'}
                style={{ marginHorizontal: 2 }}
              />
              <Ionicons
                name='star'
                size={18}
                color={'#fff'}
                style={{ marginHorizontal: 2 }}
              />
            </View>
            <Text style={styles.xpUnlockedText}>+10 XP Unlocked!</Text>
          </View>
        </View>
        {/* Spacer for nav bar */}
        <View style={{ height: 90 }} />
      </ScrollView>
      {/* Bottom Navigation Bar (only show at end) */}
      {showNav && (
        <View style={styles.footerRow}>
          <TouchableOpacity style={styles.circleBtn} onPress={onPrev}>
            <Ionicons name='chevron-back' size={22} color={COLORS.primary} />
          </TouchableOpacity>
          <Text style={styles.swipeText}>Swipe to continue</Text>
          <TouchableOpacity style={styles.circleBtn} onPress={onNext}>
            <Ionicons name='chevron-forward' size={22} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181A20',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
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
    width: '100%',
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
  scrollWrap: {
    alignItems: 'center',
    paddingTop: 24,
    paddingBottom: 0,
    minWidth: '100%',
  },
  card: {
    backgroundColor: '#232B3B',
    borderRadius: 12,
    padding: 18,
    width: '96%',
    maxWidth: 480,
    shadowColor: 'transparent',
    elevation: 0,
    marginBottom: 18,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  slideCount: {
    color: '#B0B4C1',
    fontSize: 13,
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 22,
    marginBottom: 4,
    marginTop: 2,
  },
  subtitle: {
    color: '#B0B4C1',
    fontSize: 15,
    marginBottom: 12,
  },
  table: {
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 16,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#232B3B',
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  tableHeaderCell: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    flex: 1,
    textAlign: 'left',
  },
  tableRow: {
    flexDirection: 'row',
    backgroundColor: '#232B3B',
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#232B3B',
  },
  tableRowAlt: {
    backgroundColor: '#181A20',
  },
  tableCellTerm: {
    flex: 1,
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  tableCellDef: {
    flex: 2,
    color: '#B0B4C1',
    fontSize: 15,
    marginRight: 8,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#181A20',
    alignItems: 'center',
    justifyContent: 'center',
  },
  didYouKnowCard: {
    backgroundColor: '#232B3B',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginBottom: 16,
  },
  didYouKnowTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 2,
  },
  didYouKnowText: {
    color: '#B0B4C1',
    fontSize: 14,
  },
  xpUnlockedCard: {
    backgroundColor: '#232B3B',
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 14,
    marginBottom: 10,
    shadowColor: 'transparent',
    elevation: 0,
  },
  xpUnlockedText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
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
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  circleBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#181A20',
    alignItems: 'center',
    justifyContent: 'center',
  },
  swipeText: {
    color: '#B0B4C1',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

// Route handler for navigation and param parsing
function GlossarySlideRoute() {
  const params = useLocalSearchParams();
  const router = useRouter();

  return (
    <GlossarySlide
      {...params}
      onPrev={() =>
        router.replace('/(app)/_(lessons)/slides/AnalogySlide', { ...params })
      }
      onNext={() =>
        router.replace('/(app)/_(lessons)/slides/MotivationalSlide', {
          ...params,
        })
      }
    />
  );
}

export default GlossarySlideRoute;
