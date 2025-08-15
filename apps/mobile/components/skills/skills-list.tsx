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
import { useMemo, useState } from 'react';
import { SkillsFilter } from './skills-filter';
import { Skill } from '@bb-companion/database';

const DEFAULT_FILTER = 'All' as const;

export const SkillsList = () => {
  const { allSkills: skills, isAllSkillsLoading: isLoading } = useSkills();
  const [openAccordionId, setOpenAccordionId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] =
    useState<string>(DEFAULT_FILTER);
  const [selectedLetter, setSelectedLetter] = useState<string>(DEFAULT_FILTER);

  const handleAccordionPress = (id: string) => {
    setOpenAccordionId(openAccordionId === id ? null : id);
  };

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

  const renderSkillItem = ({ item: skill }: { item: Skill }) => (
    <Accordion
      key={skill.id}
      title={skill.name}
      subtitle={capitalize(skill.category)}
      content={skill.description}
      onPress={() => handleAccordionPress(skill.id)}
      isCollapsed={openAccordionId !== skill.id}
    />
  );

  const renderSectionHeader = ({
    section,
  }: {
    section: { title: string; data: Skill[] };
  }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionHeaderText}>{section.title}</Text>
    </View>
  );

  const renderSectionSeparator = () => <View style={styles.sectionSeparator} />;

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
        keyExtractor={(skill) => skill.id}
        renderItem={renderSkillItem}
        renderSectionHeader={renderSectionHeader}
        renderSectionFooter={renderSectionSeparator}
        style={styles.sectionList}
        contentContainerStyle={styles.sectionListContent}
        showsVerticalScrollIndicator={true}
        stickySectionHeadersEnabled={true} // Headers stick to top when scrolling
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
