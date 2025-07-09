import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  PanResponder,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS } from '../../../../constants/theme';

const SCREEN_WIDTH = Dimensions.get('window').width;

interface CompareSlideProps {
  title?: string;
  xp?: number;
  slide?: number;
  totalSlides?: number;
  onPrev?: () => void;
  onNext?: () => void;
  tabs?: any[];
  introduction?: string;
  teacherNote?: string;
  media?: any;
  moduleTitle?: string;
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
  scrollContainer: {
    paddingHorizontal: 12,
    paddingBottom: 24,
    alignItems: 'center',
    width: '100%',
  },
  subtitle: {
    color: COLORS.textSecondary,
    fontSize: 15,
    marginTop: 8,
    marginBottom: 12,
    textAlign: 'center',
    maxWidth: 340,
  },
  comparisonCard: {
    backgroundColor: '#232B3B',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
    width: '100%',
    alignSelf: 'center',
  },
  comparisonCardText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 8,
    marginTop: 4,
    width: '100%',
    alignSelf: 'center',
  },
  tabBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: 'transparent',
    marginHorizontal: 2,
  },
  tabBtnActive: {
    backgroundColor: '#E6EAF2',
  },
  tabText: {
    color: COLORS.textSecondary,
    fontWeight: 'bold',
    fontSize: 15,
  },
  tabTextActive: {
    color: COLORS.primary,
  },
  tableWrap: {
    backgroundColor: '#232B3B',
    borderRadius: 12,
    width: '100%',
    alignSelf: 'center',
    marginBottom: 16,
    overflow: 'hidden',
  },
  tableHeaderRow: {
    flexDirection: 'row',
    backgroundColor: '#181A20',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 8,
    width: '100%',
  },
  tableHeaderCell: {
    flex: 1,
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#232B3B',
    width: '100%',
  },
  tableCellAspect: {
    flex: 1,
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
  tableCell: {
    flex: 1,
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
  styleBtnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 340,
    marginBottom: 16,
    marginTop: 16,
    gap: 8,
  },
  styleBtn: {
    backgroundColor: '#232B3B',
    borderRadius: 10,
    paddingVertical: 16,
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 0,
    marginRight: 0,
    marginLeft: 0,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  styleBtnText: {
    color: '#fff',
    fontWeight: 'bold',
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
    width: '100%',
    alignSelf: 'center',
  },
  circleBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#181A20',
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
  continueBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 4,
  },
  swipeText: {
    color: '#B0B4C1',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  teacherNoteCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A3240',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    width: '100%',
    alignSelf: 'center',
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

// Add LinearProgressBar component
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

export default function CompareSlide({
  title = 'Trading vs. Investing',
  xp = 20,
  slide = 6,
  totalSlides = 10,
  onPrev,
  onNext,
  tabs = [],
  introduction = '',
  teacherNote = '',
  media = {},
  moduleTitle = '',
}: CompareSlideProps) {
  const [tabKey, setTabKey] = useState(tabs[0]?.key || '');
  const currentTab = tabs.find(t => t.key === tabKey) || tabs[0];
  const router = useRouter();
  const params = useLocalSearchParams();

  // Image placeholder logic
  let imageUrl = '';
  let imageCaption = '';
  if (media && Array.isArray(media.images) && media.images.length > 0) {
    imageUrl = media.images[0].imageURL;
    imageCaption = media.images[0].caption || '';
  }
  const fallbackImageUrl =
    'https://i0.wp.com/port2flavors.com/wp-content/uploads/2022/07/placeholder-614.png?w=1200&ssl=1';
  const showImage = !!imageUrl;
  const screenWidth = Dimensions.get('window').width;
  const imageWidth = screenWidth - 32;
  const imageHeight = Math.round((imageWidth * 9) / 16);

  // Add pan responder for swipe gestures
  const panResponder = React.useRef(
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

  const handlePrev = () => {
    if (onPrev) {
      onPrev();
    } else {
      router.replace('/(app)/_(lessons)/slides/CaseStudySlide', { ...params });
    }
  };
  const handleNext = () => {
    if (onNext) {
      onNext();
    } else {
      router.replace('/(app)/_(lessons)/slides/MythBusterSlide', { ...params });
    }
  };

  return (
    <View
      style={{ flex: 1, backgroundColor: '#232B3B' }}
      {...panResponder.panHandlers}
    >
      {/* Header */}
      <View style={styles.headerBar}>
        <TouchableOpacity style={styles.headerBackBtn} onPress={onPrev}>
          <Ionicons name='chevron-back' size={20} color={'#fff'} />
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
      <LinearProgressBar progress={slide / totalSlides} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Top Section: Slide count, title, subtitle, introduction */}
        <View style={{ paddingHorizontal: 18, paddingTop: 8, marginBottom: 8 }}>
          <Text style={{ color: '#B0B4C1', fontSize: 14, marginBottom: 2 }}>
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
            <Text style={{ color: '#B0B4C1', fontSize: 15, marginBottom: 8 }}>
              {introduction}
            </Text>
          ) : null}
        </View>
        {/* Image Placeholder above Table */}
        <View
          style={{
            width: imageWidth,
            height: imageHeight,
            alignSelf: 'center',
            marginBottom: 16,
            borderRadius: 12,
            overflow: 'hidden',
            backgroundColor: '#232B3B',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {showImage ? (
            <Image
              source={{ uri: imageUrl }}
              style={{
                width: imageWidth,
                height: imageHeight,
                borderRadius: 12,
              }}
              resizeMode='cover'
            />
          ) : (
            <Ionicons name='image-outline' size={64} color='#555' />
          )}
        </View>
        {imageCaption ? (
          <Text
            style={{
              color: COLORS.textSecondary,
              fontSize: 13,
              textAlign: 'center',
              marginBottom: 8,
            }}
          >
            {imageCaption}
          </Text>
        ) : null}
        {/* Comparison Card */}
        <View style={styles.comparisonCard}>
          <Ionicons
            name='swap-horizontal-outline'
            size={32}
            color='#fff'
            style={{ marginBottom: 8 }}
          />
          <Text style={styles.comparisonCardText}>
            Trading vs Investing Comparison
          </Text>
        </View>
        {/* Tab Bar */}
        <View style={styles.tabBar}>
          {tabs.map(t => (
            <TouchableOpacity
              key={t.key}
              style={[styles.tabBtn, tabKey === t.key && styles.tabBtnActive]}
              onPress={() => setTabKey(t.key)}
            >
              <Ionicons
                name={t.icon}
                size={18}
                color={tabKey === t.key ? COLORS.primary : COLORS.textSecondary}
                style={{ marginRight: 4 }}
              />
              <Text
                style={[
                  styles.tabText,
                  tabKey === t.key && styles.tabTextActive,
                ]}
              >
                {t.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {/* Table */}
        <View style={styles.tableWrap}>
          <View style={[styles.tableHeaderRow, { backgroundColor: '#2A3240' }]}>
            <Text style={styles.tableHeaderCell}>Aspect</Text>
            <Text style={styles.tableHeaderCell}>Trading</Text>
            <Text style={styles.tableHeaderCell}>Investing</Text>
          </View>
          {/* First column background as a continuous bar */}
          <View
            style={{
              position: 'absolute',
              left: 0,
              top: 40,
              bottom: 0,
              width: '33%',
              backgroundColor: '#2A3240',
              zIndex: 0,
              borderBottomLeftRadius: 12,
              borderTopLeftRadius: 0,
            }}
          />
          {currentTab?.rows?.map(
            (
              row: { aspect: string; trading: string; investing: string },
              idx: number
            ) => (
              <View key={idx} style={styles.tableRow}>
                <View style={{ flex: 1, zIndex: 1 }}>
                  <Text
                    style={[
                      styles.tableCellAspect,
                      {
                        backgroundColor: 'transparent',
                        borderTopLeftRadius: idx === 0 ? 12 : 0,
                        borderBottomLeftRadius:
                          idx === currentTab.rows.length - 1 ? 12 : 0,
                        paddingVertical: 12,
                        paddingHorizontal: 4,
                        marginVertical: 0,
                      },
                    ]}
                  >
                    {row.aspect}
                  </Text>
                </View>
                <Text style={styles.tableCell}>{row.trading}</Text>
                <Text style={styles.tableCell}>{row.investing}</Text>
              </View>
            )
          )}
        </View>
        {/* Teacher Note Card */}
        {teacherNote ? (
          <View
            style={[
              styles.teacherNoteCard,
              {
                backgroundColor: '#2A3240',
                flexDirection: 'row',
                alignItems: 'flex-start',
                borderRadius: 12,
                padding: 16,
                marginBottom: 16,
              },
            ]}
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
              <Text style={{ color: '#fff', fontSize: 15, lineHeight: 21 }}>
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
