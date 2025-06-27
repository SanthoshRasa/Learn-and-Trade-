import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS, SPACING } from '../../../../constants/theme';

interface CaseStudySlideProps {
  title?: string;
  onPrev?: () => void;
  onNext?: () => void;
  xp?: number;
  lessonTitle?: string;
  slide?: number;
  totalSlides?: number;
}

const caseStudyData = [
  {
    icon: 'document-text-outline',
    label: 'Background',
    text: 'Linda was a teacher who wanted more financial flexibility',
  },
  {
    icon: 'walk-outline',
    label: 'Approach',
    text: 'Started learning trading basics during summer breaks',
  },
  {
    icon: 'alert-circle-outline',
    label: 'Challenge',
    text: 'Balanced full-time teaching with learning to trade',
  },
  {
    icon: 'construct-outline',
    label: 'Solution',
    text: 'Developed a morning trading routine before school',
  },
  {
    icon: 'trophy-outline',
    label: 'Outcome',
    text: 'After 2+ years, her trading income matched her teaching salary',
  },
  {
    icon: 'school-outline',
    label: 'Lesson',
    text: 'Consistent effort and patience led to financial freedom',
  },
];

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function CaseStudySlide({
  title = 'Real Trader Story: Path to Freedom',
  onPrev,
  onNext,
  xp = 20,
  lessonTitle = "Linda's Trading Journey",
  slide = 4,
  totalSlides = 7,
}: CaseStudySlideProps) {
  const params = useLocalSearchParams();
  const router = useRouter();

  const handlePrev = () => {
    if (onPrev) {
      onPrev();
    } else {
      router.replace('/(app)/_(lessons)/slides/ExampleSlide', { ...params });
    }
  };
  const handleNext = () => {
    if (onNext) {
      onNext();
    } else {
      router.replace('/(app)/_(lessons)/slides/CompareSlide', { ...params });
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
            <Text style={styles.xpBadgeText}>+{xp} XP</Text>
          </View>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Subtitle Card */}
        <View style={styles.subtitleCard}>
          <Text style={styles.subtitleText}>{lessonTitle}</Text>
        </View>
        {/* Timeline + Steps */}
        <View style={styles.timelineStepsContainer}>
          <View
            style={[
              styles.timelineAbsoluteLine,
              { top: 16 + 10 / 2, height: (caseStudyData.length - 1) * 56 },
            ]}
          />
          {caseStudyData.map((item, idx) => (
            <View key={idx} style={styles.stepRow}>
              {/* Timeline dot */}
              <View style={styles.timelineDotCol}>
                <View style={styles.timelineDot} />
              </View>
              {/* Step card */}
              <View style={styles.stepCard}>
                <View style={styles.stepLabelRow}>
                  <Ionicons
                    name={item.icon as any}
                    size={18}
                    color={COLORS.primary}
                    style={{ marginRight: 6 }}
                  />
                  <Text style={styles.stepLabel}>{item.label}</Text>
                </View>
                <Text style={styles.stepText}>{item.text}</Text>
              </View>
            </View>
          ))}
        </View>
        {/* Chart Placeholder */}
        <View style={styles.chartBox}>
          <Text style={styles.chartBoxText}>Income Growth Chart</Text>
        </View>
        <Text style={styles.chartHint}>
          Linda&apos;s trading income vs. teaching salary (2023-2025)
        </Text>
        {/* Key Takeaway Box */}
        <View style={styles.keyTakeawayBox}>
          <Ionicons
            name='key-outline'
            size={22}
            color={COLORS.primary}
            style={{ marginRight: 8 }}
          />
          <View style={{ flex: 1 }}>
            <Text style={styles.keyTakeawayTitle}>Key Takeaway</Text>
            <Text style={styles.keyTakeawayText}>
              Success in trading comes from dedication, education, and a
              realistic timeline for growth.
            </Text>
          </View>
        </View>
        {/* Badge Unlocked */}
        <View style={styles.badgeBox}>
          <Ionicons
            name='medal-outline'
            size={22}
            color={COLORS.primary}
            style={{ marginRight: 8 }}
          />
          <Text style={styles.badgeText}>
            Badge Unlocked: Story Mode Complete
          </Text>
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

const styles = StyleSheet.create({
  headerBar: {
    backgroundColor: '#232B3B',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    paddingHorizontal: 0,
    paddingTop: 0,
    paddingBottom: 0,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  headerBackBtn: {
    marginRight: 8,
    padding: 4,
  },
  headerLabel: {
    color: '#fff',
    fontSize: 13,
    marginBottom: 2,
    fontWeight: '500',
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#fff',
    flexShrink: 1,
  },
  headerRightCol: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F7FA',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginLeft: 12,
    minWidth: 56,
    justifyContent: 'center',
  },
  streakText: {
    color: '#222',
    fontSize: 13,
    textAlign: 'center',
    marginTop: -2,
    fontWeight: '500',
  },
  xpBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F7FA',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginLeft: 12,
    minWidth: 56,
    justifyContent: 'center',
  },
  xpBadgeText: {
    color: '#222',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 18,
  },
  scrollContainer: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: 24,
  },
  subtitleCard: {
    backgroundColor: '#E6EAF2',
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
    alignItems: 'center',
  },
  subtitleText: {
    color: COLORS.textSecondary,
    fontSize: 15,
    fontWeight: 'bold',
  },
  timelineStepsContainer: {
    flexDirection: 'column',
    width: '100%',
    maxWidth: SCREEN_WIDTH - 32,
    alignSelf: 'center',
    position: 'relative',
  },
  timelineAbsoluteLine: {
    position: 'absolute',
    left: 11,
    width: 2,
    backgroundColor: COLORS.primary,
    zIndex: 0,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 0,
    minHeight: 56,
    width: '100%',
  },
  timelineDotCol: {
    width: 24,
    alignItems: 'center',
    position: 'relative',
    height: 56,
    justifyContent: 'flex-start',
    zIndex: 1,
  },
  timelineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
    marginTop: 16,
    marginBottom: 0,
    zIndex: 1,
  },
  stepCard: {
    backgroundColor: '#232B3B',
    borderRadius: 10,
    padding: 14,
    marginBottom: 16,
    marginLeft: 8,
    flex: 1,
    minWidth: 0,
    maxWidth: SCREEN_WIDTH - 64,
    shadowColor: 'transparent',
  },
  stepLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  stepLabel: {
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: 15,
  },
  stepText: {
    color: '#fff',
    fontSize: 15,
    marginTop: 2,
  },
  chartBox: {
    backgroundColor: '#E6EAF2',
    borderRadius: 16,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    marginTop: 8,
  },
  chartBoxText: {
    color: COLORS.textSecondary,
    fontSize: 15,
    fontWeight: 'bold',
  },
  chartHint: {
    color: COLORS.textSecondary,
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 12,
  },
  keyTakeawayBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#181A20',
    borderRadius: 12,
    padding: 14,
    marginBottom: 14,
  },
  keyTakeawayTitle: {
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 2,
  },
  keyTakeawayText: {
    color: '#fff',
    fontSize: 14,
  },
  badgeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBackground,
    borderRadius: 10,
    padding: 10,
    marginBottom: 18,
  },
  badgeText: {
    color: COLORS.primary,
    fontWeight: 'bold',
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
  swipeText: {
    color: '#B0B4C1',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
