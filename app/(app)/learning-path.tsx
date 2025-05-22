import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  Modal,
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
import { COLORS, SIZES, SPACING } from '../../constants/theme';

const { width } = Dimensions.get('window');

const MOCK_USER = {
  avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=trader',
  name: 'TradingLearner',
  streak: 5,
  coins: 1240,
  badges: 2,
};

// LEVELS will be fetched from the server

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
  loading,
  onModulePress,
}: {
  visible: boolean;
  onClose: () => void;
  levelTitle: string;
  description: string;
  xpReward: number;
  modules: Module[];
  loading?: boolean;
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
              color: '#fff',
              fontWeight: 'bold',
              fontSize: 18,
              marginTop: 18,
              marginBottom: 8,
            }}
          >
            Modules
          </Text>
          {loading ? (
            <View
              style={{
                height: 80,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={{ color: isDark ? '#fff' : '#000' }}>
                Loading modules...
              </Text>
            </View>
          ) : (
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
                      color: '#fff',
                      fontWeight:
                        module.status === 'inprogress' ? 'bold' : 'normal',
                    }}
                  >
                    {module.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
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

// Dynamically calculate node positions for all levels
function getNodePositions(levels: any[]) {
  const nodeSpacing = 140; // vertical space between nodes
  const leftX = width * 0.25;
  const rightX = width * 0.75;
  return levels.map((level, idx) => ({
    x: idx % 2 === 0 ? leftX : rightX,
    y: 80 + idx * nodeSpacing,
  }));
}

// Generate a smooth SVG path connecting all nodes
function getSmoothPath(points: { x: number; y: number }[]) {
  if (points.length < 2) return '';
  let d = `M${points[0].x},${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const cpx = (prev.x + curr.x) / 2;
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
  const [selectedLevel, setSelectedLevel] = useState<any | null>(null);
  const [levels, setLevels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modules, setModules] = useState<Module[]>([]);
  const [modulesLoading, setModulesLoading] = useState(false);

  useEffect(() => {
    fetch('http://192.168.0.145:3002/learningPath')
      .then(res => res.json())
      .then(data => {
        setLevels(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // Path curve points for SVG (mocked for 4 levels)
  const nodePositions = getNodePositions(levels) as any[];
  const svgHeight = nodePositions.length
    ? nodePositions[nodePositions.length - 1].y + 100
    : 800; // fallback
  const pathD = `M${width / 2},80
    Q${width * 0.8},200 ${width / 2},320
    Q${width * 0.2},440 ${width / 2},560
    Q${width * 0.8},680 ${width / 2},800`;

  // Handler for tapping a level
  const handleLevelPress = async (level: any) => {
    if (level.state === 'locked') return;
    setSelectedLevel(level);
    setShowModulesModal(true);
    setModulesLoading(true);
    try {
      // Replace with your local IP if needed
      const res = await fetch(
        `http://192.168.0.145:3002/modules?levelId=${level.id}`
      );
      let data = await res.json();
      // For testing: unlock all modules (set status to 'inprogress')
      data = data.map((mod: any) => ({ ...mod, status: 'inprogress' }));
      setModules(data);
    } catch (err) {
      setModules([]);
    }
    setModulesLoading(false);
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
      {/* Custom Header */}
      <View
        style={{
          backgroundColor: '#232B3B',
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          borderBottomLeftRadius: 12,
          borderBottomRightRadius: 12,
          marginTop: 0,
          paddingTop: 0,
          paddingBottom: SPACING.lg,
          marginLeft: 0,
          marginRight: 0,
          paddingHorizontal: 16,
          flexDirection: 'column',
          shadowColor: '#000',
          shadowOpacity: 0.08,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: 2 },
          elevation: 2,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={{ marginRight: 10 }}
          >
            <Ionicons name='arrow-back' size={24} color='#fff' />
          </TouchableOpacity>
          <Image
            source={{ uri: MOCK_USER.avatar }}
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: '#fff',
              marginRight: 10,
            }}
          />
          <Text
            style={{ color: '#fff', fontWeight: 'bold', fontSize: 18, flex: 1 }}
          >
            {MOCK_USER.name}
          </Text>
          <Ionicons
            name='flame'
            size={16}
            color='#fff'
            style={{ marginRight: 2 }}
          />
          <Text style={{ color: '#fff', fontWeight: 'bold', marginRight: 10 }}>
            {MOCK_USER.streak}
          </Text>
          <Ionicons
            name='logo-bitcoin'
            size={16}
            color='#fff'
            style={{ marginRight: 2 }}
          />
          <Text style={{ color: '#fff', fontWeight: 'bold', marginRight: 10 }}>
            {MOCK_USER.coins.toLocaleString()}
          </Text>
          <Ionicons
            name='star'
            size={16}
            color='#fff'
            style={{ marginRight: 2 }}
          />
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>8,900</Text>
        </View>
        <View
          style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}
        >
          <Ionicons
            name='flash'
            size={16}
            color='#fff'
            style={{ marginRight: 4 }}
          />
          <Text style={{ color: '#fff' }}>3-day streak!</Text>
          <Ionicons
            name='medal'
            size={16}
            color='#fff'
            style={{ marginLeft: 16, marginRight: 4 }}
          />
          <Text style={{ color: '#fff' }}>{MOCK_USER.badges} badges</Text>
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
        <View style={[styles.pathContainer, { minHeight: svgHeight }]}>
          {levels.length > 0 && (
            <>
              {(() => {
                const nodePositions = getNodePositions(levels) as any[];
                const svgHeight =
                  nodePositions[nodePositions.length - 1].y + 100;
                const pathD = getSmoothPath(nodePositions);
                return (
                  <Svg height={svgHeight} width={width} style={styles.pathSvg}>
                    {/* Main road path */}
                    <Path
                      d={pathD}
                      stroke={COLORS.primary}
                      strokeWidth={10}
                      fill='none'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      opacity={0.18}
                    />
                    {/* Center line */}
                    <Path
                      d={pathD}
                      stroke={COLORS.primary}
                      strokeWidth={4}
                      fill='none'
                      strokeDasharray='12,8'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </Svg>
                );
              })()}
              {(() => {
                const nodePositions = getNodePositions(levels) as any[];
                return (levels as any[]).map((level: any, idx: number) => {
                  const pos = nodePositions[idx];
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
                            borderColor: COLORS.primary,
                            borderWidth: 4,
                            shadowColor: COLORS.primary,
                            shadowOpacity: 0.15,
                            shadowRadius: 12,
                            elevation: 4,
                          },
                        ]}
                        onPress={() => handleLevelPress(level)}
                        activeOpacity={0.8}
                      >
                        <View style={styles.levelAvatarWrap}>
                          <Ionicons
                            name='star'
                            size={40}
                            color={COLORS.primary}
                          />
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
                              color: isDark
                                ? COLORS.textSecondaryDark
                                : COLORS.textSecondary,
                              fontWeight: 'bold',
                              textAlign: 'center',
                              fontSize: 13,
                            },
                          ]}
                        >
                          {level.modules} modules
                        </Text>
                      </TouchableOpacity>
                    </Animated.View>
                  );
                });
              })()}
            </>
          )}
          {loading && (
            <Text
              style={{
                color: isDark ? '#fff' : '#000',
                textAlign: 'center',
                marginTop: 32,
              }}
            >
              Loading...
            </Text>
          )}
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
          modules={modules}
          loading={modulesLoading}
          onModulePress={module => {
            // Navigation logic for unlocked module
            if (module.status !== 'locked') {
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
