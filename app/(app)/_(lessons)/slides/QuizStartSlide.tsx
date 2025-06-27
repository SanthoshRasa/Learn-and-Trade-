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

function QuizStartSlide({
  onPrev,
  onNext,
}: {
  onPrev?: () => void;
  onNext?: () => void;
}) {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerBar}>
        <TouchableOpacity style={styles.headerBackBtn} onPress={onPrev}>
          <Ionicons name='chevron-back' size={20} color='#fff' />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerLabel}>Quiz Time</Text>
          <Text style={styles.headerTitle}>Ready to Take the Quiz?</Text>
        </View>
        <View style={styles.headerRightCol} />
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollWrap}
        showsVerticalScrollIndicator={false}
      >
        {/* Quiz Details Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Quiz Details</Text>
          <View style={styles.detailRow}>
            <Ionicons
              name='help-circle-outline'
              size={18}
              color={COLORS.primary}
              style={{ marginRight: 8 }}
            />
            <Text style={styles.detailLabel}>Questions</Text>
            <Text style={styles.detailValue}>10 Questions</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons
              name='stats-chart-outline'
              size={18}
              color={COLORS.primary}
              style={{ marginRight: 8 }}
            />
            <Text style={styles.detailLabel}>Passing Score</Text>
            <Text style={styles.detailValue}>Minimum 70% to pass</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons
              name='time-outline'
              size={18}
              color={COLORS.primary}
              style={{ marginRight: 8 }}
            />
            <Text style={styles.detailLabel}>Time Estimate</Text>
            <Text style={styles.detailValue}>Approx 5 minutes</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons
              name='flash-outline'
              size={18}
              color={COLORS.primary}
              style={{ marginRight: 8 }}
            />
            <Text style={styles.detailLabel}>XP Rewards</Text>
            <Text style={styles.detailValue}>Earn up to +50 XP</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons
              name='gift-outline'
              size={18}
              color={COLORS.primary}
              style={{ marginRight: 8 }}
            />
            <Text style={styles.detailLabel}>Bonus XP</Text>
            <Text style={styles.detailValue}>+10 XP for 100% score</Text>
          </View>
        </View>
        {/* Unlock Rewards Card */}
        <View style={styles.card}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 6,
            }}
          >
            <Ionicons
              name='trophy-outline'
              size={20}
              color={COLORS.primary}
              style={{ marginRight: 8 }}
            />
            <Text style={styles.cardTitle}>Unlock Rewards</Text>
          </View>
          <Text style={styles.rewardText}>
            🥇 Pass this quiz to unlock: &apos;Market Explorer Badge&apos;
          </Text>
          <View style={styles.progressBarWrap}>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: '75%' }]} />
            </View>
            <Text style={styles.progressText}>
              Level 3 150/200 XP to Level 4
            </Text>
          </View>
        </View>
        {/* Before You Start Card */}
        <View style={styles.card}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 6,
            }}
          >
            <Ionicons
              name='bulb-outline'
              size={20}
              color={COLORS.primary}
              style={{ marginRight: 8 }}
            />
            <Text style={styles.cardTitle}>Before you start:</Text>
          </View>
          <Text style={styles.beforeText}>
            Read each question carefully. You&apos;ll see a mix of
            multiple-choice, true/false, and interactive questions.
          </Text>
        </View>
        {/* Encouragement Card */}
        <View style={styles.card}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 6,
            }}
          >
            <Ionicons
              name='happy-outline'
              size={20}
              color={COLORS.primary}
              style={{ marginRight: 8 }}
            />
            <Text style={styles.cardTitle}>You&apos;ve got this!</Text>
          </View>
          <Text style={styles.beforeText}>
            Ready to test your trading knowledge?
          </Text>
        </View>
        <View style={{ height: 90 }} />
      </ScrollView>
      {/* Bottom Navigation Bar */}
      <View style={styles.footerRow}>
        <TouchableOpacity style={styles.circleBtn} onPress={onPrev}>
          <Ionicons name='chevron-back' size={22} color={COLORS.primary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.startBtn} onPress={onNext}>
          <Text style={styles.startBtnText}>Start Quiz</Text>
          <Ionicons
            name='arrow-forward'
            size={20}
            color='#fff'
            style={{ marginLeft: 6 }}
          />
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
  cardTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  detailLabel: {
    color: '#B0B4C1',
    fontSize: 14,
    flex: 1,
  },
  detailValue: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  rewardText: {
    color: '#fff',
    fontSize: 15,
    marginBottom: 10,
  },
  progressBarWrap: {
    marginTop: 6,
    marginBottom: 2,
  },
  progressBarBg: {
    height: 8,
    backgroundColor: '#353C4A',
    borderRadius: 6,
    width: '100%',
    marginBottom: 4,
  },
  progressBarFill: {
    height: 8,
    backgroundColor: COLORS.primary,
    borderRadius: 6,
  },
  progressText: {
    color: '#B0B4C1',
    fontSize: 13,
    marginTop: 2,
  },
  beforeText: {
    color: '#fff',
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
  startBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
  startBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 4,
  },
});

// Route handler for navigation and param parsing
function QuizStartSlideRoute() {
  const params = useLocalSearchParams();
  const router = useRouter();
  return (
    <QuizStartSlide
      {...params}
      onPrev={() =>
        router.replace('/(app)/_(lessons)/slides/MotivationalSlide', {
          ...params,
        })
      }
      onNext={() =>
        router.replace('/(app)/_(lessons)/slides/QuizSlide' as any, {
          ...params,
        })
      }
    />
  );
}

export { QuizStartSlide };
export default QuizStartSlideRoute;
