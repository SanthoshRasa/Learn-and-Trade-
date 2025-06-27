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
import { COLORS, SIZES, SPACING } from '../../../../constants/theme';

interface ExampleSlideProps {
  title: string;
  description: string;
  onPrev?: () => void;
  onNext?: () => void;
  xp?: number;
  lessonTitle?: string;
  slide?: number;
  totalSlides?: number;
}

export default function ExampleSlide({
  title = 'Real-World Example: BTC Long Trade',
  description = 'A trader enters a long position on BTC at $40,000 and sells at $44,000. The $4,000 difference is their profit, minus any fees.',
  onPrev,
  onNext,
  xp = 10,
  lessonTitle = 'How Do Traders Make Money?',
  slide = 3,
  totalSlides = 5,
}: ExampleSlideProps) {
  const params = useLocalSearchParams();
  const router = useRouter();

  const handlePrev = () => {
    if (onPrev) {
      onPrev();
    } else {
      router.replace('/(app)/_(lessons)/slides/ConceptSlide', { ...params });
    }
  };
  const handleNext = () => {
    if (onNext) {
      onNext();
    } else {
      router.replace('/(app)/_(lessons)/slides/CaseStudySlide', { ...params });
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
        {/* Tag Row */}
        <View style={styles.tagsRow}>
          <View style={styles.tag}>
            <Ionicons
              name='bulb-outline'
              size={14}
              color={COLORS.primary}
              style={{ marginRight: 4 }}
            />
            <Text style={{ color: COLORS.primary, fontSize: 12 }}>
              Example Slide
            </Text>
          </View>
          <TouchableOpacity>
            <Ionicons
              name='volume-high-outline'
              size={18}
              color={COLORS.primary}
            />
          </TouchableOpacity>
        </View>
        {/* Slide Title */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 8,
          }}
        >
          <Ionicons
            name='bulb'
            size={20}
            color={COLORS.primary}
            style={{ marginRight: 6 }}
          />
          <Text style={styles.title}>{title}</Text>
        </View>
        {/* Chart/Illustration */}
        <View style={styles.chartCard}>
          {/* Placeholder for chart */}
          <Ionicons
            name='trending-up-outline'
            size={48}
            color={COLORS.textSecondary}
            style={{ alignSelf: 'center' }}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 8,
            }}
          >
            <Text style={styles.chartLabel}>$38K</Text>
            <Text style={styles.chartLabel}>$46K</Text>
          </View>
          <Text style={styles.chartHint}>Tap points for details</Text>
        </View>
        {/* Key Example Box */}
        <View style={styles.keyExampleBox}>
          <Text style={styles.keyExampleText}>
            BTC bought at $40,000 → Sold at $44,000 = +$4,000 gain
          </Text>
        </View>
        {/* Description */}
        <Text style={styles.description}>{description}</Text>
        {/* Feedback/Note Box */}
        <View style={styles.noteBox}>
          <Ionicons
            name='happy-outline'
            size={28}
            color={COLORS.primary}
            style={{ marginRight: 8 }}
          />
          <View style={{ flex: 1 }}>
            <Text style={styles.noteTitle}>
              ✅ Good job buying early and exiting smart!
            </Text>
            <Text style={styles.noteText}>
              This is a perfect example of a smart trade. You identified a gain
              and exited with profit.
            </Text>
          </View>
        </View>
        {/* Footer Actions */}
        <View style={styles.footerActions}>
          <TouchableOpacity style={styles.actionBtn}>
            <Ionicons
              name='refresh'
              size={18}
              color={COLORS.primary}
              style={{ marginRight: 4 }}
            />
            <Text style={styles.actionText}>Review Example</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn}>
            <Ionicons
              name='save-outline'
              size={18}
              color={COLORS.primary}
              style={{ marginRight: 4 }}
            />
            <Text style={styles.actionText}>Save to Journal</Text>
          </TouchableOpacity>
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
  },
  tagsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    marginTop: 8,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 2,
    marginRight: 8,
  },
  title: {
    fontSize: SIZES.h4,
    fontWeight: 'bold',
    color: COLORS.text,
    flex: 1,
  },
  chartCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    marginTop: 8,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  chartLabel: {
    color: COLORS.textSecondary,
    fontSize: 12,
  },
  chartHint: {
    color: COLORS.textSecondary,
    fontSize: 13,
    textAlign: 'center',
    marginTop: 4,
  },
  keyExampleBox: {
    backgroundColor: '#23272f',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  keyExampleText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
  },
  description: {
    fontSize: 15,
    color: COLORS.textSecondary,
    marginBottom: 12,
    textAlign: 'left',
  },
  noteBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  noteTitle: {
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 2,
  },
  noteText: {
    color: COLORS.textSecondary,
    fontSize: 13,
  },
  footerActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBackground,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
  },
  actionText: {
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
  xpBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBackground,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  xpBtnText: {
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: 15,
    marginLeft: 6,
  },
  toastContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBackground,
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 14,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  toastTitle: {
    color: COLORS.text,
    fontWeight: 'bold',
    fontSize: 15,
  },
  toastXP: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: 'bold',
  },
  swipeText: {
    color: '#B0B4C1',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
