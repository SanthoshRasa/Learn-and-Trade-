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

interface MotivationalSlideProps {
  lessonTitle?: string;
  onPrev?: () => void;
  onNext?: () => void;
}

function MotivationalSlide({
  lessonTitle = 'Wisdom from the Legends',
  onPrev,
  onNext,
}: MotivationalSlideProps) {
  return (
    <View style={styles.container}>
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
            <Text style={styles.xpBadgeText}>+15 XP</Text>
          </View>
        </View>
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollWrap}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          {/* Top Row: Slide count and XP */}
          <View style={styles.topRow}>
            <Text style={styles.slideCount}>Slide 11 of 15</Text>
            <View style={styles.xpBadge}>
              <Ionicons
                name='flash'
                size={14}
                color='#fff'
                style={{ marginRight: 4 }}
              />
              <Text style={styles.xpBadgeText}>+15 XP</Text>
            </View>
          </View>
          {/* Title */}
          <Text style={styles.title}>{lessonTitle}</Text>
          {/* Quote Card */}
          <View style={styles.quoteCard}>
            <Ionicons
              name='chatbox-ellipses-outline'
              size={28}
              color={COLORS.primary}
              style={{ marginBottom: 8 }}
            />
            <Text style={styles.quoteText}>
              The stock market is a device for transferring money from the
              impatient to the patient.
            </Text>
            <Text style={styles.quoteSource}>
              — Warren Buffett{'\n'}Source: Forbes Interview
            </Text>
          </View>
          {/* Lesson for Traders Card */}
          <View style={styles.lessonCard}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 2,
              }}
            >
              <Ionicons
                name='bulb-outline'
                size={16}
                color={COLORS.primary}
                style={{ marginRight: 6 }}
              />
              <Text style={styles.lessonTitle}>Lesson for Traders</Text>
            </View>
            <Text style={styles.lessonText}>
              Be patient. The best traders wait for the right moment.
            </Text>
          </View>
          {/* XP Unlocked Card */}
          <View style={styles.xpUnlockedCard}>
            <Ionicons
              name='star'
              size={18}
              color={'#fff'}
              style={{ marginHorizontal: 2 }}
            />
            <Text style={styles.xpUnlockedText}>+15 XP Unlocked!</Text>
          </View>
        </View>
        {/* Spacer for nav bar */}
        <View style={{ height: 90 }} />
      </ScrollView>
      {/* Bottom Navigation Bar */}
      <View style={styles.footerRow}>
        <TouchableOpacity style={styles.circleBtn} onPress={onPrev}>
          <Ionicons name='chevron-back' size={22} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.swipeText}>Swipe to continue</Text>
        <TouchableOpacity style={styles.circleBtn} onPress={onNext}>
          <Ionicons name='chevron-forward' size={22} color={COLORS.primary} />
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
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  slideCount: {
    color: '#B0B4C1',
    fontSize: 13,
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 22,
    marginBottom: 4,
    marginTop: 2,
  },
  quoteCard: {
    backgroundColor: '#181A20',
    borderRadius: 10,
    padding: 18,
    marginBottom: 16,
    alignItems: 'center',
  },
  quoteText: {
    color: '#fff',
    fontSize: 18,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 10,
  },
  quoteSource: {
    color: '#B0B4C1',
    fontSize: 13,
    textAlign: 'center',
  },
  lessonCard: {
    backgroundColor: '#232B3B',
    borderRadius: 10,
    padding: 14,
    marginBottom: 16,
  },
  lessonTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  lessonText: {
    color: '#fff',
    fontSize: 15,
  },
  xpUnlockedCard: {
    backgroundColor: '#232B3B',
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 14,
    marginBottom: 10,
    shadowColor: 'transparent',
    elevation: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  xpUnlockedText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
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
  swipeText: {
    color: '#B0B4C1',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

// Route handler for navigation and param parsing
function MotivationalSlideRoute() {
  const params = useLocalSearchParams();
  const router = useRouter();
  return (
    <MotivationalSlide
      {...params}
      onPrev={() =>
        router.replace('/(app)/_(lessons)/slides/GlossarySlide', { ...params })
      }
      onNext={() =>
        router.replace('/(app)/_(lessons)/slides/QuizStartSlide', { ...params })
      }
    />
  );
}

export default MotivationalSlideRoute;
