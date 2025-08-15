import { useSkills } from '@/hooks/use-skills';
import { capitalize } from '@/utils';
import {
  ActivityIndicator,
  SectionList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Accordion } from '../accordion';
import { memo, useCallback, useMemo, useState } from 'react';
import { SkillsFilter } from './skills-filter';
import { Skill } from '@bb-companion/database';

const DEFAULT_FILTER = 'All' as const;

interface SkillSection {
  title: string;
  data: Skill[];
}

const SkillItem = memo(
  ({
    skill,
    isCollapsed,
    onPress,
  }: {
    skill: Skill;
    onPress: () => void;
    isCollapsed: boolean;
  }) => (
    <Accordion
      key={skill.id}
      title={skill.name}
      subtitle={capitalize(skill.category)}
      content={skill.description}
      onPress={onPress}
      isCollapsed={isCollapsed}
    />
  ),
);
SkillItem.displayName = 'Skill item';

const SectionHeader = memo(({ section }: { section: SkillSection }) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionHeaderText}>{section.title}</Text>
  </View>
));
SectionHeader.displayName = 'Section header';

const SectionSeparator = memo(() => <View style={styles.sectionSeparator} />);
SectionSeparator.displayName = 'Section Separator';

export const SkillsList = () => {
  const { allSkills: skills, isAllSkillsLoading: isLoading } = useSkills();
  const [openAccordionId, setOpenAccordionId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] =
    useState<string>(DEFAULT_FILTER);
  const [selectedLetter, setSelectedLetter] = useState<string>(DEFAULT_FILTER);

  const handleAccordionPress = useCallback((id: string) => {
    setOpenAccordionId((prev) => (prev === id ? null : id));
  }, []);

  const skillSections = useMemo(() => {
    if (!skills || skills.length === 0) return [];

    let filtered = skills;

    if (selectedCategory !== DEFAULT_FILTER) {
      filtered = filtered.filter(
        (skill) => capitalize(skill.category.toString()) === selectedCategory,
      );
    }

    if (selectedLetter !== DEFAULT_FILTER) {
      filtered = filtered.filter(
        (skill) => skill.name.charAt(0).toUpperCase() === selectedLetter,
      );
    }

    const groupedSkills = filtered.reduce(
      (acc, skill) => {
        const firstLetter = skill.name.charAt(0).toUpperCase();
        if (!acc[firstLetter]) {
          acc[firstLetter] = [];
        }
        acc[firstLetter].push(skill);
        return acc;
      },
      {} as Record<string, Skill[]>,
    );

    const sections: { title: string; data: Skill[] }[] = Object.keys(
      groupedSkills,
    )
      .sort()
      .map((letter) => ({
        title: letter,
        data: groupedSkills[letter].sort((a, b) =>
          a.name.localeCompare(b.name),
        ),
      }));

    return sections;
  }, [skills, selectedCategory, selectedLetter]);

  const renderSkillItem = useCallback(
    ({ item: skill }: { item: Skill }) => {
      const handlePress = () => handleAccordionPress(skill.id);
      return (
        <SkillItem
          skill={skill}
          onPress={handlePress}
          isCollapsed={openAccordionId !== skill.id}
        />
      );
    },
    [handleAccordionPress, openAccordionId],
  );

  const renderSectionHeader = useCallback(
    ({ section }: { section: SkillSection }) => (
      <SectionHeader section={section} />
    ),
    [],
  );

  const renderSectionSeparator = useCallback(() => <SectionSeparator />, []);

  const keyExtractor = useCallback((skill: Skill) => skill.id, []);

  if (!skills || skills.length === 0 || typeof skills === 'undefined') {
    return null;
  }

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const handleCategoryPress = (category: string) => {
    setSelectedCategory(category);
  };

  const handleLetterPress = (letter: string) => {
    setSelectedLetter(letter);
  };

  return (
    <View style={{ flex: 1 }}>
      <SkillsFilter
        skills={skills}
        onCategoryPress={handleCategoryPress}
        onLetterPress={handleLetterPress}
        selectedCategory={selectedCategory}
        selectedLetter={selectedLetter}
      />
      <SectionList
        sections={skillSections}
        keyExtractor={keyExtractor}
        renderItem={renderSkillItem}
        renderSectionHeader={renderSectionHeader}
        renderSectionFooter={renderSectionSeparator}
        style={styles.sectionList}
        contentContainerStyle={styles.sectionListContent}
        showsVerticalScrollIndicator={true}
        stickySectionHeadersEnabled={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionList: {
    flex: 1,
  },
  sectionListContent: {
    paddingBottom: 20,
  },
  sectionHeader: {
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionHeaderText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#495057',
  },
  sectionSeparator: {
    height: 8,
    backgroundColor: '#f8f9fa',
  },
});
