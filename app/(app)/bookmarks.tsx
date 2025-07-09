import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchBookmarks = async () => {
      const allKeys = await AsyncStorage.getAllKeys();
      const bookmarkKeys = allKeys.filter(k => k.startsWith('bookmark_'));
      const bookmarkEntries = await AsyncStorage.multiGet(bookmarkKeys);
      // Parse keys: bookmark_{lessonId}_{slide}
      const parsed = bookmarkEntries.map(([key, val]) => {
        const [, lessonId, slide] = key.split('_');
        return { lessonId, slide: Number(slide) };
      });
      setBookmarks(parsed);
      setLoading(false);
    };
    fetchBookmarks();
  }, []);

  const handleGoToSlide = (lessonId: string, slide: number) => {
    router.replace({
      pathname: '/(app)/_(lessons)/slides/[slideIndex]',
      params: { slideIndex: slide - 1 },
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#181A20', padding: 18 }}>
      <Text
        style={{
          color: '#fff',
          fontSize: 22,
          fontWeight: 'bold',
          marginBottom: 18,
        }}
      >
        Bookmarks
      </Text>
      {loading ? (
        <Text style={{ color: '#fff' }}>Loading...</Text>
      ) : bookmarks.length === 0 ? (
        <Text style={{ color: '#aaa' }}>No bookmarks yet.</Text>
      ) : (
        <ScrollView>
          {bookmarks.map((bm, idx) => (
            <TouchableOpacity
              key={idx}
              style={{
                backgroundColor: '#232B3B',
                borderRadius: 10,
                padding: 16,
                marginBottom: 12,
              }}
              onPress={() => handleGoToSlide(bm.lessonId, bm.slide)}
            >
              <Text style={{ color: '#fff', fontSize: 16 }}>
                Bookmarked Slide: {bm.slide} (Lesson {bm.lessonId})
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
}
