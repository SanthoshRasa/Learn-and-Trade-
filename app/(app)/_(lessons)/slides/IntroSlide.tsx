import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import { COLORS, SIZES, SPACING } from '../../../../constants/theme';

export default function IntroSlide(props: any) {
  const params = useLocalSearchParams();
  const router = useRouter();
  console.log('IntroSlide params:', params);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const mainBg = isDark ? COLORS.backgroundDark : COLORS.background;
  const cardBg = isDark ? COLORS.cardBackgroundDark : COLORS.cardBackground;
  const lessonNumber = 1;
  const username = 'TradingLearner';
  const xp = 128;
  const streak = 3;
  const title = params.title || props.title || 'What Is Trading?';
  const tags = ['Novice Navigator', 'Intro Slide'];
  const introduction = 'Introduction';
  const illustrationText =
    'Illustration of a beginner trader looking at charts on a computer and mobile device';
  const description =
    'Trading is the act of buying and selling financial assets like stocks, currencies, or crypto to make a profit from price changes. This lesson will introduce you to how traders think and how trading works in the real world.';
  const objective =
    'Understand the basic concept of trading and its purpose in financial markets';
  const slide = 1;
  const totalSlides = 6;
  const mainTextColor = isDark ? '#fff' : COLORS.text;
  const secondaryTextColor = isDark
    ? COLORS.textSecondaryDark
    : COLORS.textSecondary;
  const hasPrev = slide > 1;
  const hasNext = slide < totalSlides;

  return (
    <View style={{ flex: 1, backgroundColor: mainBg }}>
      {/* Card-style Header */}
      <View
        style={{
          backgroundColor: cardBg,
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
              style={{ marginRight: 10 }}
              onPress={() => {
                if (params.moduleId) {
                  router.replace({
                    pathname: '/(app)/_(lessons)/LessonsListScreen',
                    params: {
                      moduleId: params.moduleId,
                      moduleTitle: params.moduleTitle,
                      levelTitle: params.levelTitle,
                      xpReward: params.xpReward,
                    },
                  });
                } else {
                  router.replace('/(app)/_(lessons)/LessonsListScreen');
                }
              }}
            >
              <Ionicons name='arrow-back' size={22} color={mainTextColor} />
            </TouchableOpacity>
            <Text
              style={{
                color: mainTextColor,
                fontWeight: 'bold',
                fontSize: 18,
                flex: 1,
              }}
              numberOfLines={1}
            >
              {title}
            </Text>
            <Ionicons
              name='star'
              size={16}
              color={mainTextColor}
              style={{ marginRight: 2, marginLeft: 8 }}
            />
            <Text
              style={{
                color: mainTextColor,
                fontWeight: 'bold',
                fontSize: 14,
              }}
            >
              XP {xp}
            </Text>
          </View>
          <View
            style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}
          >
            <Text
              style={{
                color: secondaryTextColor,
                fontSize: 15,
                flex: 1,
              }}
            >
              {introduction}
            </Text>
            <Ionicons
              name='flame-outline'
              size={18}
              color={COLORS.primary}
              style={{ marginLeft: 8 }}
            />
            <Text
              style={{
                color: mainTextColor,
                fontWeight: 'bold',
                fontSize: 14,
                marginLeft: 2,
              }}
            >
              {streak}
            </Text>
            <Ionicons
              name='bookmark-outline'
              size={20}
              color={secondaryTextColor}
              style={{ marginLeft: 8 }}
            />
          </View>
        </View>
      </View>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContainer,
          { backgroundColor: mainBg },
        ]}
      >
        {/* Progress Bar */}
        <View style={styles.progressRow}>
          <Text
            style={{ color: secondaryTextColor, fontSize: 14, marginRight: 8 }}
          >
            Slide {slide} of {totalSlides}
          </Text>
          <View style={styles.dotsRow}>
            {[...Array(totalSlides)].map((_, i) => (
              <View
                key={i}
                style={[
                  styles.dot,
                  i === slide - 1 ? styles.dotActive : styles.dotInactive,
                ]}
              />
            ))}
          </View>
        </View>
        {/* Tags Row */}
        <View style={styles.tagsRow}>
          {tags.map((tag, idx) => (
            <View key={idx} style={styles.tag}>
              <Text style={{ color: secondaryTextColor, fontSize: 12 }}>
                {tag}
              </Text>
            </View>
          ))}
        </View>
        {/* Illustration Placeholder */}
        <View
          style={[
            styles.illustration,
            {
              backgroundColor: cardBg,
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: 180,
            },
          ]}
        >
          <Ionicons name='image-outline' size={72} color={secondaryTextColor} />
          {illustrationText ? (
            <Text
              style={{
                color: secondaryTextColor,
                fontSize: 17,
                textAlign: 'center',
                marginTop: 12,
              }}
            >
              {illustrationText}
            </Text>
          ) : null}
        </View>
        {/* Description Card */}
        <View style={[styles.card, { backgroundColor: cardBg }]}>
          <Text style={{ color: mainTextColor, fontSize: 15, marginBottom: 8 }}>
            {description}
          </Text>
          <View style={styles.cardActions}>
            <TouchableOpacity style={styles.actionBtn}>
              <Ionicons
                name='pencil-outline'
                size={18}
                color={COLORS.primary}
              />
              <Text
                style={{ color: COLORS.primary, fontSize: 13, marginLeft: 4 }}
              >
                Highlight
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn}>
              <Ionicons
                name='volume-high-outline'
                size={18}
                color={COLORS.primary}
              />
              <Text
                style={{ color: COLORS.primary, fontSize: 13, marginLeft: 4 }}
              >
                Listen
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* Learning Objective Card */}
        <View style={[styles.objectiveCard, { backgroundColor: cardBg }]}>
          <Ionicons
            name='information-circle-outline'
            size={20}
            color={COLORS.primary}
            style={{ marginRight: 8 }}
          />
          <View>
            <Text
              style={{
                fontWeight: 'bold',
                color: mainTextColor,
                fontSize: 15,
                marginLeft: 8,
              }}
            >
              Learning Objective
            </Text>
            <Text
              style={{ color: secondaryTextColor, fontSize: 13, marginLeft: 8 }}
            >
              {objective}
            </Text>
          </View>
        </View>
        {/* Footer */}
        <View style={styles.footer}>
          {hasPrev ? (
            <TouchableOpacity style={styles.footerBtn}>
              <Ionicons
                name='chevron-back'
                size={22}
                color={secondaryTextColor}
              />
            </TouchableOpacity>
          ) : null}
          <View style={styles.xpBtn}>
            <Ionicons name='flash' size={18} color={COLORS.primary} />
            <Text
              style={{
                color: COLORS.primary,
                fontWeight: 'bold',
                fontSize: 15,
                marginLeft: 6,
              }}
            >
              +5 XP
            </Text>
          </View>
          {hasNext ? (
            <TouchableOpacity style={styles.footerBtn}>
              <Ionicons
                name='chevron-forward'
                size={22}
                color={secondaryTextColor}
              />
            </TouchableOpacity>
          ) : null}
        </View>
        <Text
          style={{
            textAlign: 'center',
            color: secondaryTextColor,
            fontSize: 13,
            marginBottom: 8,
          }}
        >
          Swipe to continue
        </Text>
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
  username: {
    fontWeight: 'bold',
    fontSize: SIZES.body3,
    marginLeft: 12,
    flex: 1,
    color: COLORS.text,
  },
  headerStats: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  headerStatText: {
    fontWeight: 'bold',
    fontSize: SIZES.body5,
    color: COLORS.text,
    marginLeft: 2,
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
});
