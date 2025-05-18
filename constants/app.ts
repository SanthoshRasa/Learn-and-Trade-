export const APP_NAME = 'Learn and Trade';

export const USER_LEVELS = {
  NOVICE_APPRENTICE: {
    id: 1,
    name: 'Novice Apprentice',
    requiredPoints: 0,
  },
  MARKET_EXPLORER: {
    id: 2,
    name: 'Market Explorer',
    requiredPoints: 1000,
  },
  CHART_STRATEGIST: {
    id: 3,
    name: 'Chart Strategist',
    requiredPoints: 2500,
  },
  TRADING_EXPERT: {
    id: 4,
    name: 'Trading Expert',
    requiredPoints: 5000,
  },
  CRYPTO_CONQUEROR: {
    id: 5,
    name: 'Crypto Conqueror',
    requiredPoints: 10000,
  },
  MASTER_INVESTOR: {
    id: 6,
    name: 'Master Investor',
    requiredPoints: 20000,
  },
};

export const MARKETS = {
  STOCKS: {
    id: 'stocks',
    name: 'Stocks',
    icon: '📈',
  },
  FOREX: {
    id: 'forex',
    name: 'Forex',
    icon: '💱',
  },
  CRYPTO: {
    id: 'crypto',
    name: 'Cryptocurrency',
    icon: '₿',
  },
  COMMODITIES: {
    id: 'commodities',
    name: 'Commodities',
    icon: '🪙',
  },
};

export const QUIZ_SETTINGS = {
  MIN_PASS_SCORE: 70,
  QUESTIONS_PER_QUIZ: 10,
  TIME_PER_QUESTION: 30, // seconds
};

export const SIMULATION_SETTINGS = {
  INITIAL_BALANCE: 10000,
  MIN_TRADE_AMOUNT: 100,
  MAX_TRADE_AMOUNT: 1000,
};

export const REWARDS = {
  QUIZ_COMPLETION: 50,
  LESSON_COMPLETION: 100,
  DAILY_CHALLENGE: 200,
  LEVEL_UP: 500,
};

export const SUBSCRIPTION_PLANS = {
  FREE: {
    id: 'free',
    name: 'Free',
    price: 0,
    features: [
      'Basic lessons',
      'Limited quizzes',
      'Pre-set simulations',
      'Basic leaderboard access',
    ],
  },
  PREMIUM: {
    id: 'premium',
    name: 'Premium',
    price: 4.99,
    features: [
      'All lessons',
      'Unlimited quizzes',
      'Real-time simulations',
      'Full leaderboard access',
      'Advanced analytics',
      'Ad-free experience',
    ],
  },
};

export const ACHIEVEMENTS = {
  FIRST_LESSON: {
    id: 'first_lesson',
    name: 'First Steps',
    description: 'Complete your first lesson',
    points: 100,
  },
  QUIZ_MASTER: {
    id: 'quiz_master',
    name: 'Quiz Master',
    description: 'Score 100% on any quiz',
    points: 200,
  },
  TRADING_PRO: {
    id: 'trading_pro',
    name: 'Trading Pro',
    description: 'Make 10 successful trades in simulation',
    points: 300,
  },
  // Add more achievements as needed
};

export const DAILY_CHALLENGES = {
  COMPLETE_LESSON: {
    id: 'complete_lesson',
    name: 'Lesson Learner',
    description: 'Complete one lesson',
    reward: 50,
  },
  PASS_QUIZ: {
    id: 'pass_quiz',
    name: 'Quiz Champion',
    description: 'Pass one quiz',
    reward: 75,
  },
  MAKE_TRADE: {
    id: 'make_trade',
    name: 'Active Trader',
    description: 'Make one trade in simulation',
    reward: 100,
  },
}; 