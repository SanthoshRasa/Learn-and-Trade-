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

function ConceptSlide({
  title = 'Understanding Market Trends',
  subtitle = 'Learn the basics of trend analysis',
  xp = 10,
  slide = 2,
  totalSlides = 12,
  onPrev,
  onNext,
}: any) {
  return (
    <View style={styles.container}>
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
      <ScrollView
        contentContainerStyle={styles.scrollWrap}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <View style={styles.topRow}>
            <Text style={styles.slideCount}>
              Slide {slide} of {totalSlides}
            </Text>
            <View style={styles.xpBadge}>
              <Ionicons
                name='flash'
                size={14}
                color='#fff'
                style={{ marginRight: 4 }}
              />
              <Text style={styles.xpBadgeText}>+{xp} XP</Text>
            </View>
          </View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
          {/* Chart Placeholder */}
          <View style={styles.chartPlaceholder}>
            <Text style={styles.chartPlaceholderText}>
              Trading chart visualization
            </Text>
          </View>
          {/* Learning Objectives */}
          <Text style={styles.sectionLabel}>
            In this lesson, you&apos;ll learn:
          </Text>
          <View style={styles.objectivesList}>
            <View style={styles.objectiveRow}>
              <Ionicons
                name='trending-up-outline'
                size={18}
                color={COLORS.primary}
                style={{ marginRight: 6 }}
              />
              <Text style={styles.objectivePill}>
                How to identify bullish and bearish trends
              </Text>
            </View>
            <View style={styles.objectiveRow}>
              <Ionicons
                name='analytics-outline'
                size={18}
                color={COLORS.primary}
                style={{ marginRight: 6 }}
              />
              <Text style={styles.objectivePill}>
                Key indicators for trend confirmation
              </Text>
            </View>
            <View style={styles.objectiveRow}>
              <Ionicons
                name='arrow-forward-outline'
                size={18}
                color={COLORS.primary}
                style={{ marginRight: 6 }}
              />
              <Text style={styles.objectivePill}>
                When to enter a trending market
              </Text>
            </View>
            <View style={styles.objectiveRow}>
              <Ionicons
                name='trending-down-outline'
                size={18}
                color={COLORS.primary}
                style={{ marginRight: 6 }}
              />
              <Text style={styles.objectivePill}>
                How to spot potential trend reversals
              </Text>
            </View>
            <View style={styles.objectiveRow}>
              <Ionicons
                name='shield-checkmark-outline'
                size={18}
                color={COLORS.primary}
                style={{ marginRight: 6 }}
              />
              <Text style={styles.objectivePill}>
                Risk management in trending markets
              </Text>
            </View>
          </View>
          {/* Coach Card */}
          <View style={styles.coachCard}>
            <View style={styles.coachAvatar} />
            <View style={{ flex: 1 }}>
              <Text style={styles.coachName}>Alex, your trading coach</Text>
              <Text style={styles.coachText}>
                Welcome to your journey! Don&apos;t worry if you&apos;re a
                beginner — we&apos;ll guide you step-by-step through trend
                analysis, one of the most powerful tools in trading.
              </Text>
            </View>
          </View>
        </View>
        {/* Spacer for nav bar */}
        <View style={{ height: 90 }} />
      </ScrollView>
      {/* Bottom Navigation Bar */}
      <View style={styles.footerRow}>
        <TouchableOpacity style={styles.circleBtn} onPress={onPrev}>
          <Ionicons name='chevron-back' size={22} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.swipeText}>Swipe to continue</Text>
        <TouchableOpacity style={styles.circleBtn} onPress={onNext}>
          <Ionicons name='chevron-forward' size={22} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
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
    marginBottom: 16,
  },
  chartPlaceholder: {
    backgroundColor: '#353C4A',
    borderRadius: 12,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  chartPlaceholderText: {
    color: '#A1A1AA',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionLabel: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 8,
    marginTop: 2,
  },
  objectivesList: {
    marginBottom: 16,
  },
  objectiveRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  objectivePill: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  coachCard: {
    backgroundColor: '#181A20',
    borderRadius: 10,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  coachAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#232B3B',
    marginRight: 10,
  },
  coachName: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 2,
  },
  coachText: {
    color: '#fff',
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
function ConceptSlideRoute() {
  const params = useLocalSearchParams();
  const router = useRouter();
  return (
    <ConceptSlide
      {...params}
      onPrev={() =>
        router.replace('/(app)/_(lessons)/slides/IntroSlide', { ...params })
      }
      onNext={() =>
        router.replace('/(app)/_(lessons)/slides/ExampleSlide', { ...params })
      }
    />
  );
}

export { ConceptSlide };
export default ConceptSlideRoute;
