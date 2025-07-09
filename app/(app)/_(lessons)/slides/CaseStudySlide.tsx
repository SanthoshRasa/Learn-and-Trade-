import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import {
  Dimensions,
  Image,
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
  timelineSteps?: { icon: string; label: string; text: string }[];
  chartTitle?: string;
  chartHint?: string;
  keyTakeawayTitle?: string;
  keyTakeawayText?: string;
  badgeText?: string;
  chartImage?: { url: string; caption?: string };
}

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function CaseStudySlide({
  title = 'Real Trader Story: Path to Freedom',
  onPrev,
  onNext,
  xp = 20,
  lessonTitle = "Linda's Trading Journey",
  slide = 4,
  totalSlides = 7,
  timelineSteps = [],
  chartTitle = 'Income Growth Chart',
  chartHint = "Linda's trading income vs. teaching salary (2023-2025)",
  keyTakeawayTitle = 'Key Takeaway',
  keyTakeawayText = 'Success in trading comes from dedication, education, and a realistic timeline for growth.',
  badgeText = 'Badge Unlocked: Story Mode Complete',
  chartImage,
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
          {/* Optionally add a label here if you want, e.g. <Text style={styles.headerLabel}>Trading Basics</Text> */}
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
              { top: 16 + 10 / 2, height: (timelineSteps.length - 1) * 56 },
            ]}
          />
          {timelineSteps.map((item, idx) => (
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
        {/* Chart Placeholder or Image */}
        <View
          style={[
            styles.chartBox,
            {
              borderStyle: 'dashed',
              borderWidth: 2,
              borderColor: '#888',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: chartImage && chartImage.url ? undefined : 80,
              width: '100%',
              maxWidth: 420,
              height: 180,
              alignSelf: 'center',
              borderRadius: 16,
              overflow: 'hidden',
              backgroundColor: '#181A20',
              marginVertical: 8,
            },
          ]}
        >
          {chartImage && chartImage.url ? (
            <Image
              source={{ uri: chartImage.url }}
              style={{
                width: '100%',
                height: '100%',
                resizeMode: 'cover',
                borderRadius: 12,
              }}
            />
          ) : (
            <>
              <Ionicons
                name='bar-chart-outline'
                size={32}
                color={'#888'}
                style={{ marginBottom: 4 }}
              />
              <Text
                style={{ color: '#888', fontStyle: 'italic', fontSize: 16 }}
              >
                Chart Placeholder
              </Text>
            </>
          )}
        </View>
        <Text style={styles.chartHint}>{chartHint}</Text>
        {/* Key Takeaway Box */}
        <View style={styles.keyTakeawayBox}>
          <Ionicons
            name='key-outline'
            size={22}
            color={COLORS.primary}
            style={{ marginRight: 8 }}
          />
          <View style={{ flex: 1 }}>
            <Text style={styles.keyTakeawayTitle}>{keyTakeawayTitle}</Text>
            <Text style={styles.keyTakeawayText}>{keyTakeawayText}</Text>
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
    paddingHorizontal: SPACING.lg,
    paddingBottom: 24,
  },
  subtitleCard: {
    backgroundColor: '#232B3B',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginHorizontal: 8,
    marginTop: 8,
    marginBottom: 12,
    alignItems: 'center',
  },
  subtitleText: {
    color: '#B0B4C1',
    fontWeight: 'bold',
    fontSize: 16,
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
