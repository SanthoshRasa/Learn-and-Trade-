import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  PanResponder,
  ScrollView as RNScrollView,
  View as RNView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import { COLORS, SIZES, SPACING } from '../../../../constants/theme';

// Add a simple linear progress bar component
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

// Add XP badge component
function XPBadge({ xp }: { xp: number }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#181A20',
        borderRadius: 16,
        paddingHorizontal: 10,
        paddingVertical: 2,
        alignSelf: 'flex-end',
      }}
    >
      <Ionicons
        name='flash'
        size={14}
        color='#2563eb'
        style={{ marginRight: 3 }}
      />
      <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 13 }}>
        + {xp} XP
      </Text>
    </View>
  );
}

// Add StreakBadge component
function StreakBadge({ streak }: { streak: number }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#181A20',
        borderRadius: 16,
        paddingHorizontal: 10,
        paddingVertical: 2,
        marginRight: 8,
      }}
    >
      <Ionicons
        name='flame-outline'
        size={14}
        color='#2563eb'
        style={{ marginRight: 4 }}
      />
      <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 13 }}>
        {streak} day streak
      </Text>
    </View>
  );
}

export default function IntroSlide(props: any) {
  const params = useLocalSearchParams();
  const router = useRouter();
  console.log('IntroSlide params:', params);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const mainBg = isDark ? COLORS.backgroundDark : COLORS.background;
  const cardBg = isDark ? COLORS.cardBackgroundDark : COLORS.cardBackground;

  // Use props or fallback to defaults
  const title = props.title || 'What Is Trading?';
  const introduction = props.introduction || '';
  const illustrationText = props.illustrationText || '';
  const description = props.description || '';
  const objective = props.objective || '';
  const xp = props.xp || props.xpReward || 0;
  const streak = props.streak || 3;
  const tags = props.tags || ['Novice Navigator', 'Intro Slide'];
  const slide = props.slide || 1;
  const totalSlides = props.totalSlides || 6;
  const hasPrev = slide > 1;
  const hasNext = slide < totalSlides;
  const { onNext, onPrev } = props;
  const moduleTitle = props.moduleTitle || '';
  const lessonId = props.lessonId || '';

  // Media image support (multiple images)
  let images: any[] = [];
  if (props.media && Array.isArray(props.media.images)) {
    images = props.media.images.filter(
      (img: any) => img.imageURL || img.caption
    );
  }

  const mainTextColor = isDark ? '#fff' : COLORS.text;
  const secondaryTextColor = isDark
    ? COLORS.textSecondaryDark
    : COLORS.textSecondary;

  const handleNext = () => {
    if (onNext) {
      onNext();
    }
  };
  const handlePrev = () => {
    if (onPrev) {
      onPrev();
    }
  };

  const [imageLoading, setImageLoading] = React.useState(true);
  const [imageError, setImageError] = React.useState(false);
  const fallbackImageUrl =
    'https://i0.wp.com/port2flavors.com/wp-content/uploads/2022/07/placeholder-614.png?w=1200&ssl=1';
  const imageUrl = slide?.media?.images?.[0]?.imageURL || fallbackImageUrl;
  console.log('IntroSlide slide prop:', slide);
  console.log('IntroSlide imageUrl:', imageUrl);

  const screenWidth = Dimensions.get('window').width;
  const imageWidth = screenWidth - 32; // 16px margin on each side
  const imageHeight = Math.round((imageWidth * 9) / 16); // 16:9 aspect ratio

  // Add pan responder for swipe gestures
  const panResponder = React.useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        // Only respond to horizontal swipes
        return Math.abs(gestureState.dx) > 20 && Math.abs(gestureState.dy) < 20;
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx < -40 && onNext) {
          onNext(); // Swipe left to go to next
        } else if (gestureState.dx > 40 && onPrev) {
          onPrev(); // Swipe right to go to prev
        }
      },
    })
  ).current;

  // Bookmark state
  const [bookmarked, setBookmarked] = React.useState(false);
  React.useEffect(() => {
    // Check if this slide is bookmarked
    const key = `bookmark_${lessonId}_${slide}`;
    AsyncStorage.getItem(key).then(val => {
      setBookmarked(val === '1');
    });
  }, [lessonId, slide]);
  const toggleBookmark = async () => {
    const key = `bookmark_${lessonId}_${slide}`;
    if (bookmarked) {
      await AsyncStorage.removeItem(key);
      setBookmarked(false);
    } else {
      await AsyncStorage.setItem(key, '1');
      setBookmarked(true);
    }
  };

  return (
    <View
      style={{ flex: 1, backgroundColor: mainBg }}
      {...panResponder.panHandlers}
    >
      {/* Header - match ConceptSlide */}
      <View style={styles.headerBar}>
        <TouchableOpacity style={styles.headerBackBtn} onPress={handlePrev}>
          <Ionicons name='chevron-back' size={20} color={'#fff'} />
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
        contentContainerStyle={[
          styles.scrollContainer,
          { backgroundColor: mainBg, marginTop: 8 },
        ]}
      >
        {/* Top Section: Slide count, title, module title, introduction */}
        <View style={{ paddingHorizontal: 18, paddingTop: 8, marginBottom: 8 }}>
          <Text
            style={{ color: secondaryTextColor, fontSize: 14, marginBottom: 2 }}
          >
            Slide {slide} of {totalSlides}
          </Text>
          <Text
            style={{
              color: mainTextColor,
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
                color: secondaryTextColor,
                fontSize: 15,
                marginBottom: 8,
              }}
            >
              {introduction}
            </Text>
          ) : null}
        </View>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'flex-start',
            backgroundColor: '#232B3B',
            borderRadius: 16,
            paddingHorizontal: 14,
            paddingVertical: 8,
            marginBottom: 12,
            marginLeft: 16,
          }}
        >
          <Ionicons
            name='volume-high-outline'
            size={18}
            color={COLORS.primary}
          />
          <Text
            style={{
              color: COLORS.primary,
              fontSize: 15,
              marginLeft: 6,
              fontWeight: 'bold',
            }}
          >
            Listen
          </Text>
        </TouchableOpacity>
        {/* Media Images Row */}
        {images.length > 0 && (
          <RNScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginBottom: 12, marginTop: 4 }}
            contentContainerStyle={{ alignItems: 'center' }}
          >
            {images.map((img, idx) => (
              <View
                key={idx}
                style={{
                  width: 120,
                  height: 120,
                  backgroundColor: cardBg,
                  borderRadius: 12,
                  marginRight: 12,
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  borderWidth: 1,
                  borderColor: '#232B3B',
                }}
              >
                {img.imageURL ? (
                  <Image
                    source={{ uri: img.imageURL }}
                    style={{ width: '100%', height: '100%', borderRadius: 12 }}
                    resizeMode='cover'
                  />
                ) : (
                  <Ionicons
                    name='image-outline'
                    size={48}
                    color={secondaryTextColor}
                  />
                )}
                {img.caption ? (
                  <Text
                    style={{
                      color: secondaryTextColor,
                      fontSize: 13,
                      textAlign: 'center',
                      marginTop: 4,
                      paddingHorizontal: 4,
                    }}
                  >
                    {img.caption}
                  </Text>
                ) : null}
              </View>
            ))}
          </RNScrollView>
        )}
        <RNView
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          {imageUrl ? (
            <RNView
              style={{
                width: imageWidth,
                height: imageHeight,
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: 16,
                borderRadius: 12,
                overflow: 'hidden',
              }}
            >
              {imageLoading && !imageError && (
                <ActivityIndicator
                  size='large'
                  color='#888'
                  style={{ position: 'absolute' }}
                />
              )}
              {!imageError ? (
                <Image
                  source={{ uri: imageUrl }}
                  style={{
                    width: imageWidth,
                    height: imageHeight,
                    borderRadius: 12,
                    opacity: imageLoading ? 0 : 1,
                  }}
                  resizeMode='cover'
                  onLoadEnd={() => setImageLoading(false)}
                  onError={() => {
                    setImageError(true);
                    setImageLoading(false);
                  }}
                />
              ) : (
                <RNView
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    height: '100%',
                  }}
                >
                  <Ionicons name='image-outline' size={64} color='#555' />
                  <Text style={{ color: '#888', marginTop: 8 }}>
                    Image not available
                  </Text>
                </RNView>
              )}
            </RNView>
          ) : (
            <RNView
              style={{
                width: imageWidth,
                height: imageHeight,
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: 16,
                borderRadius: 12,
                overflow: 'hidden',
              }}
            >
              <Ionicons name='image-outline' size={64} color='#555' />
              <Text style={{ color: '#888', marginTop: 8 }}>
                No image provided
              </Text>
            </RNView>
          )}
        </RNView>
        {/* Description Card */}
        {description ? (
          <View style={[styles.card, { backgroundColor: cardBg }]}>
            <Text
              style={{ color: mainTextColor, fontSize: 15, marginBottom: 8 }}
            >
              {description}
            </Text>
          </View>
        ) : null}
        {/* Learning Objective Card */}
        <View
          style={[
            styles.teacherNoteCard,
            { backgroundColor: cardBg, marginBottom: 12 },
          ]}
        >
          <Ionicons
            name='information-circle-outline'
            size={20}
            color={COLORS.primary}
            style={{ marginRight: 8 }}
          />
          <View style={{ flex: 1 }}>
            <Text style={styles.teacherNoteLabel}>LEARNING OBJECTIVE</Text>
            <Text style={styles.teacherNoteText}>{objective}</Text>
          </View>
        </View>
        {/* Footer */}
        <View style={styles.footer}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              marginTop: 8,
              position: 'relative',
            }}
          >
            <Text
              style={{
                color: secondaryTextColor,
                fontSize: SIZES.body5,
                textAlign: 'center',
                flex: 1,
              }}
            >
              Swipe to continue
            </Text>
            {hasNext ? (
              <TouchableOpacity
                style={[styles.footerBtn, { position: 'absolute', right: 0 }]}
                onPress={handleNext}
              >
                <Ionicons
                  name='chevron-forward'
                  size={22}
                  color={secondaryTextColor}
                />
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    padding: SPACING.lg,
    paddingBottom: 32,
    backgroundColor: COLORS.background,
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  headerBackBtn: { marginRight: 8, padding: 4 },
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
  subtitle: {
    color: '#B0B4C1',
    fontSize: 14,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  slideCount: {
    color: COLORS.textSecondary,
    fontSize: SIZES.body5,
    marginRight: 8,
  },
  dotsRow: { flexDirection: 'row', alignItems: 'center' },
  dot: { width: 8, height: 8, borderRadius: 4, marginHorizontal: 2 },
  dotActive: { backgroundColor: COLORS.primary },
  dotInactive: { backgroundColor: COLORS.cardBackground },
  lessonTitle: {
    fontSize: SIZES.h3,
    fontWeight: 'bold',
    marginBottom: 6,
    color: COLORS.text,
  },
  tagsRow: { flexDirection: 'row', marginBottom: 8 },
  tag: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 2,
    marginRight: 6,
  },
  tagText: { color: COLORS.textSecondary, fontSize: SIZES.body5 },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: SIZES.body3,
    marginBottom: 8,
    color: COLORS.text,
  },
  illustration: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: SIZES.radius,
    minHeight: 80,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    marginTop: 4,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  illustrationText: {
    color: COLORS.textSecondary,
    fontSize: SIZES.body4,
    textAlign: 'center',
    padding: 16,
  },
  card: {
    backgroundColor: COLORS.background,
    borderRadius: SIZES.radius,
    padding: SPACING.md,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  cardText: { color: COLORS.text, fontSize: SIZES.body4, marginBottom: 8 },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    color: COLORS.primary,
    fontSize: SIZES.body5,
    marginLeft: 4,
  },
  objectiveCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderRadius: SIZES.radius,
    padding: SPACING.md,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  objectiveLabel: {
    fontWeight: 'bold',
    color: COLORS.text,
    fontSize: SIZES.body4,
    marginLeft: 8,
  },
  objectiveText: {
    color: COLORS.textSecondary,
    fontSize: SIZES.body5,
    marginLeft: 8,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 24,
    marginBottom: 4,
  },
  footerBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.cardBackground,
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
    fontSize: SIZES.body4,
    marginLeft: 6,
  },
  swipeText: {
    textAlign: 'center',
    color: COLORS.textSecondary,
    fontSize: SIZES.body5,
    marginBottom: 8,
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
