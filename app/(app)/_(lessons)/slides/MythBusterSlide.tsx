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
import { COLORS } from '../../../../constants/theme';

const SCREEN_WIDTH = Dimensions.get('window').width;

interface MythBusterSlideProps {
  lessonTitle?: string;
  streak?: number;
  xp?: number;
  slide?: number;
  totalSlides?: number;
  onPrev?: () => void;
  onNext?: () => void;
}

function MythBusterSlide({
  lessonTitle = 'Lesson 3: Market Myths',
  streak = 3,
  xp = 20,
  slide = 9,
  totalSlides = 10,
  onPrev,
  onNext,
}: MythBusterSlideProps) {
  return (
    <View style={{ flex: 1, backgroundColor: '#181A20' }}>
      {/* Header */}
      <View style={styles.headerBar}>
        <View style={{ flex: 1 }}>
          <TouchableOpacity style={styles.headerBackBtn} onPress={onPrev}>
            <Ionicons name='arrow-back' size={20} color='#fff' />
          </TouchableOpacity>
          <Text style={styles.lessonTitle}>Trading Basics</Text>
          <Text style={styles.lessonSubtitle}>{lessonTitle}</Text>
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
      </View>{' '}
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        pointerEvents='box-none'
      >
        {/* Slide count and progress */}
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
        {/* Main Title and Subtitle */}
        <Text style={styles.title}>
          Myth Buster: &quot;Trading Is Just Like Gambling&quot;
        </Text>
        <Text style={styles.subtitle}>
          Many people believe trading is purely about luck, not skill
        </Text>
        {/* Myth Card */}
        <View style={styles.mythCard}>
          <View style={styles.mythCardHeader}>
            <Ionicons
              name='close'
              size={20}
              color='#8A8F98'
              style={{ marginRight: 8 }}
            />
            <Text style={styles.mythCardTitle}>The Myth</Text>
          </View>
          <Text style={styles.mythCardText}>
            Trading in financial markets is no different than gambling at a
            casino - it&apos;s all about luck and chance.
          </Text>
        </View>
        {/* Reality Card */}
        <View style={styles.realityCard}>
          <View style={styles.realityCardHeader}>
            <Ionicons
              name='checkmark-circle'
              size={20}
              color={COLORS.primary}
              style={{ marginRight: 8 }}
            />
            <Text style={styles.realityCardTitle}>The Reality</Text>
          </View>
          <Text style={styles.realityCardText}>
            Trading is a skill-based activity that involves analysis, strategy,
            and risk management – success comes from knowledge and discipline.
          </Text>
        </View>
        {/* Why It's a Myth */}
        <View style={styles.whyMythCard}>
          <Text style={styles.whyMythTitle}>Why It&apos;s a Myth</Text>
          <Text style={styles.whyMythText}>
            Unlike gambling where outcomes are purely random, trading success
            depends on market analysis, economic understanding, and strategic
            decision making. Professional traders use fundamental and technical
            analysis to make informed decisions, not just hunches.
          </Text>
          <View style={styles.impactCard}>
            <Ionicons
              name='warning-outline'
              size={18}
              color={COLORS.primary}
              style={{ marginRight: 8 }}
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.impactTitle}>
                Impact of This Misconception
              </Text>
              <Text style={styles.impactText}>
                Believing trading is pure gambling leads to poor risk
                management, emotional decisions, and failure to develop
                necessary skills.
              </Text>
            </View>
          </View>
        </View>
        {/* Evidence */}
        <Text style={styles.sectionTitle}>Evidence</Text>
        <View style={styles.evidenceCard}>
          <Ionicons
            name='book-outline'
            size={20}
            color={COLORS.primary}
            style={{ marginRight: 8 }}
          />
          <View style={{ flex: 1 }}>
            <Text style={styles.evidenceSource}>Investopedia</Text>
            <Text style={styles.evidenceText}>
              &quot;Research shows that disciplined traders who follow
              strategies consistently outperform random trading over time.&quot;
            </Text>
          </View>
        </View>
        <View style={styles.evidenceCard}>
          <Ionicons
            name='bar-chart-outline'
            size={20}
            color={COLORS.primary}
            style={{ marginRight: 8 }}
          />
          <View style={{ flex: 1 }}>
            <Text style={styles.evidenceSource}>Journal of Finance</Text>
            <Text style={styles.evidenceText}>
              &quot;Study of 10,000 traders found that those with financial
              education had 42% better returns than untrained
              participants.&quot;
            </Text>
          </View>
        </View>
        {/* Key Takeaways */}
        <Text style={styles.sectionTitle}>Key Takeaways</Text>
        <View style={styles.takeawayList}>
          <View style={styles.takeawayRow}>
            <Ionicons
              name='checkmark-circle'
              size={18}
              color={COLORS.primary}
              style={{ marginRight: 8 }}
            />
            <Text style={styles.takeawayText}>
              Trading requires education, practice and skill development
            </Text>
          </View>
          <View style={styles.takeawayRow}>
            <Ionicons
              name='checkmark-circle'
              size={18}
              color={COLORS.primary}
              style={{ marginRight: 8 }}
            />
            <Text style={styles.takeawayText}>
              Risk management is what separates trading from gambling
            </Text>
          </View>
          <View style={styles.takeawayRow}>
            <Ionicons
              name='checkmark-circle'
              size={18}
              color={COLORS.primary}
              style={{ marginRight: 8 }}
            />
            <Text style={styles.takeawayText}>
              Successful traders rely on analysis and strategy, not luck
            </Text>
          </View>
        </View>
        {/* Illustration Placeholder */}
        <View style={styles.illustrationCard}>
          <Text style={styles.illustrationText}>
            Illustration comparing casino gambling (dice, cards) with trading
            (charts, analysis)
          </Text>
        </View>
        {/* Did You Know */}
        <View style={styles.didYouKnowCard}>
          <Ionicons
            name='bulb-outline'
            size={18}
            color={COLORS.primary}
            style={{ marginRight: 8 }}
          />
          <View style={{ flex: 1 }}>
            <Text style={styles.didYouKnowTitle}>Did You Know?</Text>
            <Text style={styles.didYouKnowText}>
              Warren Buffett, one of the world&apos;s most successful investors,
              spends 80% of his day reading and analyzing information.
            </Text>
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
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: '#232B3B',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomWidth: 0,
    borderColor: 'transparent',
  },
  headerBackBtn: {
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 2,
    padding: 4,
  },
  lessonTitle: {
    color: '#8A8F98',
    fontWeight: 'bold',
    fontSize: 13,
    marginLeft: 32,
    marginBottom: 2,
  },
  lessonSubtitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 32,
    marginBottom: 0,
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
    marginBottom: 2,
    marginTop: 8,
  },
  subtitle: {
    color: '#B0B4C1',
    fontSize: 15,
    marginBottom: 12,
  },
  mythCard: {
    backgroundColor: '#232B3B',
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
    borderWidth: 0,
    borderColor: 'transparent',
  },
  mythCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  mythCardTitle: {
    color: '#8A8F98',
    fontWeight: 'bold',
    fontSize: 15,
  },
  mythCardText: {
    color: '#fff',
    fontSize: 15,
  },
  realityCard: {
    backgroundColor: '#181A20',
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
    borderWidth: 0,
    borderColor: 'transparent',
  },
  realityCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  realityCardTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  realityCardText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  whyMythCard: {
    backgroundColor: '#232B3B',
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
    borderWidth: 0,
    borderColor: 'transparent',
  },
  whyMythTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 4,
  },
  whyMythText: {
    color: '#fff',
    fontSize: 15,
    marginBottom: 8,
  },
  impactCard: {
    backgroundColor: '#181A20',
    borderRadius: 8,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 4,
  },
  impactTitle: {
    color: '#8A8F98',
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 2,
  },
  impactText: {
    color: '#8A8F98',
    fontSize: 13,
  },
  sectionTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    marginTop: 8,
    marginBottom: 6,
  },
  evidenceCard: {
    backgroundColor: '#232B3B',
    borderRadius: 10,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
    borderWidth: 0,
    borderColor: 'transparent',
  },
  evidenceSource: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 2,
  },
  evidenceText: {
    color: '#fff',
    fontSize: 14,
  },
  takeawayList: {
    backgroundColor: '#232B3B',
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
    borderWidth: 0,
    borderColor: 'transparent',
  },
  takeawayRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  takeawayText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  illustrationCard: {
    backgroundColor: '#181A20',
    borderRadius: 12,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  illustrationText: {
    color: '#B0B4C1',
    fontSize: 15,
    textAlign: 'center',
    padding: 16,
  },
  didYouKnowCard: {
    backgroundColor: '#232B3B',
    borderRadius: 10,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 18,
    borderWidth: 0,
    borderColor: 'transparent',
  },
  didYouKnowTitle: {
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 2,
  },
  didYouKnowText: {
    color: '#fff',
    fontSize: 14,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 24,
    marginBottom: 4,
    backgroundColor: '#232B3B',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderTopWidth: 0,
    borderColor: 'transparent',
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
    fontSize: 15,
    fontWeight: 'bold',
  },
});

// Route handler for navigation and param parsing
function MythBusterSlideRoute() {
  const params = useLocalSearchParams();
  const router = useRouter();

  return (
    <MythBusterSlide
      {...params}
      onPrev={() =>
        router.replace('/(app)/_(lessons)/slides/CompareSlide', { ...params })
      }
      onNext={() =>
        router.replace('/(app)/_(lessons)/slides/AnalogySlide', { ...params })
      }
    />
  );
}

export { MythBusterSlide };
export default MythBusterSlideRoute;
