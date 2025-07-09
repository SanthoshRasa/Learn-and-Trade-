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

const SAMPLE_QUESTIONS = [
  {
    text: 'What is the main goal of trading?',
    options: [
      'To own companies forever',
      'To profit from price changes',
      'To collect dividends only',
      'To become a market expert',
    ],
    correctIndex: 1,
    explanation:
      'Traders aim to profit from price changes in financial markets, buying low and selling high.',
  },
  {
    text: 'The stock market is only for experts.',
    options: ['True', 'False'],
    correctIndex: 1,
    explanation:
      'Anyone can participate in the stock market with the right knowledge and tools.',
  },
];
const SAMPLE_USER_ANSWERS = [0, 1]; // sample: first wrong, second correct

function ReviewAnswersSlide(props: any) {
  const params = useLocalSearchParams();
  const router = useRouter();
  // Try to get questions and userAnswers from props or params, fallback to sample
  let questions = props.questions || SAMPLE_QUESTIONS;
  let userAnswers = props.userAnswers || SAMPLE_USER_ANSWERS;
  if (params.questions && params.userAnswers) {
    try {
      questions = JSON.parse(params.questions as string);
      userAnswers = JSON.parse(params.userAnswers as string);
    } catch (e) {
      // fallback to sample
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerBar}>
        <TouchableOpacity
          style={styles.headerBackBtn}
          onPress={() => {
            // Pass all relevant params back to QuizResultSlide
            router.replace({
              pathname: '/(app)/_(lessons)/slides/QuizResultSlide',
              params: {
                moduleId: params.moduleId,
                moduleTitle: params.moduleTitle,
                levelTitle: params.levelTitle,
                xpReward: params.xpReward,
                score: params.score,
                totalQuestions: params.totalQuestions,
                correctAnswers: params.correctAnswers,
                questions: params.questions,
                userAnswers: params.userAnswers,
                passed: params.passed,
              },
            } as any);
          }}
        >
          <Ionicons name='chevron-back' size={20} color='#fff' />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Review Answers</Text>
        <View style={{ width: 40 }} />
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollWrap}
        showsVerticalScrollIndicator={false}
      >
        {questions.map((q: any, qIdx: number) => (
          <View key={qIdx} style={styles.card}>
            <Text style={styles.questionText}>{q.text}</Text>
            <View style={styles.optionsWrap}>
              {q.options.map((option: string, idx: number) => {
                const isCorrect = idx === q.correctIndex;
                const isUser = idx === userAnswers[qIdx];
                return (
                  <View
                    key={option}
                    style={[
                      styles.optionCard,
                      isCorrect && styles.optionCardCorrect,
                      isUser && !isCorrect && styles.optionCardIncorrect,
                    ]}
                  >
                    <View style={styles.radioOuter}>
                      {isCorrect && (
                        <Ionicons
                          name='checkmark-circle'
                          size={20}
                          color={COLORS.primary}
                        />
                      )}
                      {isUser && !isCorrect && (
                        <Ionicons
                          name='close-circle'
                          size={20}
                          color='#F44336'
                        />
                      )}
                    </View>
                    <Text style={styles.optionText}>{option}</Text>
                  </View>
                );
              })}
            </View>
            <View style={styles.explanationCard}>
              <Ionicons
                name='bulb-outline'
                size={18}
                color={COLORS.primary}
                style={{ marginRight: 8 }}
              />
              <Text style={styles.explanationText}>{q.explanation}</Text>
            </View>
          </View>
        ))}
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
  scrollWrap: {
    alignItems: 'center',
    paddingTop: 18,
    paddingBottom: 0,
    minWidth: '100%',
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
    marginBottom: 8,
  },
  headerBackBtn: {
    marginRight: 8,
    padding: 4,
  },
  headerTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    flex: 1,
    textAlign: 'center',
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
  },
  questionText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
    marginBottom: 12,
  },
  optionsWrap: {
    marginBottom: 12,
  },
  optionCard: {
    backgroundColor: '#232B3B',
    borderRadius: 10,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  optionCardCorrect: {
    borderColor: COLORS.primary,
    backgroundColor: '#22332B',
  },
  optionCardIncorrect: {
    borderColor: '#F44336',
    backgroundColor: '#2B2222',
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    backgroundColor: 'transparent',
  },
  optionText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  explanationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#181A20',
    borderRadius: 10,
    padding: 14,
    marginTop: 8,
  },
  explanationText: {
    color: '#fff',
    fontSize: 15,
    flex: 1,
  },
});

export default ReviewAnswersSlide;
