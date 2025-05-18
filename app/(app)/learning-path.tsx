import { Ionicons } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
// import ConfettiCannon from 'react-native-confetti-cannon'; // Uncomment if installed
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Modal } from 'react-native';
import { COLORS, SIZES } from '../../constants/theme';

const { width } = Dimensions.get('window');

const MOCK_USER = {
  avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=trader',
  name: 'TradingLearner',
  streak: 5,
  coins: 1240,
  badges: 2,
};

const LEVELS = [
  {
    id: 1,
    name: 'Novice Navigator',
    progress: 3,
    maxProgress: 3,
    state: 'completed', // 'completed', 'active', 'locked'
  },
  {
    id: 2,
    name: 'Market Explorer',
    progress: 8,
    maxProgress: 15,
    state: 'active',
  },
  {
    id: 3,
    name: 'Chart Apprentice',
    progress: 0,
    maxProgress: 12,
    state: 'locked',
  },
  {
    id: 4,
    name: 'Risk Tactician',
    progress: 0,
    maxProgress: 10,
    state: 'locked',
  },
];

// Mock modules data for each level
const MOCK_MODULES = {
  1: [
    { id: '1-1', title: 'What is Trading vs. Investing', status: 'completed' },
    { id: '1-2', title: 'Financial Markets Overview', status: 'inprogress' },
    {
      id: '1-3',
      title: 'How Trading Works: Buyers, Sellers, Brokers',
      status: 'locked',
    },
    { id: '1-4', title: 'Order Types (Market, Limit, Stop)', status: 'locked' },
    {
      id: '1-5',
      title: 'Trading Platforms, Charts, and Accounts',
      status: 'locked',
    },
    { id: '1-6', title: 'Risk vs. Reward Basics', status: 'locked' },
    { id: '1-7', title: 'Your First Demo Trade', status: 'locked' },
  ],
  2: [
    { id: '2-1', title: 'Module 2-1', status: 'completed' },
    { id: '2-2', title: 'Module 2-2', status: 'inprogress' },
    { id: '2-3', title: 'Module 2-3', status: 'locked' },
  ],
  3: [
    { id: '3-1', title: 'Module 3-1', status: 'locked' },
    { id: '3-2', title: 'Module 3-2', status: 'locked' },
  ],
  4: [
    { id: '4-1', title: 'Module 4-1', status: 'locked' },
    { id: '4-2', title: 'Module 4-2', status: 'locked' },
  ],
};

// Types for module status and module
export type ModuleStatus = 'completed' | 'inprogress' | 'locked';
export type Module = {
  id: string;
  title: string;
  status: ModuleStatus;
};

// Inline ModulesModal component
const ModulesModal = ({
  visible,
  onClose,
  levelTitle,
  description,
  xpReward,
  modules,
  onModulePress,
}: {
  visible: boolean;
  onClose: () => void;
  levelTitle: string;
  description: string;
  xpReward: number;
  modules: Module[];
  onModulePress: (module: Module) => void;
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  // Progress bar calculation
  const completed = modules.filter(m => m.status === 'completed').length;
  const progress = modules.length > 0 ? completed / modules.length : 0;

  return (
    <Modal
      visible={visible}
      transparent
      animationType='slide'
      onRequestClose={onClose}
    >
      <View
        style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}
      >
        <View
          style={{
            backgroundColor: isDark ? COLORS.backgroundDark : COLORS.background,
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            padding: 20,
            shadowColor: '#000',
            shadowOpacity: 0.12,
            shadowRadius: 12,
            shadowOffset: { width: 0, height: -2 },
            elevation: 8,
            minHeight: 320,
            width: '100%',
            maxWidth: 500,
          }}
        >
          {/* Header */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 8,
            }}
          >
            <View
              style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}
            >
              <MaterialCommunityIcons
                name='flag-checkered'
                size={22}
                color={COLORS.primary}
                style={{ marginRight: 8 }}
              />
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 18,
                  color: isDark ? COLORS.textDark : COLORS.text,
                }}
              >
                {levelTitle}
              </Text>
            </View>
            <TouchableOpacity
              onPress={onClose}
              style={{ marginLeft: 12, padding: 4 }}
            >
              <Ionicons name='close' size={28} color={COLORS.textSecondary} />
            </TouchableOpacity>
          </View>
          {/* Goal/Description */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 4,
            }}
          >
            <MaterialCommunityIcons
              name='target'
              size={18}
              color={COLORS.primary}
              style={{ marginRight: 6 }}
            />
            <Text
              style={{
                color: isDark ? COLORS.textDark : COLORS.text,
                fontSize: 15,
                flex: 1,
              }}
            >
              Understand what trading is and why it matters.
            </Text>
          </View>
          {/* XP Reward */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 10,
            }}
          >
            <MaterialCommunityIcons
              name='star-circle'
              size={18}
              color={COLORS.primary}
            />
            <Text
              style={{
                color: COLORS.primary,
                fontWeight: 'bold',
                marginLeft: 6,
                fontSize: 15,
              }}
            >
              XP Reward: +{xpReward}
            </Text>
          </View>
          {/* Modules List */}
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 15,
              marginTop: 8,
              marginBottom: 4,
            }}
          >
            Modules
          </Text>
          <ScrollView
            style={{ maxHeight: 260 }}
            showsVerticalScrollIndicator={false}
          >
            {modules.map((module, idx) => (
              <TouchableOpacity
                key={module.id}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 8,
                  borderRadius: 8,
                  paddingHorizontal: 2,
                  marginBottom: 2,
                }}
                activeOpacity={module.status === 'locked' ? 1 : 0.7}
                onPress={() => {
                  if (module.status !== 'locked') {
                    onClose();
                    router.push({
                      pathname: '/(app)/_(lessons)/LessonsListScreen',
                      params: {
                        moduleId: module.id,
                        moduleTitle: module.title,
                        levelTitle: levelTitle,
                        xpReward: xpReward.toString(),
                      },
                    });
                  }
                }}
              >
                {module.status === 'completed' ? (
                  <MaterialCommunityIcons
                    name='check-circle'
                    size={22}
                    color={COLORS.primary}
                  />
                ) : module.status === 'inprogress' ? (
                  <MaterialCommunityIcons
                    name='checkbox-marked-circle-outline'
                    size={22}
                    color={COLORS.primary}
                  />
                ) : (
                  <MaterialCommunityIcons
                    name='checkbox-blank-circle-outline'
                    size={22}
                    color={
                      isDark ? COLORS.textSecondaryDark : COLORS.textSecondary
                    }
                  />
                )}
                <Text
                  style={{
                    fontSize: 15,
                    marginLeft: 10,
                    color:
                      module.status === 'locked'
                        ? isDark
                          ? COLORS.textSecondaryDark
                          : COLORS.textSecondary
                        : isDark
                        ? COLORS.textDark
                        : COLORS.text,
                    fontWeight:
                      module.status === 'inprogress' ? 'bold' : 'normal',
                  }}
                >
                  {module.title}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          {/* Progress Bar */}
          <View
            style={{
              height: 8,
              backgroundColor: '#E6EAF2',
              borderRadius: 4,
              marginTop: 18,
              marginBottom: 2,
              overflow: 'hidden',
            }}
          >
            <View
              style={{
                height: '100%',
                backgroundColor: COLORS.primary,
                borderRadius: 4,
                width: `${progress * 100}%`,
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

// Pre-calculate node positions along the path (alternating left/right)
const NODE_POSITIONS = [
  { x: width * 0.25, y: 80 },
  { x: width * 0.75, y: 240 },
  { x: width * 0.25, y: 400 },
  { x: width * 0.75, y: 560 },
];

// Dynamically generate a playful, winding SVG path through the node positions
function getSmoothPath(points: { x: number; y: number }[]) {
  if (points.length < 2) return '';
  let d = `M${points[0].x},${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    // Dramatic S-curve: large horizontal offset
    const direction = i % 2 === 0 ? 1 : -1;
    const offset = width * 0.3; // 30% of screen width
    const cpx = (prev.x + curr.x) / 2 + direction * offset;
    const cpy = (prev.y + curr.y) / 2;
    d += ` Q${cpx},${cpy} ${curr.x},${curr.y}`;
  }
  return d;
}

export default function LearningPathScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [showConfetti, setShowConfetti] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;
  const [showModulesModal, setShowModulesModal] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<(typeof LEVELS)[0] | null>(
    null
  );

  // Path curve points for SVG (mocked for 4 levels)
  const pathD = `M${width / 2},80
    Q${width * 0.8},200 ${width / 2},320
    Q${width * 0.2},440 ${width / 2},560
    Q${width * 0.8},680 ${width / 2},800`;

  // Handler for tapping a level
  const handleLevelPress = (level: (typeof LEVELS)[0]) => {
    if (level.state === 'locked') return;
    setSelectedLevel(level);
    setShowModulesModal(true);
    // If completed, show confetti
    if (level.state === 'completed') {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: isDark ? COLORS.backgroundDark : COLORS.background,
      }}
    >
      {/* Header */}
      <View
        style={[
          styles.header,
          { backgroundColor: isDark ? COLORS.cardBackgroundDark : '#232B3B' },
        ]}
      >
        <Image source={{ uri: MOCK_USER.avatar }} style={styles.avatar} />
        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text style={[styles.headerName, { color: '#fff' }]}>
            {MOCK_USER.name}
          </Text>
          <View style={styles.headerStatsRow}>
            <Ionicons name='flame' size={16} color='#fff' />
            <Text style={styles.headerStatText}>
              {MOCK_USER.streak}-day streak!
            </Text>
            <Ionicons
              name='star'
              size={16}
              color='#fff'
              style={{ marginLeft: 12 }}
            />
            <Text style={styles.headerStatText}>{MOCK_USER.badges} badges</Text>
            <Ionicons
              name='logo-bitcoin'
              size={16}
              color='#fff'
              style={{ marginLeft: 12 }}
            />
            <Text style={styles.headerStatText}>{MOCK_USER.coins}</Text>
          </View>
        </View>
      </View>
      {/* Path and Levels */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        <View style={styles.pathContainer}>
          <Svg height={1000} width={width} style={styles.pathSvg}>
            {/* Main road path */}
            <Path
              d={getSmoothPath(NODE_POSITIONS)}
              stroke={COLORS.primary}
              strokeWidth={10}
              fill='none'
              strokeLinecap='round'
              strokeLinejoin='round'
              opacity={0.18}
            />
            {/* Center line */}
            <Path
              d={getSmoothPath(NODE_POSITIONS)}
              stroke={COLORS.primary}
              strokeWidth={4}
              fill='none'
              strokeDasharray='12,8'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </Svg>
          {LEVELS.map((level, idx) => {
            // Use pre-calculated positions for each node
            const pos = NODE_POSITIONS[idx] || {
              x: width / 2,
              y: 80 + idx * 180,
            };
            return (
              <Animated.View
                key={level.id}
                style={[
                  {
                    position: 'absolute',
                    left: pos.x - 60, // center node
                    top: pos.y - 60,
                    zIndex: 2,
                  },
                ]}
              >
                <TouchableOpacity
                  style={[
                    styles.levelCard,
                    {
                      backgroundColor: isDark
                        ? COLORS.cardBackgroundDark
                        : COLORS.cardBackground,
                      borderColor:
                        level.state === 'active'
                          ? COLORS.primary
                          : level.state === 'completed'
                          ? COLORS.success
                          : COLORS.border,
                      borderWidth: 4,
                      shadowColor:
                        level.state === 'active' ? COLORS.primary : '#000',
                      shadowOpacity: level.state === 'active' ? 0.25 : 0.08,
                      shadowRadius: 12,
                      elevation: 4,
                    },
                  ]}
                  onPress={() => handleLevelPress(level)}
                  activeOpacity={level.state === 'locked' ? 1 : 0.8}
                >
                  <View style={styles.levelAvatarWrap}>
                    {level.state === 'completed' ? (
                      <Ionicons
                        name='checkmark-circle'
                        size={40}
                        color={COLORS.success}
                      />
                    ) : level.state === 'locked' ? (
                      <Ionicons
                        name='lock-closed'
                        size={40}
                        color={COLORS.textSecondary}
                      />
                    ) : (
                      <Ionicons name='star' size={40} color={COLORS.primary} />
                    )}
                  </View>
                  <Text
                    style={[
                      styles.levelName,
                      {
                        color: isDark ? COLORS.textDark : COLORS.text,
                        fontSize: 16,
                        marginTop: 48,
                        fontWeight: 'bold',
                        textAlign: 'center',
                      },
                    ]}
                  >
                    {level.name}
                  </Text>
                  <Text
                    style={[
                      styles.levelProgress,
                      {
                        color:
                          level.state === 'completed'
                            ? COLORS.success
                            : isDark
                            ? COLORS.textSecondaryDark
                            : COLORS.textSecondary,
                        fontWeight: 'bold',
                        textAlign: 'center',
                        fontSize: 13,
                      },
                    ]}
                  >
                    {level.state === 'completed'
                      ? 'Completed'
                      : level.state === 'locked'
                      ? ''
                      : `${level.progress} / ${level.maxProgress} modules`}
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </View>
        {/* {showConfetti && (
          <ConfettiCannon count={100} origin={{ x: width / 2, y: 0 }} fadeOut />
        )} */}
      </ScrollView>
      {selectedLevel && (
        <ModulesModal
          visible={showModulesModal}
          onClose={() => setShowModulesModal(false)}
          levelTitle={selectedLevel.name}
          description={`Level ${selectedLevel.id} description`}
          xpReward={100}
          modules={
            (MOCK_MODULES[
              selectedLevel.id as keyof typeof MOCK_MODULES
            ] as Module[]) || []
          }
          onModulePress={module => {
            // Navigation logic for unlocked module
            if (module.status !== 'locked') {
              // TODO: Replace with navigation to LessonContentScreen
              setShowModulesModal(false);
            }
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    paddingTop: 24,
    backgroundColor: '#232B3B',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#fff',
  },
  headerName: {
    fontWeight: 'bold',
    fontSize: SIZES.body2,
    color: '#fff',
  },
  headerStatsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  headerStatText: {
    color: '#fff',
    fontSize: SIZES.body5,
    marginLeft: 4,
  },
  levelNode: {
    width: 120,
    alignItems: 'center',
    borderWidth: 3,
    borderRadius: 60,
    padding: 8,
    marginBottom: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  levelAvatarWrap: {
    position: 'absolute',
    top: 22,
    left: 22,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  levelName: {
    fontWeight: 'bold',
    fontSize: SIZES.body3,
    marginTop: 8,
    textAlign: 'center',
  },
  levelProgress: {
    color: COLORS.textSecondary,
    fontSize: SIZES.body5,
    marginTop: 2,
    textAlign: 'center',
  },
  pathContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pathSvg: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
  levelCard: {
    width: 120,
    alignItems: 'center',
    borderWidth: 3,
    borderRadius: 60,
    padding: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
});
