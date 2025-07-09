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

interface MotivationalSlideProps {
  lessonTitle?: string;
  title?: string;
  slide?: number;
  totalSlides?: number;
  quote?: string;
  quoteSource?: string;
  lessonForTraders?: {
    icon?: string;
    title?: string;
    text?: string;
  };
  xpUnlocked?: {
    stars?: number;
    text?: string;
  };
  onPrev?: () => void;
  onNext?: () => void;
}

function MotivationalSlide({
  lessonTitle,
  title,
  slide,
  totalSlides,
  quote,
  quoteSource,
  lessonForTraders,
  xpUnlocked,
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
          <Text style={styles.headerLabel}>{lessonTitle}</Text>
          <Text style={styles.headerTitle}>{title}</Text>
        </View>
        <View style={styles.headerRightCol}>
          {/* Optionally add badges here if needed */}
        </View>
      </View>
      <ScrollView
        contentContainerStyle={styles.scrollWrap}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          {/* Top Row: Slide count and XP */}
          <View style={styles.topRow}>
            <Text style={styles.slideCount}>
              Slide {slide} of {totalSlides}
            </Text>
            {/* Optionally add XP badge here if needed */}
          </View>
          {/* Title */}
          <Text style={styles.title}>{title}</Text>
          {/* Quote Card */}
          <View style={styles.quoteCard}>
            <Ionicons
              name='chatbox-ellipses-outline'
              size={28}
              color={COLORS.primary}
              style={{ marginBottom: 8 }}
            />
            <Text style={styles.quoteText}>{quote}</Text>
            <Text style={styles.quoteSource}>{quoteSource}</Text>
          </View>
          {/* Lesson for Traders Card */}
          {lessonForTraders && (
            <View style={styles.lessonCard}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 2,
                }}
              >
                <Ionicons
                  name={lessonForTraders.icon || 'bulb-outline'}
                  size={16}
                  color={COLORS.primary}
                  style={{ marginRight: 6 }}
                />
                <Text style={styles.lessonTitle}>{lessonForTraders.title}</Text>
              </View>
              <Text style={styles.lessonText}>{lessonForTraders.text}</Text>
            </View>
          )}
          {/* XP Unlocked Card */}
          {xpUnlocked && (
            <View style={styles.xpUnlockedCard}>
              {[...Array(xpUnlocked.stars || 0)].map((_, i) => (
                <Ionicons
                  key={i}
                  name='star'
                  size={18}
                  color={'#fff'}
                  style={{ marginHorizontal: 2 }}
                />
              ))}
              <Text style={styles.xpUnlockedText}>{xpUnlocked.text}</Text>
            </View>
          )}
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

export default MotivationalSlide;
