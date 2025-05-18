import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { COLORS, SIZES, SPACING } from '../../constants/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const slides = [
  {
    id: 1,
    title: 'Learn Trading',
    description:
      'Master trading across multiple markets with interactive lessons',
    icon: 'book',
  },
  {
    id: 2,
    title: 'Practice Risk-Free',
    description: 'Apply your knowledge in simulated trading environments',
    icon: 'trending-up',
  },
  {
    id: 3,
    title: 'Track Progress',
    description: 'Monitor your learning journey and compete on leaderboards',
    icon: 'trophy',
  },
];

function PaginationDot({
  index,
  scrollX,
  isDark,
}: {
  index: number;
  scrollX: Animated.SharedValue<number>;
  isDark: boolean;
}) {
  const animatedStyle = useAnimatedStyle(() => {
    const inputRange = [
      (index - 1) * SCREEN_WIDTH,
      index * SCREEN_WIDTH,
      (index + 1) * SCREEN_WIDTH,
    ];
    const dotWidth = interpolate(
      scrollX.value,
      inputRange,
      [8, 20, 8],
      'clamp'
    );
    const opacity = interpolate(
      scrollX.value,
      inputRange,
      [0.5, 1, 0.5],
      'clamp'
    );
    return {
      width: dotWidth,
      opacity,
    };
  });

  return (
    <Animated.View
      style={[
        styles.dot,
        animatedStyle,
        {
          backgroundColor: isDark ? COLORS.primary : COLORS.primary,
        },
      ]}
    />
  );
}

export default function OnboardingScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const scrollX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollX.value = event.contentOffset.x;
    },
  });

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? COLORS.backgroundDark : COLORS.background },
      ]}
    >
      <Animated.ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        {slides.map((slide, index) => (
          <View key={slide.id} style={styles.slide}>
            <View style={styles.iconContainer}>
              <Ionicons
                name={slide.icon as keyof typeof Ionicons.glyphMap}
                size={80}
                color={COLORS.primary}
              />
            </View>
            <Text
              style={[
                styles.title,
                { color: isDark ? COLORS.textDark : COLORS.text },
              ]}
            >
              {slide.title}
            </Text>
            <Text
              style={[
                styles.description,
                {
                  color: isDark
                    ? COLORS.textSecondaryDark
                    : COLORS.textSecondary,
                },
              ]}
            >
              {slide.description}
            </Text>
          </View>
        ))}
      </Animated.ScrollView>

      <View style={styles.pagination}>
        {slides.map((_, index) => (
          <PaginationDot
            key={index}
            index={index}
            scrollX={scrollX}
            isDark={isDark}
          />
        ))}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: COLORS.primary }]}
          onPress={() => router.push('/signup')}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => router.push('/login')}
        >
          <Text
            style={[
              styles.loginButtonText,
              { color: isDark ? COLORS.textDark : COLORS.text },
            ]}
          >
            Already have an account? Login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    width: SCREEN_WIDTH,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.xl,
  },
  iconContainer: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: COLORS.cardBackground,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.xl,
  },
  title: {
    fontSize: SIZES.h1,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  description: {
    fontSize: SIZES.body3,
    textAlign: 'center',
    paddingHorizontal: SPACING.lg,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  buttonContainer: {
    padding: SPACING.lg,
  },
  button: {
    height: 56,
    borderRadius: SIZES.radius,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
  },
  buttonText: {
    color: COLORS.background,
    fontSize: SIZES.body3,
    fontWeight: 'bold',
  },
  loginButton: {
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonText: {
    fontSize: SIZES.body4,
  },
});
