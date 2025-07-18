import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useRef } from 'react';
import {
  Dimensions,
  PanResponder,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS } from '../../../../constants/theme';

function LinearProgressBar({ progress }: { progress: number }) {
  return (
    <View
      style={{
        width: '100%',
        height: 6,
        backgroundColor: '#232B3B',
        borderRadius: 3,
        marginBottom: 12,
      }}
    >
      <View
        style={{
          width: `${Math.round(progress * 100)}%`,
          height: '100%',
          backgroundColor: '#3B82F6',
          borderRadius: 3,
        }}
      />
    </View>
  );
}

function ConceptSlide({
  title = 'Understanding Market Trends',
  introduction = '',
  xp = 10,
  slide = 2,
  totalSlides = 12,
  onPrev,
  onNext,
  points = [],
  funFact = '',
  teacherNote = '',
  moduleTitle = '',
}: any) {
  const windowHeight = Dimensions.get('window').height;
  const cardBg = '#232B3B'; // match IntroSlide card background

  // Add pan responder for swipe gestures
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dx) > 20 && Math.abs(gestureState.dy) < 20;
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx < -40 && onNext) {
          onNext();
        } else if (gestureState.dx > 40 && onPrev) {
          onPrev();
        }
      },
    })
  ).current;

  return (
    <View
      style={{ flex: 1, backgroundColor: cardBg }}
      {...panResponder.panHandlers}
    >
      {/* Header */}
      <View style={styles.headerBar}>
        <TouchableOpacity style={styles.headerBackBtn} onPress={onPrev}>
          <Ionicons name='chevron-back' size={20} color='#fff' />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerTitle}>{title}</Text>
          {moduleTitle ? (
            <Text style={[styles.subtitle, { fontSize: 14, marginTop: 2 }]}>
              {moduleTitle}
            </Text>
          ) : null}
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
            <Text style={styles.xpBadgeText}>+{xp} XP</Text>
          </View>
        </View>
      </View>
      {/* Linear Progress Bar below header */}
      <LinearProgressBar progress={slide / totalSlides} />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            flex: 1,
            width: '100%',
            minHeight: windowHeight - 90,
            backgroundColor: cardBg,
            padding: 18,
          }}
        >
          <View style={styles.topRow}>
            <Text style={styles.slideCount}>
              Slide {slide} of {totalSlides}
            </Text>
          </View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{introduction}</Text>
          {/* Chart Placeholder */}
          <View style={styles.chartPlaceholder}>
            <Text style={styles.chartPlaceholderText}>
              Trading chart visualization
            </Text>
          </View>
          {/* Points List */}
          {Array.isArray(points) && points.length > 0 && (
            <View style={{ marginBottom: 18 }}>
              {points.map((point: string, idx: number) => (
                <View key={idx} style={styles.objectiveRow}>
                  <Ionicons
                    name='ellipse-outline'
                    size={14}
                    color={COLORS.primary}
                    style={{ marginRight: 8 }}
                  />
                  <Text style={styles.objectivePill}>{point}</Text>
                </View>
              ))}
            </View>
          )}
          {/* Teacher Note */}
          {teacherNote ? (
            <View
              style={[
                styles.teacherNoteCard,
                { backgroundColor: cardBg, marginBottom: 10 },
              ]}
            >
              <Ionicons
                name='school-outline'
                size={20}
                color={COLORS.primary}
                style={{ marginRight: 8 }}
              />
              <View style={{ flex: 1 }}>
                <Text style={styles.teacherNoteLabel}>TEACHER NOTE</Text>
                <Text style={styles.teacherNoteText}>{teacherNote}</Text>
              </View>
            </View>
          ) : null}
          {/* Fun Fact */}
          {funFact ? (
            <View
              style={[
                styles.coachCard,
                { backgroundColor: '#232B3B', marginBottom: 10 },
              ]}
            >
              <Ionicons
                name='sparkles-outline'
                size={20}
                color={COLORS.primary}
                style={{ marginRight: 10 }}
              />
              <Text style={{ color: '#fff', fontSize: 14, flex: 1 }}>
                <Text style={{ fontWeight: 'bold', color: COLORS.primary }}>
                  Fun Fact:{' '}
                </Text>
                {funFact}
              </Text>
            </View>
          ) : null}
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
  subtitle: {
    color: '#B0B4C1',
    fontSize: 15,
    marginBottom: 16,
  },
  chartPlaceholder: {
    backgroundColor: '#353C4A',
    borderRadius: 12,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  chartPlaceholderText: {
    color: '#A1A1AA',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionLabel: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 8,
    marginTop: 2,
  },
  objectivesList: {
    marginBottom: 16,
  },
  objectiveRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  objectivePill: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  coachCard: {
    backgroundColor: '#181A20',
    borderRadius: 10,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  coachAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#232B3B',
    marginRight: 10,
  },
  coachName: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 2,
  },
  coachText: {
    color: '#fff',
    fontSize: 14,
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
  teacherNoteCard: {
    backgroundColor: '#181A20',
    borderRadius: 10,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  teacherNoteLabel: {
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: 13,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  teacherNoteText: {
    color: '#fff',
    fontSize: 14,
    flex: 1,
  },
});

// Route handler for navigation and param parsing
function ConceptSlideRoute() {
  const params = useLocalSearchParams();
  const router = useRouter();
  return (
    <ConceptSlide
      {...params}
      onPrev={() =>
        router.replace('/(app)/_(lessons)/slides/IntroSlide', { ...params })
      }
      onNext={() =>
        router.replace('/(app)/_(lessons)/slides/ExampleSlide', { ...params })
      }
    />
  );
}

export { ConceptSlide };
export default ConceptSlideRoute;
