import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS } from '../../../../constants/theme';

interface QuizDetail {
  icon: string;
  label: string;
  value: string;
}

interface UnlockRewards {
  icon: string;
  title: string;
  badge: string;
  progress: number;
  level: number;
  xp: number;
  xpToNextLevel: number;
}

interface InfoCard {
  icon: string;
  title: string;
  text: string;
}

interface QuizStartSlideProps {
  lessonTitle?: string;
  title?: string;
  slide?: number;
  totalSlides?: number;
  quizDetails?: QuizDetail[];
  unlockRewards?: UnlockRewards;
  beforeYouStart?: InfoCard;
  encouragement?: InfoCard;
  onPrev?: () => void;
  onNext?: () => void;
}

function QuizStartSlide({
  lessonTitle,
  title,
  slide,
  totalSlides,
  quizDetails = [],
  unlockRewards,
  beforeYouStart,
  encouragement,
  onPrev,
  onNext,
}: QuizStartSlideProps) {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerBar}>
        <TouchableOpacity style={styles.headerBackBtn} onPress={onPrev}>
          <Ionicons name='chevron-back' size={20} color='#fff' />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerLabel}>{lessonTitle}</Text>
          <Text style={styles.headerTitle}>{title}</Text>
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
          {quizDetails.map((detail, idx) => (
            <View key={idx} style={styles.detailRow}>
              <Ionicons
                name={detail.icon as any}
                size={18}
                color={COLORS.primary}
                style={{ marginRight: 8 }}
              />
              <Text style={styles.detailLabel}>{detail.label}</Text>
              <Text style={styles.detailValue}>{detail.value}</Text>
            </View>
          ))}
        </View>
        {/* Unlock Rewards Card */}
        {unlockRewards && (
          <View style={styles.card}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 6,
              }}
            >
              <Ionicons
                name={unlockRewards.icon as any}
                size={20}
                color={COLORS.primary}
                style={{ marginRight: 8 }}
              />
              <Text style={styles.cardTitle}>{unlockRewards.title}</Text>
            </View>
            <Text style={styles.rewardText}>
              🥇 Pass this quiz to unlock: '{unlockRewards.badge}'
            </Text>
            <View style={styles.progressBarWrap}>
              <View style={styles.progressBarBg}>
                <View
                  style={[
                    styles.progressBarFill,
                    {
                      width: `${Math.round(
                        (unlockRewards.progress || 0) * 100
                      )}%`,
                    },
                  ]}
                />
              </View>
              <Text style={styles.progressText}>
                Level {unlockRewards.level} {unlockRewards.xp}/
                {unlockRewards.xpToNextLevel} XP to Level{' '}
                {unlockRewards.level + 1}
              </Text>
            </View>
          </View>
        )}
        {/* Before You Start Card */}
        {beforeYouStart && (
          <View style={styles.card}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 6,
              }}
            >
              <Ionicons
                name={beforeYouStart.icon as any}
                size={20}
                color={COLORS.primary}
                style={{ marginRight: 8 }}
              />
              <Text style={styles.cardTitle}>{beforeYouStart.title}</Text>
            </View>
            <Text style={styles.beforeText}>{beforeYouStart.text}</Text>
          </View>
        )}
        {/* Encouragement Card */}
        {encouragement && (
          <View style={styles.card}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 6,
              }}
            >
              <Ionicons
                name={encouragement.icon as any}
                size={20}
                color={COLORS.primary}
                style={{ marginRight: 8 }}
              />
              <Text style={styles.cardTitle}>{encouragement.title}</Text>
            </View>
            <Text style={styles.beforeText}>{encouragement.text}</Text>
          </View>
        )}
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

export default QuizStartSlide;
