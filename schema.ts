import { boolean, integer, pgEnum, pgTable, serial, text, timestamp, unique, varchar } from 'drizzle-orm/pg-core';

// Enums
export const progressStatusEnum = pgEnum('progress_status', ['locked', 'inprogress', 'completed']);

// Users
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  name: varchar('name', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Learning Paths
export const learningPaths = pgTable('learning_paths', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  modulesCount: integer('modules_count').notNull(),
});

// Modules
export const modules = pgTable('modules', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  learningPathId: integer('learning_path_id').references(() => learningPaths.id).notNull(),
  order: integer('order').notNull(),
});

// Lessons
export const lessons = pgTable('lessons', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  moduleId: integer('module_id').references(() => modules.id).notNull(),
  order: integer('order').notNull(),
});

// User Progress
export const userProgress = pgTable('user_progress', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  lessonId: integer('lesson_id').references(() => lessons.id).notNull(),
  status: progressStatusEnum('status').notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  uniqueUserLesson: unique().on(table.userId, table.lessonId),
}));

// Quizzes
export const quizzes = pgTable('quizzes', {
  id: serial('id').primaryKey(),
  lessonId: integer('lesson_id').references(() => lessons.id).notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
});

// Quiz Questions
export const quizQuestions = pgTable('quiz_questions', {
  id: serial('id').primaryKey(),
  quizId: integer('quiz_id').references(() => quizzes.id).notNull(),
  questionText: text('question_text').notNull(),
});

// Quiz Options
export const quizOptions = pgTable('quiz_options', {
  id: serial('id').primaryKey(),
  questionId: integer('question_id').references(() => quizQuestions.id).notNull(),
  optionText: text('option_text').notNull(),
  isCorrect: boolean('is_correct').notNull(),
});

// User Quiz Attempts
export const userQuizAttempts = pgTable('user_quiz_attempts', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  quizId: integer('quiz_id').references(() => quizzes.id).notNull(),
  score: integer('score').notNull(),
  completedAt: timestamp('completed_at').defaultNow().notNull(),
});

// Leaderboard
export const leaderboard = pgTable('leaderboard', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull().unique(),
  score: integer('score').notNull(),
  rank: integer('rank').notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}); 