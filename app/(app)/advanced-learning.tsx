import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import { COLORS, SIZES, SPACING } from '../../constants/theme';

const { width } = Dimensions.get('window');

const CHAPTERS = [
  {
    id: 1,
    tag: 'Intermediate',
    progress: 0.38,
    title: 'Forex Trading',
    description:
      "Master the world's largest financial market. Learn currency pairs, pips, and leverage.",
    chart: 'Interactive Chart Visualization',
    lessons: 3,
    totalLessons: 8,
    xp: 250,
  },
  {
    id: 2,
    tag: 'Beginner',
    progress: 0.12,
    title: 'Price Action',
    description:
      'Understand candlestick patterns, support/resistance, and price movement strategies.',
    chart: 'Interactive Chart Visualization',
    lessons: 1,
    totalLessons: 10,
    xp: 180,
  },
  {
    id: 3,
    tag: 'Advanced',
    progress: 0.65,
    title: 'Crypto Trading',
    description:
      'Dive into cryptocurrencies, wallets, exchanges, and blockchain basics.',
    chart: 'Interactive Chart Visualization',
    lessons: 7,
    totalLessons: 12,
    xp: 320,
  },
  {
    id: 4,
    tag: 'Intermediate',
    progress: 0.5,
    title: 'Day Trading',
    description:
      'Learn intraday strategies, risk management, and fast-paced trading skills.',
    chart: 'Interactive Chart Visualization',
    lessons: 4,
    totalLessons: 8,
    xp: 210,
  },
  {
    id: 5,
    tag: 'Advanced',
    progress: 0.22,
    title: 'Swing Trading',
    description:
      'Explore medium-term trading, technical analysis, and market cycles.',
    chart: 'Interactive Chart Visualization',
    lessons: 2,
    totalLessons: 9,
    xp: 200,
  },
  {
    id: 6,
    tag: 'Beginner',
    progress: 0.8,
    title: 'Stock Market Basics',
    description:
      'Get started with stocks, indices, and how the stock market works.',
    chart: 'Interactive Chart Visualization',
    lessons: 8,
    totalLessons: 10,
    xp: 150,
  },
  {
    id: 7,
    tag: 'Intermediate',
    progress: 0.33,
    title: 'Options Trading',
    description:
      'Learn calls, puts, and options strategies for hedging and speculation.',
    chart: 'Interactive Chart Visualization',
    lessons: 3,
    totalLessons: 9,
    xp: 270,
  },
  {
    id: 8,
    tag: 'Advanced',
    progress: 0.1,
    title: 'Algorithmic Trading',
    description:
      'Automate trades using algorithms, bots, and quantitative strategies.',
    chart: 'Interactive Chart Visualization',
    lessons: 1,
    totalLessons: 12,
    xp: 400,
  },
  {
    id: 9,
    tag: 'Beginner',
    progress: 0.55,
    title: 'Commodities',
    description:
      'Trade gold, oil, and other commodities. Learn about futures and spot markets.',
    chart: 'Interactive Chart Visualization',
    lessons: 5,
    totalLessons: 9,
    xp: 190,
  },
  {
    id: 10,
    tag: 'Intermediate',
    progress: 0.25,
    title: 'ETF Investing',
    description:
      'Diversify with Exchange Traded Funds. Learn about sectors, indices, and more.',
    chart: 'Interactive Chart Visualization',
    lessons: 2,
    totalLessons: 8,
    xp: 160,
  },
];

function ProgressCircle({
  percent,
  isDark,
}: {
  percent: number;
  isDark: boolean;
}) {
  // Simple circle with percent text
  return (
    <View
      style={[
        {
          width: 48,
          height: 48,
          borderRadius: 24,
          borderWidth: 4,
          borderColor: isDark ? COLORS.cardBackground : COLORS.primary,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: isDark ? COLORS.backgroundDark : '#fff',
        },
      ]}
    >
      <Text
        style={{
          fontWeight: 'bold',
          color: isDark ? COLORS.textDark : COLORS.text,
        }}
      >
        {Math.round(percent * 100)}%
      </Text>
    </View>
  );
}

export default function AdvancedLearningScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const router = useRouter();

  const handleScroll = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const idx = Math.round(offsetX / (width - 32));
    setActiveIndex(idx);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: isDark ? COLORS.backgroundDark : COLORS.background,
      }}
    >
      {/* Header */}
      <View
        style={[
          styles.header,
          {
            backgroundColor: isDark ? COLORS.backgroundDark : COLORS.background,
          },
        ]}
      >
        <Text
          style={[
            styles.title,
            { color: isDark ? COLORS.textDark : COLORS.text },
          ]}
        >
          Advanced Learning
        </Text>
        <Text
          style={[
            styles.subtitle,
            { color: isDark ? COLORS.textSecondaryDark : COLORS.textSecondary },
          ]}
        >
          Swipe to explore specialized trading topics
        </Text>
      </View>
      {/* Carousel */}
      <FlatList
        ref={flatListRef}
        data={CHAPTERS}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        renderItem={({ item }) => (
          <View
            style={[
              styles.card,
              {
                backgroundColor: isDark
                  ? COLORS.cardBackgroundDark
                  : COLORS.cardBackground,
                width: width - 32,
              },
            ]}
          >
            <View style={styles.cardHeaderRow}>
              <View style={styles.tagBadge}>
                <Text style={styles.tagBadgeText}>{item.tag}</Text>
              </View>
              <ProgressCircle percent={item.progress} isDark={isDark} />
            </View>
            <Text
              style={[
                styles.cardTitle,
                { color: isDark ? COLORS.textDark : COLORS.text },
              ]}
            >
              {item.title}
            </Text>
            <Text
              style={[
                styles.cardDesc,
                {
                  color: isDark
                    ? COLORS.textSecondaryDark
                    : COLORS.textSecondary,
                },
              ]}
            >
              {item.description}
            </Text>
            <View style={styles.chartPlaceholder}>
              <Text style={styles.chartText}>{item.chart}</Text>
            </View>
            <View style={styles.cardFooterRow}>
              <View style={styles.lessonsRow}>
                <Ionicons
                  name='reader-outline'
                  size={16}
                  color={COLORS.textSecondary}
                  style={{ marginRight: 4 }}
                />
                <Text style={styles.lessonsText}>
                  {item.lessons} of {item.totalLessons} lessons
                </Text>
              </View>
              <View style={styles.xpRow}>
                <Ionicons
                  name='star'
                  size={16}
                  color='#F6C244'
                  style={{ marginRight: 2 }}
                />
                <Text style={styles.xpText}>Earn {item.xp} XP</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.ctaBtn}
              onPress={() => router.push('./advanced-learning-chapter')}
            >
              <Text style={styles.ctaBtnText}>Continue Learning</Text>
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 8,
          paddingBottom: 24,
        }}
      />
      {/* Pagination Dots */}
      <View style={styles.dotsRow}>
        {CHAPTERS.map((_, idx) => (
          <View
            key={idx}
            style={[
              styles.dot,
              {
                backgroundColor:
                  idx === activeIndex ? COLORS.primary : COLORS.cardBackground,
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: SPACING.lg,
    paddingBottom: 0,
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
  card: {
    borderRadius: SIZES.radius,
    padding: SPACING.lg,
    marginRight: 16,
    marginBottom: 8,
    alignSelf: 'center',
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
    marginBottom: 8,
  },
  tagBadge: {
    backgroundColor: '#E6EAF2',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  tagBadgeText: {
    color: COLORS.textSecondary,
    fontSize: SIZES.body5,
    fontWeight: 'bold',
  },
  cardTitle: {
    fontSize: SIZES.body2,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  cardDesc: {
    fontSize: SIZES.body5,
    marginBottom: 12,
  },
  chartPlaceholder: {
    backgroundColor: '#E6EAF2',
    borderRadius: 12,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  chartText: {
    color: COLORS.textSecondary,
    fontSize: SIZES.body4,
  },
  cardFooterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  lessonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lessonsText: {
    color: COLORS.textSecondary,
    fontSize: SIZES.body5,
    fontWeight: 'bold',
  },
  xpRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  xpText: {
    color: '#F6C244',
    fontSize: SIZES.body5,
    fontWeight: 'bold',
  },
  ctaBtn: {
    backgroundColor: COLORS.text,
    borderRadius: 16,
    paddingVertical: 12,
    alignItems: 'center',
  },
  ctaBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: SIZES.body3,
  },
  dotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 3,
  },
});
