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

function QuizResultSlide({
  onContinue,
  onReview,
  onRetake,
  passed,
}: {
  onContinue?: () => void;
  onReview?: () => void;
  onRetake?: () => void;
  passed?: boolean;
}) {
  const router = useRouter();
  const params = useLocalSearchParams();
  let isPassed = passed;
  if (typeof isPassed === 'undefined' && params.passed) {
    isPassed = params.passed === 'true';
  }
  if (typeof isPassed === 'undefined') isPassed = true;

  // Dynamic values from params
  let score = 0,
    totalQuestions = 0,
    correctAnswers = 0,
    questions = [],
    userAnswers = [];
  if (params.score) score = parseInt(params.score as string, 10);
  if (params.totalQuestions)
    totalQuestions = parseInt(params.totalQuestions as string, 10);
  if (params.correctAnswers)
    correctAnswers = parseInt(params.correctAnswers as string, 10);
  if (params.questions) {
    try {
      questions = JSON.parse(params.questions as string);
    } catch {}
  }
  if (params.userAnswers) {
    try {
      userAnswers = JSON.parse(params.userAnswers as string);
    } catch {}
  }
  // Fallbacks for demo (only if params are truly missing)
  if (!params.score && typeof params.score !== 'string')
    score = isPassed ? 85 : 55;
  if (!params.totalQuestions && typeof params.totalQuestions !== 'string')
    totalQuestions = 2;
  if (!params.correctAnswers && typeof params.correctAnswers !== 'string')
    correctAnswers = isPassed ? 2 : 0;
  const badgeName = 'Market Explorer';
  const badgeDesc = "You've mastered the basics of market analysis";

  // Sample data
  const passingScore = 70;
  const xpEarned = 20;
  const streakBonus = 0;
  const xpProgress = 30; // out of 100
  const streakDays = 1;
  const streakProgress = 1; // out of 7

  if (!isPassed) {
    return (
      <View style={styles.container}>
        {/* Header with sad/try again icon */}
        <View style={styles.headerConfetti}>
          <Text style={styles.headerText}>😔 Try Again!</Text>
          <Text style={styles.confettiLabel}>
            You didn&apos;t pass this time
          </Text>
        </View>
        <ScrollView
          contentContainerStyle={styles.scrollWrap}
          showsVerticalScrollIndicator={false}
        >
          {/* Score Circle Card */}
          <View style={styles.card}>
            <View style={styles.scoreCircleWrap}>
              <View style={[styles.scoreCircleBg, { borderColor: '#F44336' }]}>
                {' '}
                {/* Red border for fail */}
                <Text style={styles.scoreCircleText}>{score}%</Text>
                <Text style={styles.scoreCircleLabel}>Your Score</Text>
              </View>
            </View>
            <Text style={styles.passingScore}>
              Passing Score: {passingScore}%
            </Text>
            <View style={styles.statsDivider} />
            {/* Stats */}
            <View style={styles.statsRow}>
              <Text style={styles.statsLabel}>Total Questions</Text>
              <Text style={styles.statsValue}>{totalQuestions}</Text>
            </View>
            <View style={styles.statsRow}>
              <Text style={styles.statsLabel}>Correct Answers</Text>
              <Text style={styles.statsValue}>
                {correctAnswers}/{totalQuestions}{' '}
                <Ionicons name='close-circle' size={16} color='#F44336' />
              </Text>
            </View>
            <View style={styles.statsRow}>
              <Text style={styles.statsLabel}>XP Earned</Text>
              <Text style={styles.statsValue}>+{xpEarned} XP</Text>
            </View>
            <View style={styles.statsRow}>
              <Text style={styles.statsLabel}>Perfect Streak Bonus</Text>
              <Text style={styles.statsValue}>+{streakBonus} XP</Text>
            </View>
            {/* XP Progress Bar */}
            <View style={styles.xpProgressWrap}>
              <View style={styles.xpProgressBg}>
                <View
                  style={[
                    styles.xpProgressFill,
                    {
                      width: `${(xpProgress / 100) * 100}%`,
                      backgroundColor: '#F44336',
                    },
                  ]}
                />
              </View>
              <Text style={styles.xpProgressText}>XP Progress</Text>
            </View>
          </View>
          {/* Encouragement Card */}
          <View style={styles.card}>
            <Text style={styles.badgeTitle}>Don&apos;t Give Up!</Text>
            <Text style={styles.badgeDesc}>
              Review your answers and try again to improve your score. Every
              attempt helps you learn!
            </Text>
          </View>
          {/* Action Buttons */}
          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={() =>
              router.replace('/(app)/_(lessons)/slides/QuizStartSlide', {
                ...params,
              })
            }
          >
            <Ionicons
              name='refresh'
              size={18}
              color='#fff'
              style={{ marginRight: 8 }}
            />
            <Text style={styles.primaryBtnText}>Retake Quiz</Text>
          </TouchableOpacity>
          <View style={styles.actionRow}>
            <TouchableOpacity
              style={styles.secondaryBtn}
              onPress={() =>
                router.replace({
                  pathname: '/(app)/_(lessons)/slides/ReviewAnswersSlide',
                  params: {
                    questions: JSON.stringify(questions),
                    userAnswers: JSON.stringify(userAnswers),
                    score: params.score,
                    totalQuestions: params.totalQuestions,
                    correctAnswers: params.correctAnswers,
                    passed: params.passed,
                  },
                } as any)
              }
            >
              <Ionicons
                name='document-text-outline'
                size={18}
                color={COLORS.primary}
                style={{ marginRight: 6 }}
              />
              <Text style={styles.secondaryBtnText}>Review Answers</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.secondaryBtn}
              onPress={() =>
                router.replace({
                  pathname: '/slides/LessonsListScreen',
                  params: {
                    moduleId: params.moduleId,
                    moduleTitle: params.moduleTitle,
                    levelTitle: params.levelTitle,
                    xpReward: params.xpReward,
                  },
                } as any)
              }
            >
              <Ionicons
                name='arrow-back'
                size={18}
                color={COLORS.primary}
                style={{ marginRight: 6 }}
              />
              <Text style={styles.secondaryBtnText}>Back to Lessons</Text>
            </TouchableOpacity>
          </View>
          <View style={{ height: 90 }} />
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header with confetti */}
      <View style={styles.headerConfetti}>
        <Text style={styles.headerText}>🎉 Great Job! You Passed!</Text>
        <Text style={styles.confettiLabel}>Confetti Animation</Text>
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollWrap}
        showsVerticalScrollIndicator={false}
      >
        {/* Score Circle Card */}
        <View style={styles.card}>
          <View style={styles.scoreCircleWrap}>
            <View style={styles.scoreCircleBg}>
              <Text style={styles.scoreCircleText}>{score}%</Text>
              <Text style={styles.scoreCircleLabel}>Your Score</Text>
            </View>
          </View>
          <Text style={styles.passingScore}>
            Passing Score: {passingScore}%
          </Text>
          <View style={styles.statsDivider} />
          {/* Stats */}
          <View style={styles.statsRow}>
            <Text style={styles.statsLabel}>Total Questions</Text>
            <Text style={styles.statsValue}>{totalQuestions}</Text>
          </View>
          <View style={styles.statsRow}>
            <Text style={styles.statsLabel}>Correct Answers</Text>
            <Text style={styles.statsValue}>
              {correctAnswers}/{totalQuestions}{' '}
              <Ionicons
                name='checkmark-circle'
                size={16}
                color={COLORS.primary}
              />
            </Text>
          </View>
          <View style={styles.statsRow}>
            <Text style={styles.statsLabel}>XP Earned</Text>
            <Text style={styles.statsValue}>+{xpEarned} XP</Text>
          </View>
          <View style={styles.statsRow}>
            <Text style={styles.statsLabel}>Perfect Streak Bonus</Text>
            <Text style={styles.statsValue}>+{streakBonus} XP</Text>
          </View>
          {/* XP Progress Bar */}
          <View style={styles.xpProgressWrap}>
            <View style={styles.xpProgressBg}>
              <View
                style={[
                  styles.xpProgressFill,
                  { width: `${(xpProgress / 100) * 100}%` },
                ]}
              />
            </View>
            <Text style={styles.xpProgressText}>XP Progress</Text>
          </View>
        </View>
        {/* Badge Unlocked Card */}
        <View style={styles.card}>
          <Text style={styles.badgeTitle}>🏅 Badge Unlocked!</Text>
          <View style={styles.badgeIconWrap}>
            <Ionicons name='stats-chart' size={36} color={COLORS.primary} />
          </View>
          <Text style={styles.badgeName}>{badgeName}</Text>
          <Text style={styles.badgeDesc}>{badgeDesc}</Text>
        </View>
        {/* Learning Streak Card */}
        <View style={styles.card}>
          <Text style={styles.streakTitle}>
            🔥 {streakDays}-Day Learning Streak!
          </Text>
          <View style={styles.streakProgressBg}>
            <View
              style={[
                styles.streakProgressFill,
                { width: `${(streakProgress / 7) * 100}%` },
              ]}
            />
          </View>
          <Text style={styles.streakDesc}>Keep it up for bonus rewards!</Text>
        </View>
        {/* Action Buttons */}
        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={() =>
            router.replace({
              pathname: '/slides/LessonsListScreen',
              params: {
                moduleId: params.moduleId,
                moduleTitle: params.moduleTitle,
                levelTitle: params.levelTitle,
                xpReward: params.xpReward,
              },
            } as any)
          }
        >
          <Ionicons
            name='arrow-forward'
            size={18}
            color='#fff'
            style={{ marginRight: 8 }}
          />
          <Text style={styles.primaryBtnText}>Continue to Next Lesson</Text>
        </TouchableOpacity>
        <View style={styles.actionRow}>
          <TouchableOpacity
            style={styles.secondaryBtn}
            onPress={() =>
              router.replace({
                pathname: '/(app)/_(lessons)/slides/ReviewAnswersSlide',
                params: {
                  questions: JSON.stringify(questions),
                  userAnswers: JSON.stringify(userAnswers),
                  score: params.score,
                  totalQuestions: params.totalQuestions,
                  correctAnswers: params.correctAnswers,
                  passed: params.passed,
                },
              } as any)
            }
          >
            <Ionicons
              name='document-text-outline'
              size={18}
              color={COLORS.primary}
              style={{ marginRight: 6 }}
            />
            <Text style={styles.secondaryBtnText}>Review Answers</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.secondaryBtn}
            onPress={() =>
              router.replace('/(app)/_(lessons)/slides/QuizStartSlide', {
                ...params,
              })
            }
          >
            <Ionicons
              name='refresh'
              size={18}
              color={COLORS.primary}
              style={{ marginRight: 6 }}
            />
            <Text style={styles.secondaryBtnText}>Retake Quiz</Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: 90 }} />
      </ScrollView>
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
  headerConfetti: {
    backgroundColor: '#10131A',
    width: '100%',
    alignItems: 'center',
    paddingTop: 32,
    paddingBottom: 18,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 4,
  },
  confettiLabel: {
    color: '#B0B4C1',
    fontSize: 13,
    marginBottom: 2,
  },
  scrollWrap: {
    alignItems: 'center',
    paddingTop: 18,
    paddingBottom: 0,
    minWidth: '100%',
  },
  card: {
    backgroundColor: '#232B3B',
    borderRadius: 16,
    padding: 22,
    width: '96%',
    maxWidth: 480,
    shadowColor: 'transparent',
    elevation: 0,
    marginBottom: 18,
    alignItems: 'center',
  },
  scoreCircleWrap: {
    alignItems: 'center',
    marginBottom: 8,
  },
  scoreCircleBg: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 8,
    borderColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#181A20',
    marginBottom: 6,
  },
  scoreCircleText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 32,
  },
  scoreCircleLabel: {
    color: '#B0B4C1',
    fontSize: 15,
    marginTop: 2,
  },
  passingScore: {
    color: '#B0B4C1',
    fontSize: 15,
    marginBottom: 8,
  },
  statsDivider: {
    height: 1,
    backgroundColor: '#353C4A',
    width: '100%',
    marginVertical: 10,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 6,
  },
  statsLabel: {
    color: '#B0B4C1',
    fontSize: 15,
  },
  statsValue: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  xpProgressWrap: {
    width: '100%',
    marginTop: 10,
    marginBottom: 2,
  },
  xpProgressBg: {
    height: 8,
    backgroundColor: '#353C4A',
    borderRadius: 6,
    width: '100%',
    marginBottom: 4,
  },
  xpProgressFill: {
    height: 8,
    backgroundColor: COLORS.primary,
    borderRadius: 6,
  },
  xpProgressText: {
    color: '#B0B4C1',
    fontSize: 13,
    marginTop: 2,
    alignSelf: 'flex-start',
  },
  badgeTitle: {
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8,
  },
  badgeIconWrap: {
    backgroundColor: '#181A20',
    borderRadius: 32,
    width: 64,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  badgeName: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 2,
  },
  badgeDesc: {
    color: '#B0B4C1',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 2,
  },
  streakTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
  },
  streakProgressBg: {
    height: 8,
    backgroundColor: '#353C4A',
    borderRadius: 6,
    width: '100%',
    marginBottom: 8,
  },
  streakProgressFill: {
    height: 8,
    backgroundColor: COLORS.primary,
    borderRadius: 6,
  },
  streakDesc: {
    color: '#B0B4C1',
    fontSize: 14,
    textAlign: 'center',
  },
  primaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    paddingHorizontal: 24,
    paddingVertical: 14,
    marginTop: 10,
    marginBottom: 8,
    width: '96%',
    justifyContent: 'center',
  },
  primaryBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '96%',
    marginTop: 2,
  },
  secondaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#181A20',
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 10,
    marginHorizontal: 2,
    borderWidth: 1,
    borderColor: '#353C4A',
  },
  secondaryBtnText: {
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default QuizResultSlide;
