import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { AnalogySlide } from './AnalogySlide';
import CaseStudySlide from './CaseStudySlide';
import CompareSlide from './CompareSlide';
import { ConceptSlide } from './ConceptSlide';
import { ExampleSlide } from './ExampleSlide';
import GlossarySlide from './GlossarySlide';
import IntroSlide from './IntroSlide';
import MotivationalSlide from './MotivationalSlide';
import { MythBusterSlide } from './MythBusterSlide';
import QuizStartSlide from './QuizStartSlide';

const SLIDE_TYPE_MAP: Record<string, any> = {
  introSlide: IntroSlide,
  conceptSlide: ConceptSlide,
  exampleSlide: ExampleSlide,
  compareSlide: CompareSlide,
  analogySlide: AnalogySlide,
  'Case Study Slide': CaseStudySlide,
  'Myth Buster Slide': MythBusterSlide, // Add this line
  mythBusterSlide: MythBusterSlide, // Also support camelCase
  glossarySlide: GlossarySlide,
  'Glossary Slide': GlossarySlide,
  motivationalSlide: MotivationalSlide,
  'Motivational Slide': MotivationalSlide,
  quizStartSlide: QuizStartSlide,
  'Quiz Start Slide': QuizStartSlide,
  // Add more mappings as needed
};

export default function DynamicSlide() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const slideIndex = parseInt(params.slideIndex as string, 10) || 0;
  const [lesson, setLesson] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch lesson data from JSON server lessons endpoint
    fetch('http://192.168.0.145:3004/lessons/1')
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(data => {
        console.log('Fetched lesson:', data);
        setLesson(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch lesson data: ' + err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' color='#fff' />
      </View>
    );
  }

  if (error) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 24,
        }}
      >
        <Text style={{ color: 'red', fontSize: 16, textAlign: 'center' }}>
          {error}
        </Text>
      </View>
    );
  }

  const slides = lesson.slides || [];
  const slide = slides[slideIndex];
  if (!slide) {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }
  const SlideComponent = SLIDE_TYPE_MAP[slide.type];
  if (!SlideComponent) {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }

  const handlePrev = () => {
    if (slideIndex > 0) {
      router.replace({
        pathname: '/(app)/_(lessons)/slides/[slideIndex]',
        params: { slideIndex: slideIndex - 1 },
      });
    }
  };
  const handleNext = () => {
    if (slideIndex < slides.length - 1) {
      router.replace({
        pathname: '/(app)/_(lessons)/slides/[slideIndex]',
        params: { slideIndex: slideIndex + 1 },
      });
    }
  };

  return (
    <SlideComponent
      {...slide.content}
      xp={slide.xpReward}
      slide={slide.slideNumber}
      totalSlides={slides.length}
      onPrev={handlePrev}
      onNext={handleNext}
      lessonTitle={slide.content.lessonTitle}
      moduleTitle={lesson.moduleTitle}
      chapterTitle={lesson.chapterTitle}
      points={slide.content.points}
      funFact={slide.content.funFact}
      teacherNote={slide.content.teacherNote}
      tabs={slide.content.tabs}
      introduction={slide.content.introduction}
      analogyStatement={slide.content.analogyStatement}
      analogyIcon={slide.content.analogyIcon}
      images={slide.content.images}
      table={slide.content.table}
      tableImage={slide.content.tableImage}
      noteIcon={slide.content.noteIcon}
      noteImage={slide.content.noteImage}
    />
  );
}
