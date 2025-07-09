import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS, SPACING } from '../../../../constants/theme';

interface ExampleSlideProps {
  title?: string;
  introduction?: string;
  description?: string;
  steps?: string[];
  keyTakeaway?: string;
  funFact?: string;
  teacherNote?: string;
  media?: any;
  onPrev?: () => void;
  onNext?: () => void;
  xp?: number;
  lessonTitle?: string;
  moduleTitle?: string;
  slide?: number;
  totalSlides?: number;
}

export function ExampleSlide({
  title = '',
  introduction = '',
  description = '',
  steps = [],
  keyTakeaway = '',
  funFact = '',
  teacherNote = '',
  media = {},
  onPrev,
  onNext,
  xp = 0,
  lessonTitle = '',
  moduleTitle = '',
  slide = 1,
  totalSlides = 1,
}: ExampleSlideProps) {
  const params = useLocalSearchParams();
  const router = useRouter();

  const handlePrev = () => {
    if (onPrev) {
      onPrev();
    } else {
      router.replace('/(app)/_(lessons)/slides/ConceptSlide', { ...params });
    }
  };
  const handleNext = () => {
    if (onNext) {
      onNext();
    } else {
      router.replace('/(app)/_(lessons)/slides/CaseStudySlide', { ...params });
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.backgroundDark }}>
      {/* Header - match Concept/CompareSlide */}
      <View style={styles.headerBar}>
        <TouchableOpacity style={styles.headerBackBtn} onPress={onPrev}>
          <Ionicons name='chevron-back' size={20} color='#fff' />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerTitle}>{title}</Text>
          {moduleTitle ? (
            <Text
              style={[
                styles.subtitle,
                {
                  fontSize: 14,
                  marginTop: 2,
                  textAlign: 'left',
                  alignSelf: 'flex-start',
                },
              ]}
            >
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
            width: `${Math.round((slide / totalSlides) * 100)}%`,
            height: '100%',
            backgroundColor: '#3B82F6',
            borderRadius: 3,
          }}
        />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Slide count, title, introduction in body */}
        <View style={{ paddingHorizontal: 18, paddingTop: 8, marginBottom: 8 }}>
          <Text
            style={{
              color: COLORS.textSecondary,
              fontSize: 14,
              marginBottom: 2,
            }}
          >
            Slide {slide} of {totalSlides}
          </Text>
          <Text
            style={{
              color: '#fff',
              fontWeight: 'bold',
              fontSize: 22,
              marginBottom: 4,
            }}
          >
            {title}
          </Text>
          {introduction ? (
            <Text
              style={{
                color: COLORS.textSecondary,
                fontSize: 15,
                marginBottom: 8,
              }}
            >
              {introduction}
            </Text>
          ) : null}
        </View>
        {/* Image Placeholder (from media.images) */}
        {media.images && media.images.length > 0 ? (
          <View
            style={{ width: '100%', alignItems: 'center', marginBottom: 16 }}
          >
            <Image
              source={{ uri: media.images[0].url }}
              style={{
                width: '100%',
                aspectRatio: 16 / 9,
                borderRadius: 12,
                backgroundColor: '#232B3B',
              }}
              resizeMode='cover'
            />
            {media.images[0].caption ? (
              <Text
                style={{
                  color: '#B0B4C1',
                  fontSize: 13,
                  marginTop: 4,
                  textAlign: 'center',
                }}
              >
                {media.images[0].caption}
              </Text>
            ) : null}
          </View>
        ) : (
          <View
            style={{
              width: '100%',
              aspectRatio: 16 / 9,
              borderRadius: 12,
              backgroundColor: '#232B3B',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 16,
            }}
          >
            <Ionicons name='image-outline' size={48} color={'#444B5A'} />
          </View>
        )}
        {/* Steps (if any) */}
        {steps && steps.length > 0 && (
          <View style={{ marginBottom: 12 }}>
            {steps.map((step, idx) => (
              <Text
                key={idx}
                style={{ color: '#fff', fontSize: 15, marginBottom: 4 }}
              >
                • {step}
              </Text>
            ))}
          </View>
        )}
        {/* Key Example Box (keyTakeaway) */}
        {keyTakeaway ? (
          <View
            style={{
              backgroundColor: '#232B3B',
              borderRadius: 12,
              padding: 16,
              marginBottom: 16,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                color: '#fff',
                fontWeight: 'bold',
                fontSize: 15,
                textAlign: 'center',
              }}
            >
              {keyTakeaway}
            </Text>
          </View>
        ) : null}
        {/* Description */}
        {description ? (
          <Text style={styles.description}>{description}</Text>
        ) : null}
        {/* Fun Fact */}
        {funFact ? (
          <View
            style={{
              backgroundColor: '#232B3B',
              borderRadius: 12,
              flexDirection: 'row',
              alignItems: 'flex-start',
              padding: 16,
              marginBottom: 16,
            }}
          >
            <Ionicons
              name='sparkles-outline'
              size={20}
              color={COLORS.primary}
              style={{ marginRight: 12, marginTop: 2 }}
            />
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  color: COLORS.primary,
                  fontWeight: 'bold',
                  fontSize: 13,
                  textTransform: 'uppercase',
                  marginBottom: 2,
                }}
              >
                FUN FACT
              </Text>
              <Text
                style={{ color: '#fff', fontSize: 15, lineHeight: 21, flex: 1 }}
              >
                {funFact}
              </Text>
            </View>
          </View>
        ) : null}
        {/* Teacher Note */}
        {teacherNote ? (
          <View
            style={{
              backgroundColor: '#232B3B',
              borderRadius: 12,
              flexDirection: 'row',
              alignItems: 'flex-start',
              padding: 16,
              marginBottom: 16,
            }}
          >
            <Ionicons
              name='person-circle-outline'
              size={20}
              color={COLORS.primary}
              style={{ marginRight: 12, marginTop: 2 }}
            />
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  color: COLORS.primary,
                  fontWeight: 'bold',
                  fontSize: 13,
                  textTransform: 'uppercase',
                  marginBottom: 2,
                }}
              >
                TEACHER NOTE
              </Text>
              <Text
                style={{ color: '#fff', fontSize: 15, lineHeight: 21, flex: 1 }}
              >
                {teacherNote}
              </Text>
            </View>
          </View>
        ) : null}
        {/* Navigation Bar */}
        <View style={styles.footerRow}>
          <TouchableOpacity style={styles.circleBtn} onPress={handlePrev}>
            <Ionicons name='chevron-back' size={22} color={COLORS.primary} />
          </TouchableOpacity>
          <Text style={styles.swipeText}>Swipe to continue</Text>
          <TouchableOpacity style={styles.circleBtn} onPress={handleNext}>
            <Ionicons name='chevron-forward' size={22} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
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
  },
  headerBackBtn: {
    marginRight: 8,
    padding: 4,
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
  scrollContainer: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: 24,
  },
  tagsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    marginTop: 8,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 2,
    marginRight: 8,
  },
  subtitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  chartCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    marginTop: 8,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  chartLabel: {
    color: COLORS.textSecondary,
    fontSize: 12,
  },
  chartHint: {
    color: COLORS.textSecondary,
    fontSize: 13,
    textAlign: 'center',
    marginTop: 4,
  },
  keyExampleBox: {
    backgroundColor: '#23272f',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  keyExampleText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
  },
  description: {
    fontSize: 15,
    color: COLORS.textSecondary,
    marginBottom: 12,
    textAlign: 'left',
  },
  noteBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  noteTitle: {
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 2,
  },
  noteText: {
    color: COLORS.textSecondary,
    fontSize: 13,
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
  },
  circleBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#181A20',
    alignItems: 'center',
    justifyContent: 'center',
  },
  xpBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBackground,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  xpBtnText: {
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: 15,
    marginLeft: 6,
  },
  toastContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardBackground,
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 14,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  toastTitle: {
    color: COLORS.text,
    fontWeight: 'bold',
    fontSize: 15,
  },
  toastXP: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: 'bold',
  },
  swipeText: {
    color: '#B0B4C1',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

// Route handler for navigation and param parsing
function ExampleSlideRoute() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const getString = (val: any, fallback: string) =>
    Array.isArray(val) ? val[0] : val || fallback;
  return (
    <ExampleSlide
      title={getString(params.title, 'Real-World Example: BTC Long Trade')}
      introduction={getString(
        params.introduction,
        'A trader enters a long position on BTC at $40,000 and sells at $44,000. The $4,000 difference is their profit, minus any fees.'
      )}
      description={getString(params.description, '')}
      steps={Array.isArray(params.steps) ? params.steps : []}
      keyTakeaway={getString(params.keyTakeaway, '')}
      funFact={getString(params.funFact, '')}
      teacherNote={getString(params.teacherNote, '')}
      media={params.media || {}}
      onPrev={() =>
        router.replace('/(app)/_(lessons)/slides/ConceptSlide', { ...params })
      }
      onNext={() =>
        router.replace('/(app)/_(lessons)/slides/CaseStudySlide', { ...params })
      }
    />
  );
}

export default ExampleSlideRoute;
