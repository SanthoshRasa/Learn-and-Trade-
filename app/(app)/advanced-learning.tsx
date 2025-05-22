import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
  Animated,
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
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<FlatList>(null);
  const router = useRouter();

  const handleScroll = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const idx = Math.round(offsetX / width);
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
        style={{
          backgroundColor: isDark ? '#232B3B' : '#232B3B',
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          borderBottomLeftRadius: 12,
          borderBottomRightRadius: 12,
          marginTop: 0,
          paddingTop: 0,
          paddingBottom: SPACING.lg,
          marginLeft: 0,
          marginRight: 0,
          paddingHorizontal: 16,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: '#000',
          shadowOpacity: 0.08,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: 2 },
          elevation: 2,
          minHeight: 90,
        }}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={{ marginRight: 10, padding: 4 }}
        >
          <Ionicons name='arrow-back' size={24} color='#fff' />
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text
            style={{
              color: '#fff',
              fontSize: 20,
              fontWeight: 'bold',
              textAlign: 'center',
              marginBottom: 2,
              width: '100%',
            }}
            numberOfLines={1}
            ellipsizeMode='tail'
          >
            Advanced Learning
          </Text>
          <Text
            style={{
              color: '#fff',
              fontSize: 16,
              textAlign: 'center',
              width: '100%',
            }}
            numberOfLines={1}
            ellipsizeMode='tail'
          >
            Swipe to explore specialized trading topics
          </Text>
        </View>
      </View>
      {/* Carousel */}
      <Animated.FlatList
        ref={flatListRef}
        data={CHAPTERS}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          {
            useNativeDriver: true,
            listener: handleScroll,
          }
        )}
        scrollEventThrottle={16}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];
          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.92, 1, 0.92],
            extrapolate: 'clamp',
          });
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.7, 1, 0.7],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View
              style={[
                styles.card,
                {
                  backgroundColor: isDark
                    ? COLORS.cardBackgroundDark
                    : COLORS.cardBackground,
                  width: width,
                  alignSelf: 'center',
                  paddingHorizontal: 16,
                  marginRight: 0,
                  transform: [{ scale }],
                  opacity,
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: isDark ? COLORS.borderDark : COLORS.border,
                  shadowColor: '#000',
                  shadowOpacity: 0.08,
                  shadowRadius: 8,
                  shadowOffset: { width: 0, height: 2 },
                  elevation: 2,
                },
              ]}
            >
              <View style={styles.cardHeaderRow}>
                <View
                  style={{
                    backgroundColor: isDark ? '#2D3748' : '#E6EAF2',
                    borderRadius: 8,
                    paddingHorizontal: 10,
                    paddingVertical: 2,
                  }}
                >
                  <Text
                    style={{
                      color: isDark
                        ? COLORS.textSecondaryDark
                        : COLORS.textSecondary,
                      fontSize: SIZES.body5,
                      fontWeight: 'bold',
                    }}
                  >
                    {item.tag}
                  </Text>
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
              <View
                style={{
                  backgroundColor: isDark ? '#232B3B' : '#E6EAF2',
                  borderRadius: 12,
                  height: 80,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 16,
                }}
              >
                <Text
                  style={{
                    color: isDark
                      ? COLORS.textSecondaryDark
                      : COLORS.textSecondary,
                    fontSize: SIZES.body4,
                  }}
                >
                  {item.chart}
                </Text>
              </View>
              <View style={styles.cardFooterRow}>
                <View style={styles.lessonsRow}>
                  <Ionicons
                    name='reader-outline'
                    size={16}
                    color={
                      isDark ? COLORS.textSecondaryDark : COLORS.textSecondary
                    }
                    style={{ marginRight: 4 }}
                  />
                  <Text
                    style={{
                      color: isDark
                        ? COLORS.textSecondaryDark
                        : COLORS.textSecondary,
                      fontSize: SIZES.body5,
                      fontWeight: 'bold',
                    }}
                  >
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
                style={{
                  backgroundColor: COLORS.primary,
                  borderRadius: 16,
                  paddingVertical: 12,
                  alignItems: 'center',
                  marginTop: 8,
                }}
                onPress={() => router.push('./advanced-learning-chapter')}
              >
                <Text
                  style={{
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: SIZES.body3,
                  }}
                >
                  Continue Learning
                </Text>
              </TouchableOpacity>
            </Animated.View>
          );
        }}
        contentContainerStyle={{
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
  cardTitle: {
    fontSize: SIZES.body2,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  cardDesc: {
    fontSize: SIZES.body5,
    marginBottom: 12,
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
  xpRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  xpText: {
    color: '#F6C244',
    fontSize: SIZES.body5,
    fontWeight: 'bold',
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
