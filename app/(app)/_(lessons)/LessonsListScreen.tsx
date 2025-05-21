import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import { COLORS, SIZES } from '../../../constants/theme';

const { width } = Dimensions.get('window');

// Types
export type LessonStatus = 'locked' | 'inprogress' | 'completed';
export type Lesson = {
  id: string;
  title: string;
  subtitle: string;
  status: LessonStatus;
  progress: number; // 0-1
  steps: number;
  xp: number;
  icon?: string;
};

// Mock lessons data
const MOCK_LESSONS: Lesson[] = [
  {
    id: '1',
    title: 'What is Trading vs. Investing',
    subtitle: 'Learn the key differences and why it matters.',
    status: 'inprogress',
    progress: 0.3,
    steps: 10,
    xp: 10,
    icon: 'book',
  },
  {
    id: '2',
    title: 'Financial Markets Overview',
    subtitle: 'Forex, Stocks, Crypto, Commodities',
    status: 'locked',
    progress: 0,
    steps: 12,
    xp: 12,
    icon: 'scale-balance',
  },
  {
    id: '3',
    title: 'How Trading Works: Buyers, Sellers, Brokers',
    subtitle: 'Understand market participants and their roles.',
    status: 'locked',
    progress: 0,
    steps: 15,
    xp: 20,
    icon: 'account-group',
  },
  {
    id: '4',
    title: 'Order Types',
    subtitle: 'Market, Limit, Stop',
    status: 'locked',
    progress: 0,
    steps: 8,
    xp: 8,
    icon: 'clipboard-list',
  },
  {
    id: '5',
    title: 'Trading Platforms, Charts, and Accounts',
    subtitle: 'Get set up to trade',
    status: 'locked',
    progress: 0,
    steps: 12,
    xp: 12,
    icon: 'chart-line',
  },
  {
    id: '6',
    title: 'Risk vs. Reward Basics',
    subtitle: 'Learn to balance risk and reward',
    status: 'locked',
    progress: 0,
    steps: 9,
    xp: 9,
    icon: 'shield-half-full',
  },
  {
    id: '7',
    title: 'Your First Demo Trade',
    subtitle: 'Practice trading in a risk-free environment',
    status: 'locked',
    progress: 0,
    steps: 7,
    xp: 10,
    icon: 'lightning-bolt',
  },
];

export default function LessonsListScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    moduleId: string;
    moduleTitle: string;
    levelTitle: string;
    xpReward: string;
  }>();

  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [xp, setXp] = useState(320);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  // Unlock logic: only next lesson unlocked after current completed
  const unlockNextLesson = (idx: number) => {
    setLessons(prev => {
      const updated = [...prev];
      if (updated[idx + 1] && updated[idx].status === 'completed') {
        updated[idx + 1].status = 'inprogress';
      }
      return updated;
    });
  };
  // Handle lesson action
  const handleLessonAction = (lesson: Lesson, idx: number) => {
    // Navigate to the new LessonsOverviewScreen for any lesson
    router.push({
      pathname: '/(app)/_(lessons)/LessonsOverviewScreen',
      params: { lessonId: lesson.id },
    });
  };
  useEffect(() => {
    if (!params.moduleId) return;
    setLoading(true);
    fetch(`http://localhost:3001/lessons?moduleId=${params.moduleId}`)
      .then(res => res.json())
      .then(data => {
        setLessons(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [params.moduleId]);
  // Render
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: isDark ? COLORS.backgroundDark : COLORS.background,
        minHeight: '100%',
      }}
    >
      {/* Custom Header */}
      <View
        style={{
          backgroundColor: isDark ? COLORS.cardBackgroundDark : '#232B3B',
          borderRadius: 16,
          marginHorizontal: 12,
          marginTop: 0,
          marginBottom: 16,
          flexDirection: 'column',
          alignItems: 'stretch',
          shadowColor: '#000',
          shadowOpacity: 0.08,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: 2 },
          elevation: 2,
        }}
      >
        <View style={{ padding: 16 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 4,
            }}
          >
            <TouchableOpacity
              onPress={() => router.back()}
              style={{ marginRight: 10 }}
            >
              <Ionicons
                name='arrow-back'
                size={22}
                color={isDark ? COLORS.textDark : '#fff'}
              />
            </TouchableOpacity>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  color: isDark ? COLORS.textDark : '#fff',
                  fontWeight: 'bold',
                  fontSize: 18,
                  marginBottom: 2,
                }}
              >
                {(() => {
                  // Extract level number from moduleId (e.g., '2-3' => 2)
                  const levelNum = params.moduleId
                    ? params.moduleId.split('-')[0]
                    : '';
                  return `Level ${levelNum}: ${params.levelTitle}`;
                })()}
              </Text>
              <Text
                style={{
                  color: isDark ? COLORS.textSecondaryDark : '#B0B6C3',
                  fontSize: 15,
                  marginLeft: 0,
                }}
              >
                {params.moduleTitle}
              </Text>
            </View>
            <Ionicons
              name='star'
              size={16}
              color={isDark ? COLORS.textDark : '#fff'}
              style={{ marginRight: 2, marginLeft: 8 }}
            />
            <Text
              style={{
                color: isDark ? COLORS.textDark : '#fff',
                fontWeight: 'bold',
                fontSize: 14,
              }}
            >
              XP {xp}
            </Text>
          </View>
        </View>
      </View>
      {/* Lessons List */}
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text style={{ color: isDark ? '#fff' : '#000' }}>
            Loading lessons...
          </Text>
        </View>
      ) : (
        <ScrollView
          style={{
            flex: 1,
            backgroundColor: isDark ? COLORS.backgroundDark : COLORS.background,
          }}
          contentContainerStyle={{
            padding: 16,
            paddingBottom: 40,
          }}
        >
          {lessons.map((lesson, idx) => {
            // For test data, all lessons are unlocked and inprogress
            const isLocked = false;
            const isCompleted = false;
            const isInProgress = true;
            return (
              <View
                key={lesson.id}
                style={[
                  styles.card,
                  {
                    backgroundColor: isDark
                      ? COLORS.cardBackgroundDark
                      : COLORS.cardBackground,
                  },
                ]}
              >
                <View style={styles.cardHeaderRow}>
                  <View style={styles.iconWrap}>
                    <MaterialCommunityIcons
                      name={'book'}
                      size={28}
                      color={COLORS.primary}
                    />
                  </View>
                  <View style={{ flex: 1, marginLeft: 12 }}>
                    <Text
                      style={[
                        styles.cardTitle,
                        { color: isDark ? COLORS.textDark : COLORS.text },
                      ]}
                    >
                      {lesson.title}
                    </Text>
                  </View>
                  <View style={styles.statusTagWrap}>
                    <View style={styles.statusTagInProgress}>
                      <Text style={styles.statusTagText}>In Progress</Text>
                    </View>
                  </View>
                </View>
                {/* Progress Bar */}
                <View style={styles.progressBarBg}>
                  <View
                    style={[
                      styles.progressBarFill,
                      {
                        width: `0%`,
                        backgroundColor: COLORS.primary,
                      },
                    ]}
                  />
                </View>
                <View style={styles.cardFooterRow}>
                  <View style={styles.xpRow}>
                    <MaterialCommunityIcons
                      name='star-circle'
                      size={18}
                      color={COLORS.primary}
                    />
                    <Text style={styles.xpText}>+10 XP</Text>
                  </View>
                  <TouchableOpacity
                    style={[styles.actionBtn]}
                    onPress={() => handleLessonAction(lesson, idx)}
                  >
                    <Text style={styles.actionBtnText}>Continue</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: 24,
    backgroundColor: '#192132',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    marginBottom: 8,
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: SIZES.body2,
    color: '#fff',
  },
  headerSubtitle: {
    color: COLORS.textSecondary,
    fontSize: SIZES.body5,
    marginTop: 2,
  },
  headerXPRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  headerXPText: {
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: SIZES.body4,
    marginLeft: 4,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardLocked: {
    backgroundColor: COLORS.cardBackground,
    opacity: 0.6,
  },
  cardCompleted: {
    backgroundColor: COLORS.primary + '11',
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.cardBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapLocked: {
    backgroundColor: COLORS.background,
  },
  iconWrapCompleted: {
    backgroundColor: COLORS.primary + '22',
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: SIZES.body3,
    marginBottom: 2,
    color: COLORS.text,
  },
  cardSubtitle: {
    color: COLORS.textSecondary,
    fontSize: SIZES.body5,
    marginBottom: 2,
  },
  textLocked: {
    color: COLORS.textSecondary,
  },
  textCompleted: {
    color: COLORS.primary,
  },
  statusTagWrap: {
    marginLeft: 8,
    alignItems: 'flex-end',
  },
  statusTagCompleted: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.success,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  statusTagInProgress: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  statusTagLocked: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.textSecondary,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  statusTagText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: SIZES.body5,
    marginLeft: 4,
  },
  progressBarBg: {
    height: 8,
    backgroundColor: COLORS.cardBackground,
    borderRadius: 4,
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 4,
  },
  cardFooterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  xpRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  xpText: {
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: SIZES.body4,
    marginLeft: 4,
  },
  actionBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingHorizontal: 18,
    paddingVertical: 8,
  },
  actionBtnLocked: {
    backgroundColor: COLORS.textSecondary,
  },
  actionBtnCompleted: {
    backgroundColor: COLORS.success,
  },
  actionBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: SIZES.body4,
  },
});
