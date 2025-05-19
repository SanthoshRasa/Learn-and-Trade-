import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import { COLORS, SIZES, SPACING } from '../../../constants/theme';

// --- Mock Lessons Data ---
const MOCK_LESSONS = [
  {
    id: '1',
    title: 'What is Trading vs. Investing',
    slides: [
      {
        title: 'Slide 1: Introduction',
        image: 'https://via.placeholder.com/300x150.png?text=Intro+Chart',
        audioUrl: '',
        description: 'Welcome to trading! This lesson introduces the basics.',
        reveals: [
          {
            label: 'Tap to Reveal: What is Trading?',
            content: 'Trading is buying and selling assets.',
          },
        ],
        mentorTip: 'Start with the basics and build your knowledge.',
        xp: 10,
      },
      {
        title: 'Slide 2: Markets',
        image: 'https://via.placeholder.com/300x150.png?text=Markets',
        audioUrl: '',
        description: 'Markets are where trading happens.',
        reveals: [
          { label: 'Tap to Reveal: Example Market', content: 'Stock Market' },
        ],
        xp: 10,
      },
      {
        title: 'Slide 3: Trading vs. Investing',
        image:
          'https://via.placeholder.com/300x150.png?text=Trading+vs+Investing',
        audioUrl: '',
        description: 'Trading and investing differ in approach and duration.',
        reveals: [
          {
            label: 'Tap to Reveal: Risk Level',
            content: 'Trading is usually riskier.',
          },
          {
            label: 'Tap to Reveal: Timeframe',
            content: 'Trading is short-term, investing is long-term.',
          },
        ],
        mentorTip: 'Understand your risk tolerance.',
        xp: 10,
      },
      {
        title: 'Slide 4: Chart Example',
        image: 'https://via.placeholder.com/300x150.png?text=Chart',
        audioUrl: '',
        description: 'Charts help visualize price movements.',
        reveals: [],
        xp: 10,
      },
    ],
    totalXP: 40,
    stars: 125,
  },
  {
    id: '2',
    title: 'Financial Markets Overview',
    slides: [
      {
        title: 'Slide 1: What is a Market?',
        image: 'https://via.placeholder.com/300x150.png?text=Market',
        audioUrl: '',
        description: 'A market is a place where buyers and sellers meet.',
        reveals: [{ label: 'Tap to Reveal: Example', content: 'Stock Market' }],
        xp: 10,
      },
      {
        title: 'Slide 2: Types of Markets',
        image: 'https://via.placeholder.com/300x150.png?text=Types+of+Markets',
        audioUrl: '',
        description:
          'There are many types: Forex, Stocks, Crypto, Commodities.',
        reveals: [
          {
            label: 'Tap to Reveal: Crypto',
            content: 'Bitcoin, Ethereum, etc.',
          },
        ],
        xp: 10,
      },
    ],
    totalXP: 20,
    stars: 80,
  },
  // ...add more lessons as needed
];

const { width } = Dimensions.get('window');

function ProgressCircle({
  percent,
  isDark,
}: {
  percent: number;
  isDark: boolean;
}) {
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

const LessonsOverviewScreen = () => {
  const { lessonId } = useLocalSearchParams();
  const lesson = MOCK_LESSONS.find(l => l.id === lessonId) || MOCK_LESSONS[0];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [revealed, setRevealed] = useState<{ [key: number]: boolean }>({});
  const [completed, setCompleted] = useState(false);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const flatListRef = useRef<FlatList>(null);

  // Handlers
  const handleReveal = (idx: number) => {
    setRevealed(prev => ({ ...prev, [idx]: !prev[idx] }));
  };
  const handleNext = () => {
    if (currentSlide < lesson.slides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentSlide + 1 });
    } else {
      setCompleted(true);
    }
  };
  const handleBack = () => {
    if (currentSlide > 0) {
      flatListRef.current?.scrollToIndex({ index: currentSlide - 1 });
    }
  };
  const handleMarkComplete = () => setCompleted(true);

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: any[] }) => {
      if (viewableItems.length > 0) {
        setCurrentSlide(viewableItems[0].index);
        setRevealed({}); // Reset reveals on slide change
      }
    }
  ).current;

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
          {lesson.title}
        </Text>
        <Text
          style={[
            styles.subtitle,
            { color: isDark ? COLORS.textSecondaryDark : COLORS.textSecondary },
          ]}
        >
          {lesson.slides[currentSlide]?.title}
        </Text>
      </View>
      {/* Slide Card Carousel */}
      <FlatList
        ref={flatListRef}
        data={lesson.slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={({ item: slide, index }) => (
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
            {/* Card Header Row: Progress + XP */}
            <View style={styles.cardHeaderRow}>
              <ProgressCircle
                percent={(index + 1) / lesson.slides.length}
                isDark={isDark}
              />
              <View style={styles.xpRow}>
                <Ionicons
                  name='star'
                  size={16}
                  color='#F6C244'
                  style={{ marginRight: 2 }}
                />
                <Text style={styles.xpText}>+{slide.xp || 0} XP</Text>
              </View>
            </View>
            {/* Slide Title */}
            <Text
              style={[
                styles.cardTitle,
                { color: isDark ? COLORS.textDark : COLORS.text },
              ]}
            >
              {slide.title}
            </Text>
            {/* Slide Image/Chart */}
            {slide.image && (
              <View style={styles.chartPlaceholder}>
                <Image
                  source={{ uri: slide.image }}
                  style={{ width: '100%', height: 80, borderRadius: 12 }}
                  resizeMode='cover'
                />
              </View>
            )}
            {/* Description */}
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
              {slide.description}
            </Text>
            {/* Tap to Reveal Cards */}
            {slide.reveals?.map((reveal: any, idx: number) => (
              <TouchableOpacity
                key={idx}
                onPress={() => handleReveal(idx)}
                style={[
                  styles.revealCard,
                  { backgroundColor: isDark ? '#23242a' : '#f0f0f0' },
                ]}
              >
                <Text style={{ color: isDark ? '#fff' : '#181A20' }}>
                  {reveal.label}
                </Text>
                {revealed[idx] && (
                  <Text
                    style={{ marginTop: 6, color: isDark ? '#fff' : '#181A20' }}
                  >
                    {reveal.content}
                  </Text>
                )}
              </TouchableOpacity>
            ))}
            {/* Mentor Tip */}
            {slide.mentorTip && (
              <View
                style={[
                  styles.mentorTip,
                  { backgroundColor: isDark ? '#23242a' : '#e0e0e0' },
                ]}
              >
                <Text style={{ color: isDark ? '#fff' : '#181A20' }}>
                  💡 {slide.mentorTip}
                </Text>
              </View>
            )}
            {/* Continue/Complete Button */}
            <TouchableOpacity style={styles.ctaBtn} onPress={handleNext}>
              <Text style={styles.ctaBtnText}>
                {index === 0
                  ? 'Start'
                  : index === lesson.slides.length - 1
                  ? 'Completed'
                  : 'Continue'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
        extraData={revealed}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 8,
          paddingBottom: 24,
        }}
      />
      {/* Pagination Dots */}
      <View style={styles.dotsRow}>
        {lesson.slides.map((_, idx) => (
          <View
            key={idx}
            style={[
              styles.dot,
              {
                backgroundColor:
                  idx === currentSlide ? COLORS.primary : COLORS.cardBackground,
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

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
    width: '100%',
    overflow: 'hidden',
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
  revealCard: {
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    minWidth: 180,
  },
  mentorTip: {
    padding: 10,
    borderRadius: 8,
    marginTop: 8,
    alignItems: 'center',
  },
  ctaBtn: {
    backgroundColor: COLORS.text,
    borderRadius: 16,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 8,
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

export default LessonsOverviewScreen;
