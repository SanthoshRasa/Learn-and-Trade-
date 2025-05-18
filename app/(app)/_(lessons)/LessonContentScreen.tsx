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
import { COLORS, SIZES } from '../../../constants/theme';

export default function LessonContentScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ lessonId: string }>();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  // TODO: Fetch lesson content based on lessonId
  const lessonContent = {
    title: 'What is Trading vs. Investing',
    content: 'This is a placeholder for the lesson content...',
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: isDark ? COLORS.backgroundDark : COLORS.background,
      }}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons
            name='arrow-back'
            size={28}
            color={isDark ? COLORS.textDark : COLORS.text}
          />
        </TouchableOpacity>
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text
            style={[
              styles.headerTitle,
              { color: isDark ? COLORS.textDark : COLORS.text },
            ]}
          >
            {lessonContent.title}
          </Text>
        </View>
      </View>

      {/* Content */}
      <ScrollView style={styles.content}>
        <Text
          style={[
            styles.contentText,
            { color: isDark ? COLORS.textDark : COLORS.text },
          ]}
        >
          {lessonContent.content}
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitle: {
    fontSize: SIZES.h2,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  contentText: {
    fontSize: SIZES.body3,
    lineHeight: 24,
  },
});
