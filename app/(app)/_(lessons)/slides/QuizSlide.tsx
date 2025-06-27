import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS } from '../../../../constants/theme';

const QUESTION = {
  number: 1,
  total: 20,
  xp: 5,
  text: 'What is the main goal of trading?',
  subtitle: 'Select the best answer below',
  options: [
    'To own companies forever',
    'To profit from price changes',
    'To collect dividends only',
    'To become a market expert',
  ],
};

const CORRECT_INDEX = 1;
const EXPLANATION =
  'Traders aim to profit from price changes in financial markets, buying low and selling high.';

const TRUE_FALSE_QUESTION = {
  number: 2,
  total: 20,
  xp: 5,
  text: 'The stock market is only for experts.',
  subtitle: 'Select True or False',
  options: ['True', 'False'],
  correctIndex: 1,
  explanation:
    'Anyone can participate in the stock market with the right knowledge and tools.',
  hint: 'Think about who can open a brokerage account.',
};

function QuizSlide({ onPrev }: { onPrev?: () => void }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const router = useRouter();
  const [userAnswers, setUserAnswers] = useState<number[]>([]);

  // Question data logic
  const questions = [
    {
      ...QUESTION,
      correctIndex: CORRECT_INDEX,
      explanation: EXPLANATION,
      hint: 'Trading is about making gains from market movements.',
    },
    TRUE_FALSE_QUESTION,
  ];
  const q = questions[questionIndex];
  const isCorrect = submitted && selected === q.correctIndex;
  const isWrong = submitted && selected !== null && selected !== q.correctIndex;
  const isLastQuestion = questionIndex === questions.length - 1;

  // Reset state on next question
  React.useEffect(() => {
    setSelected(null);
    setSubmitted(false);
  }, [questionIndex]);

  const handleSubmit = () => {
    if (!submitted) {
      setSubmitted(true);
      // Save answer for review
      if (selected !== null) {
        const updated = [...userAnswers];
        updated[questionIndex] = selected;
        setUserAnswers(updated);
      }
    } else if (isLastQuestion && submitted) {
      // Always use up-to-date answers for scoring
      let updated = [...userAnswers];
      if (selected !== null) {
        updated[questionIndex] = selected;
      }
      // Score checking logic
      let correct = 0;
      questions.forEach((q, i) => {
        if ((updated[i] ?? null) === q.correctIndex) correct++;
      });
      const totalQuestions = questions.length;
      // Each question is worth 10% if total is 10, or 100/totalQuestions otherwise
      const percentPerQuestion = 100 / totalQuestions;
      const score = Math.round(correct * percentPerQuestion);
      const passed = score >= 70;
      // Pass answers, questions, and score as params for review/results
      router.replace({
        pathname: '/(app)/_(lessons)/slides/QuizResultSlide',
        params: {
          passed: passed ? 'true' : 'false',
          score: score.toString(),
          totalQuestions: totalQuestions.toString(),
          correctAnswers: correct.toString(),
          questions: JSON.stringify(questions),
          userAnswers: JSON.stringify(updated),
        },
      } as any);
    } else if (submitted) {
      // Next question
      setQuestionIndex(i => Math.min(i + 1, questions.length - 1));
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerBar}>
        <TouchableOpacity style={styles.headerBackBtn} onPress={onPrev}>
          <Ionicons name='chevron-back' size={20} color='#fff' />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerLabel}>Trading Quiz</Text>
          <Text style={styles.headerTitle}>Basics of Trading</Text>
        </View>
        <View style={styles.headerRightCol}>
          <Ionicons
            name='flash-outline'
            size={16}
            color={COLORS.primary}
            style={{ marginRight: 4 }}
          />
          <Text style={styles.xpText}>XP: 1,200</Text>
        </View>
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollWrap}
        showsVerticalScrollIndicator={false}
      >
        {/* Progress Bar & XP */}
        <View style={styles.progressRow}>
          <Text style={styles.questionCount}>
            Question {q.number} of {q.total}
          </Text>
          <View style={styles.xpReward}>
            <Ionicons
              name='star'
              size={16}
              color='#fff'
              style={{ marginRight: 4 }}
            />
            <Text style={styles.xpRewardText}>
              +{q.xp} XP on correct answer
            </Text>
          </View>
        </View>
        <View style={styles.progressBarBg}>
          <View
            style={[
              styles.progressBarFill,
              { width: `${(q.number / q.total) * 100}%` },
            ]}
          />
        </View>
        {/* Question */}
        <Text style={styles.questionText}>{q.text}</Text>
        <Text style={styles.subtitle}>{q.subtitle}</Text>
        {/* Options */}
        <View style={styles.optionsWrap}>
          {q.options.map((option, idx) => {
            const isSelected = selected === idx;
            const isOptionCorrect = idx === q.correctIndex;
            const showCheck = submitted && isOptionCorrect && isCorrect;
            const showWrong = submitted && isSelected && !isOptionCorrect;
            return (
              <TouchableOpacity
                key={option}
                style={[
                  styles.optionCard,
                  isSelected && styles.optionCardSelected,
                  submitted &&
                    isOptionCorrect &&
                    isCorrect &&
                    styles.optionCardCorrect,
                  showWrong && styles.optionCardIncorrect,
                ]}
                onPress={() => setSelected(idx)}
                disabled={submitted}
              >
                <View
                  style={[
                    styles.radioOuter,
                    isSelected && styles.radioOuterSelected,
                    submitted &&
                      isOptionCorrect &&
                      isCorrect &&
                      styles.radioOuterCorrect,
                    showWrong && styles.radioOuterIncorrect,
                  ]}
                >
                  {isSelected && !submitted && (
                    <View style={styles.radioInner} />
                  )}
                  {showCheck && (
                    <Ionicons
                      name='checkmark-circle'
                      size={22}
                      color={COLORS.primary}
                    />
                  )}
                  {showWrong && (
                    <Ionicons name='close-circle' size={22} color='#F44336' />
                  )}
                </View>
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
        {/* Hint */}
        {!submitted && !showHint && (
          <TouchableOpacity
            style={styles.hintRow}
            onPress={() => setShowHint(true)}
          >
            <Ionicons
              name='help-circle-outline'
              size={16}
              color='#B0B4C1'
              style={{ marginRight: 4 }}
            />
            <Text style={styles.hintText}>Need a hint?</Text>
          </TouchableOpacity>
        )}
        {/* Show hint only before submission or after correct answer */}
        {showHint && !submitted && q.hint && (
          <View style={styles.hintCard}>
            <Ionicons
              name='bulb-outline'
              size={18}
              color={COLORS.primary}
              style={{ marginRight: 8 }}
            />
            <Text style={styles.hintCardText}>{q.hint}</Text>
          </View>
        )}
        {/* Correct Feedback Card */}
        {isCorrect && (
          <View style={styles.feedbackCard}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 6,
              }}
            >
              <Ionicons
                name='checkmark-circle'
                size={22}
                color={COLORS.primary}
                style={{ marginRight: 8 }}
              />
              <Text style={styles.feedbackTitle}>Correct!</Text>
            </View>
            <Text style={styles.feedbackText}>{q.explanation}</Text>
            <View style={styles.wellDoneBadge}>
              <Ionicons
                name='star'
                size={16}
                color='#fff'
                style={{ marginRight: 4 }}
              />
              <Text style={styles.wellDoneText}>Well Done!</Text>
            </View>
          </View>
        )}
        <View style={{ height: 90 }} />
      </ScrollView>
      {/* Bottom Navigation Bar */}
      <View style={styles.footerRow}>
        <TouchableOpacity style={styles.circleBtn} onPress={onPrev}>
          <Ionicons name='chevron-back' size={22} color={COLORS.primary} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.submitBtn,
            (selected === null || submitted) && styles.nextBtn,
          ]}
          disabled={selected === null}
          onPress={handleSubmit}
        >
          <Text style={styles.submitBtnText}>
            {submitted
              ? isLastQuestion
                ? 'Show Results'
                : 'Next Question'
              : 'Submit Answer'}
          </Text>
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
  xpText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
  },
  scrollWrap: {
    alignItems: 'center',
    paddingTop: 24,
    paddingBottom: 0,
    minWidth: '100%',
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '96%',
    marginBottom: 6,
  },
  questionCount: {
    color: '#B0B4C1',
    fontSize: 14,
  },
  xpReward: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#353C4A',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  xpRewardText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
  },
  progressBarBg: {
    height: 8,
    backgroundColor: '#353C4A',
    borderRadius: 6,
    width: '96%',
    marginBottom: 18,
  },
  progressBarFill: {
    height: 8,
    backgroundColor: COLORS.primary,
    borderRadius: 6,
  },
  questionText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 22,
    marginBottom: 4,
    marginTop: 2,
    width: '96%',
  },
  subtitle: {
    color: '#B0B4C1',
    fontSize: 15,
    marginBottom: 16,
    width: '96%',
  },
  optionsWrap: {
    width: '96%',
    marginBottom: 16,
  },
  optionCard: {
    backgroundColor: '#232B3B',
    borderRadius: 10,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  optionCardSelected: {
    borderColor: COLORS.primary,
    backgroundColor: '#181A20',
  },
  optionCardCorrect: {
    borderColor: COLORS.primary,
    backgroundColor: '#22332B',
  },
  optionCardIncorrect: {
    borderColor: '#F44336',
    backgroundColor: '#22332B',
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#B0B4C1',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    backgroundColor: '#232B3B',
  },
  radioOuterSelected: {
    borderColor: COLORS.primary,
    backgroundColor: '#181A20',
  },
  radioOuterCorrect: {
    borderColor: COLORS.primary,
    backgroundColor: '#22332B',
  },
  radioOuterIncorrect: {
    borderColor: '#F44336',
    backgroundColor: '#22332B',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
  },
  optionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  hintRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    width: '96%',
  },
  hintText: {
    color: '#B0B4C1',
    fontSize: 14,
    marginLeft: 4,
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
  submitBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
  submitBtnDisabled: {
    backgroundColor: '#353C4A',
  },
  submitBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  nextBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
  feedbackCard: {
    backgroundColor: '#353C4A',
    borderRadius: 12,
    padding: 18,
    width: '96%',
    marginBottom: 18,
    marginTop: 8,
  },
  feedbackTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  feedbackText: {
    color: '#fff',
    fontSize: 15,
    marginBottom: 10,
  },
  wellDoneBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  wellDoneText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  hintCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#232B3B',
    borderRadius: 10,
    padding: 14,
    marginBottom: 14,
    width: '96%',
  },
  hintCardText: {
    color: '#fff',
    fontSize: 15,
    flex: 1,
  },
});

// Route handler for navigation and param parsing
function QuizSlideRoute() {
  const params = useLocalSearchParams();
  const router = useRouter();
  return (
    <QuizSlide
      {...params}
      onPrev={() =>
        router.replace('/(app)/_(lessons)/slides/QuizStartSlide', { ...params })
      }
    />
  );
}

export { QuizSlide };
export default QuizSlideRoute;
