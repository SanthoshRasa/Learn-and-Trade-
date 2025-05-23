import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import { COLORS, SIZES, SPACING } from '../../constants/theme';

const TOPICS = [
  {
    id: 'forex',
    title: 'Forex Trading',
    description: 'Currencies & pairs',
    xp: 25,
    percent: 72,
    icon: 'swap-horizontal',
  },
  {
    id: 'price',
    title: 'Price Action',
    description: 'Chart moves',
    xp: 25,
    percent: 63,
    icon: 'analytics',
  },
  {
    id: 'crypto',
    title: 'Crypto Trading',
    description: 'Bitcoin, Ethereum & more',
    xp: 30,
    percent: 58,
    icon: 'logo-bitcoin',
  },
  {
    id: 'stocks',
    title: 'Stock Market',
    description: 'Shares & indices',
    xp: 20,
    percent: 80,
    icon: 'stats-chart',
  },
  {
    id: 'commodities',
    title: 'Commodities',
    description: 'Gold, oil, and more',
    xp: 22,
    percent: 67,
    icon: 'cube',
  },
  {
    id: 'options',
    title: 'Options',
    description: 'Calls & puts',
    xp: 28,
    percent: 54,
    icon: 'options',
  },
  {
    id: 'indices',
    title: 'Indices',
    description: 'Global markets',
    xp: 18,
    percent: 61,
    icon: 'earth',
  },
];

const DIFFICULTIES = [
  {
    id: 'beginner',
    label: 'Beginner',
    xp: 15,
    desc: 'Warm-up your basics!',
    color: '#4CAF50',
  },
  {
    id: 'intermediate',
    label: 'Intermediate',
    xp: 25,
    desc: `Let's get analytical.`,
    color: '#FFC107',
  },
  {
    id: 'advanced',
    label: 'Advanced',
    xp: 45,
    desc: 'Only for seasoned traders!',
    color: '#F44336',
  },
];

export default function QuizScreen() {
  const [selectedTopic, setSelectedTopic] = useState('forex');
  const [selectedDifficulty, setSelectedDifficulty] = useState('beginner');
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const topicsScrollRef = useRef<ScrollView>(null);
  const router = useRouter();

  const handleSurpriseMe = () => {
    const randomIdx = Math.floor(Math.random() * TOPICS.length);
    setSelectedTopic(TOPICS[randomIdx].id);
    // Scroll to the selected topic
    if (topicsScrollRef.current) {
      topicsScrollRef.current.scrollTo({
        x: randomIdx * (170 + 12), // card width + marginRight
        animated: true,
      });
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: isDark ? COLORS.backgroundDark : COLORS.background,
      }}
    >
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Header */}
        <View
          style={[
            styles.header,
            {
              backgroundColor: isDark
                ? COLORS.backgroundDark
                : COLORS.background,
            },
          ]}
        >
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backBtn}
          >
            <Ionicons
              name='arrow-back'
              size={24}
              color={isDark ? COLORS.textDark : COLORS.text}
            />
          </TouchableOpacity>
          <Text
            style={[
              styles.headerTitle,
              {
                color: isDark ? COLORS.textDark : COLORS.primary,
                flexShrink: 1,
              },
            ]}
            numberOfLines={1}
            ellipsizeMode='tail'
          >
            Quiz Challenge
          </Text>
        </View>
        <View style={styles.headerStatsRow}>
          <View style={styles.statItem}>
            <Ionicons name='flash' size={16} color={COLORS.primary} />
            <Text style={styles.statText}>45 XP</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name='calendar' size={16} color={COLORS.primary} />
            <Text style={styles.statText}>Day 7</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name='albums' size={16} color={COLORS.primary} />
            <Text style={styles.statText}>320</Text>
          </View>
        </View>
        <Text
          style={[
            styles.subtitle,
            { color: isDark ? COLORS.textSecondaryDark : COLORS.textSecondary },
          ]}
        >
          Choose your battlefield! What do you want to test today?
        </Text>
        <Text
          style={[
            styles.sectionTitle,
            { color: isDark ? COLORS.textDark : COLORS.text },
          ]}
        >
          Select a Topic
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.topicsRow}
          ref={topicsScrollRef}
        >
          {TOPICS.map(topic => (
            <TouchableOpacity
              key={topic.id}
              style={[
                styles.topicCard,
                {
                  backgroundColor: isDark
                    ? COLORS.cardBackgroundDark
                    : COLORS.cardBackground,
                  borderColor:
                    selectedTopic === topic.id ? COLORS.primary : 'transparent',
                },
              ]}
              onPress={() => setSelectedTopic(topic.id)}
              activeOpacity={0.85}
            >
              <Ionicons
                name={topic.icon as any}
                size={28}
                color={COLORS.primary}
                style={{ marginBottom: 4 }}
              />
              <Text
                style={[
                  styles.topicTitle,
                  { color: isDark ? COLORS.textDark : COLORS.text },
                ]}
              >
                {topic.title}
              </Text>
              <Text
                style={[
                  styles.topicDesc,
                  {
                    color: isDark
                      ? COLORS.textSecondaryDark
                      : COLORS.textSecondary,
                  },
                ]}
              >
                {topic.description}
              </Text>
              <View style={styles.topicFooter}>
                <Text style={styles.topicXP}>+{topic.xp} XP</Text>
                <Text style={styles.topicPercent}>{topic.percent}%</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <TouchableOpacity style={styles.surpriseBtn} onPress={handleSurpriseMe}>
          <Text style={[styles.surpriseText, { color: COLORS.primary }]}>
            🎲 Surprise Me!
          </Text>
        </TouchableOpacity>
        <Text
          style={[
            styles.sectionTitle,
            { color: isDark ? COLORS.textDark : COLORS.text },
          ]}
        >
          Choose Difficulty Level
        </Text>
        <View style={styles.difficultyList}>
          {DIFFICULTIES.map(diff => {
            const isSelected = selectedDifficulty === diff.id;
            return (
              <TouchableOpacity
                key={diff.id}
                style={[
                  styles.difficultyCard,
                  isSelected
                    ? {
                        borderColor: diff.color,
                        backgroundColor: isDark ? '#232B3B' : '#232B3B',
                      }
                    : {
                        borderColor: 'transparent',
                        backgroundColor: isDark
                          ? COLORS.cardBackgroundDark
                          : COLORS.cardBackgroundDark,
                      },
                  { borderRadius: SIZES.radius },
                ]}
                onPress={() => setSelectedDifficulty(diff.id)}
                activeOpacity={0.85}
              >
                <View
                  style={[
                    styles.difficultyDot,
                    { backgroundColor: diff.color },
                  ]}
                />
                <View>
                  <Text
                    style={[
                      styles.difficultyLabel,
                      isSelected
                        ? { color: '#fff', fontWeight: 'bold' }
                        : { color: COLORS.textSecondary, fontWeight: 'bold' },
                    ]}
                  >
                    {diff.label}
                    <Text style={{ color: COLORS.primary }}>
                      {' '}
                      +{diff.xp} XP
                    </Text>
                  </Text>
                  <Text
                    style={[
                      styles.difficultyDesc,
                      isSelected
                        ? { color: '#fff' }
                        : { color: COLORS.textSecondary },
                    ]}
                  >
                    {diff.desc}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
        <TouchableOpacity
          style={[
            styles.startQuizBtn,
            { backgroundColor: COLORS.primary, borderRadius: SIZES.radius },
          ]}
          activeOpacity={0.85}
        >
          <Text style={styles.startQuizText}>🚀 Start Quiz</Text>
        </TouchableOpacity>
        <Text
          style={[
            styles.pickText,
            { color: isDark ? COLORS.textSecondaryDark : COLORS.textSecondary },
          ]}
        >
          Pick your challenge!
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.lg,
    paddingTop: SPACING.lg,
    gap: 8,
  },
  backBtn: {
    marginRight: 12,
    padding: 4,
    borderRadius: 16,
  },
  headerTitle: {
    fontSize: SIZES.h2,
    fontWeight: 'bold',
  },
  headerStatsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: SPACING.lg,
    marginBottom: 8,
    gap: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  statText: {
    marginLeft: 3,
    fontSize: SIZES.body5,
    color: COLORS.textSecondary,
  },
  subtitle: {
    fontSize: SIZES.body3,
    marginBottom: 8,
    marginHorizontal: SPACING.lg,
    marginTop: 0,
    textAlign: 'left',
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: SIZES.body3,
    marginTop: 16,
    marginBottom: 8,
    marginHorizontal: SPACING.lg,
  },
  topicsRow: {
    flexDirection: 'row',
    marginBottom: 8,
    paddingHorizontal: SPACING.lg,
  },
  topicCard: {
    width: 170,
    borderRadius: SIZES.radius,
    padding: SPACING.lg,
    marginRight: 12,
    alignItems: 'center',
    borderWidth: 2,
  },
  topicTitle: {
    fontWeight: 'bold',
    fontSize: SIZES.body3,
    marginBottom: 2,
  },
  topicDesc: {
    fontSize: SIZES.body5,
    marginBottom: 8,
  },
  topicFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  topicXP: {
    fontSize: SIZES.body5,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  topicPercent: {
    fontSize: SIZES.body5,
    color: COLORS.textSecondary,
    marginLeft: 8,
  },
  surpriseBtn: {
    alignSelf: 'flex-end',
    marginBottom: 12,
    marginRight: SPACING.lg,
  },
  surpriseText: {
    fontWeight: 'bold',
    fontSize: SIZES.body4,
  },
  difficultyList: {
    width: '100%',
    marginBottom: 18,
    paddingHorizontal: SPACING.lg,
  },
  difficultyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    marginBottom: 10,
    backgroundColor: COLORS.cardBackground,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  difficultyDot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    marginRight: 12,
  },
  difficultyLabel: {
    fontWeight: 'bold',
    fontSize: SIZES.body3,
  },
  difficultyDesc: {
    fontSize: SIZES.body5,
  },
  startQuizBtn: {
    paddingVertical: 14,
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
    marginBottom: 10,
    marginTop: 8,
  },
  startQuizText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: SIZES.body3,
  },
  pickText: {
    alignSelf: 'center',
    marginTop: 8,
    fontSize: SIZES.body4,
  },
});
