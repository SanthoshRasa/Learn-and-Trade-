import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS } from '../../../../constants/theme';

interface AnalogySlideProps {
  lessonTitle?: string;
  streak?: number;
  xp?: number;
  slide?: number;
  totalSlides?: number;
  onPrev?: () => void;
  onNext?: () => void;
}

const analogyPoints = [
  { left: 'Checking store prices', right: 'Analyzing market prices' },
  { left: 'Waiting for sales', right: 'Waiting for good entry points' },
  { left: 'Comparing shops', right: 'Comparing different markets' },
];

function AnalogySlide({
  lessonTitle = 'Lesson 3: Trading Basics',
  streak = 5,
  xp = 15,
  slide = 8,
  totalSlides = 10,
  onPrev,
  onNext,
}: AnalogySlideProps) {
  return (
    <View style={{ flex: 1, backgroundColor: '#181A20' }}>
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
            <Text style={styles.streakText}>{streak} day streak</Text>
          </View>
          <View style={styles.xpBadge}>
            <Text style={styles.xpBadgeText}>+{xp} XP</Text>
          </View>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Progress Bar */}
        <View style={styles.slideCountRow}>
          <Text style={styles.slideCountText}>
            Slide {slide} of {totalSlides}
          </Text>
          <View style={styles.progressBarWrap}>
            <View style={styles.progressBarBg} />
            <View
              style={[
                styles.progressBarFill,
                { width: `${(slide / totalSlides) * 100}%` },
              ]}
            />
          </View>
        </View>
        {/* Title */}
        <Text style={styles.title}>Trading is Like Shopping</Text>
        {/* Analogy Card */}
        <View style={styles.analogyCard}>
          <Ionicons
            name='bulb-outline'
            size={20}
            color={COLORS.primary}
            style={{ marginRight: 8 }}
          />
          <Text style={styles.analogyText}>
            Think of trading like smart shopping. Just as you look for discounts
            when buying clothes, traders look for good prices when buying
            assets.
          </Text>
        </View>
        {/* Image Card 1 */}
        <View style={styles.imageCard}>
          <Text style={styles.imageCardText}>shopping_analogy_1.jpg</Text>
        </View>
        {/* Two-column Comparison */}
        <View style={styles.comparisonHeaderRow}>
          <View style={styles.comparisonHeaderCol}>
            <Ionicons
              name='lock-closed-outline'
              size={16}
              color={COLORS.primary}
              style={{ marginRight: 4 }}
            />
            <Text style={styles.comparisonHeaderText}>Everyday Shopping</Text>
          </View>
          <View style={styles.comparisonHeaderCol}>
            <Ionicons
              name='stats-chart-outline'
              size={16}
              color={COLORS.primary}
              style={{ marginRight: 4 }}
            />
            <Text style={styles.comparisonHeaderText}>Trading Equivalent</Text>
          </View>
        </View>
        {analogyPoints.map((row, idx) => (
          <View style={styles.comparisonRow} key={idx}>
            <View style={styles.comparisonCol}>
              <Text style={styles.comparisonText}>{row.left}</Text>
            </View>
            <View style={styles.comparisonCol}>
              <Text style={styles.comparisonText}>{row.right}</Text>
            </View>
          </View>
        ))}
        {/* Image Card 2 */}
        <View style={styles.imageCard}>
          <Text style={styles.imageCardText}>price_comparison_1.jpg</Text>
        </View>
        {/* Teacher Note */}
        <View style={styles.teacherNoteCard}>
          <Ionicons
            name='person-circle-outline'
            size={20}
            color={COLORS.primary}
            style={{ marginRight: 8 }}
          />
          <View style={{ flex: 1 }}>
            <Text style={styles.teacherNoteLabel}>TEACHER NOTE</Text>
            <Text style={styles.teacherNoteText}>
              This simple comparison helps understand the basic concept of
              buying low and selling high
            </Text>
          </View>
        </View>
        {/* Image Card 3 */}
        <View style={styles.imageCard}>
          <Text style={styles.imageCardText}>decision_making_1.jpg</Text>
        </View>
        {/* Badge Unlocked */}
        <View style={styles.badgeCard}>
          <Ionicons
            name='ribbon-outline'
            size={20}
            color={COLORS.primary}
            style={{ marginRight: 8 }}
          />
          <View>
            <Text style={styles.badgeLabel}>BADGE UNLOCKED</Text>
            <Text style={styles.badgeText}>Smart Shopper Trader</Text>
          </View>
        </View>
        {/* Navigation Bar */}
        <View style={styles.footerRow}>
          <TouchableOpacity style={styles.circleBtn} onPress={onPrev}>
            <Ionicons name='chevron-back' size={22} color={COLORS.primary} />
          </TouchableOpacity>
          <Text style={styles.swipeText}>Swipe to continue</Text>
          <TouchableOpacity style={styles.circleBtn} onPress={onNext}>
            <Ionicons name='chevron-forward' size={22} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: '#232B3B',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  headerBackBtn: {
    marginRight: 12,
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
    fontSize: 16,
    marginLeft: 8,
  },
  headerRightCol: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#181A20',
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 8,
  },
  streakText: {
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: 13,
  },
  xpBadge: {
    backgroundColor: '#181A20',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  xpBadgeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  scrollContainer: {
    paddingHorizontal: 16,
    paddingBottom: 32,
    backgroundColor: '#181A20',
  },
  slideCountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 8,
  },
  slideCountText: {
    color: '#8A8F98',
    fontSize: 13,
    marginRight: 12,
  },
  progressBarWrap: {
    flex: 1,
    height: 4,
    backgroundColor: 'transparent',
    borderRadius: 2,
    overflow: 'hidden',
    marginLeft: 8,
  },
  progressBarBg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#232B3B',
    borderRadius: 2,
  },
  progressBarFill: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.primary,
    borderRadius: 2,
    zIndex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#fff',
    marginBottom: 8,
    marginTop: 8,
  },
  analogyCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#232B3B',
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
  },
  analogyText: {
    color: '#fff',
    fontSize: 15,
    flex: 1,
  },
  imageCard: {
    backgroundColor: '#232B3B',
    borderRadius: 10,
    padding: 18,
    alignItems: 'center',
    marginBottom: 12,
  },
  imageCardText: {
    color: '#B0B4C1',
    fontSize: 15,
  },
  comparisonHeaderRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  comparisonHeaderCol: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#181A20',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    padding: 8,
    marginRight: 2,
    marginLeft: 2,
    justifyContent: 'center',
  },
  comparisonHeaderText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  comparisonRow: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  comparisonCol: {
    flex: 1,
    backgroundColor: '#232B3B',
    borderRadius: 8,
    padding: 10,
    marginRight: 2,
    marginLeft: 2,
    justifyContent: 'center',
  },
  comparisonText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
  teacherNoteCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#232B3B',
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
  },
  teacherNoteLabel: {
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: 13,
    marginBottom: 2,
  },
  teacherNoteText: {
    color: '#fff',
    fontSize: 14,
  },
  badgeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#232B3B',
    borderRadius: 10,
    padding: 14,
    marginBottom: 18,
    marginTop: 4,
  },
  badgeLabel: {
    color: '#B0B4C1',
    fontWeight: 'bold',
    fontSize: 13,
    marginBottom: 2,
  },
  badgeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
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
  swipeText: {
    color: '#B0B4C1',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

// Route handler for navigation and param parsing
function AnalogySlideRoute() {
  const params = useLocalSearchParams();
  const router = useRouter();

  return (
    <AnalogySlide
      {...params}
      onPrev={() =>
        router.replace('/(app)/_(lessons)/slides/MythBusterSlide', {
          ...params,
        })
      }
      onNext={() =>
        router.replace('/(app)/_(lessons)/slides/GlossarySlide', { ...params })
      }
    />
  );
}

export { AnalogySlide };
export default AnalogySlideRoute;
