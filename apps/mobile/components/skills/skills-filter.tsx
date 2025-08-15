import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Skill } from '@bb-companion/database';
import { capitalize } from '@/utils';

interface SkillsFilterProps {
  skills: Skill[];
  onCategoryPress: (category: string) => void;
  onLetterPress: (letter: string) => void;
  selectedCategory?: string;
  selectedLetter?: string;
}

export const SkillsFilter = ({
  skills,
  onCategoryPress,
  onLetterPress,
  selectedCategory = 'All',
  selectedLetter = 'All',
}: SkillsFilterProps) => {
  const categories = skills.map((skill) =>
    capitalize(skill.category.toString()),
  );

  const categoriesSet = new Set(categories);
  const uniqueCategories = ['All', ...categoriesSet];

  const lettersToFilterBy = Array.from(
    new Set(skills.map((skill) => skill.name.charAt(0).toUpperCase()).sort()),
  );

  return (
    <View style={styles.container}>
      {/* Category Filter Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Filter by Category:</Text>
        <View style={styles.buttonContainer}>
          {uniqueCategories.map((category) => (
            <TouchableOpacity
              style={[
                styles.button,
                selectedCategory === category && styles.selectedButton,
              ]}
              onPress={() => onCategoryPress(category)}
              key={category}
            >
              <Text
                style={[
                  styles.buttonText,
                  selectedCategory === category && styles.selectedButtonText,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Letter Filter Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Filter by Letter:</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              selectedLetter === 'All' && styles.selectedButton,
            ]}
            onPress={() => onLetterPress('All')}
          >
            <Text
              style={[
                styles.buttonText,
                selectedLetter === 'All' && styles.selectedButtonText,
              ]}
            >
              All
            </Text>
          </TouchableOpacity>
          {lettersToFilterBy.map((letter) => (
            <TouchableOpacity
              style={[
                styles.button,
                selectedLetter === letter && styles.selectedButton,
              ]}
              onPress={() => {
                onLetterPress(letter);
              }}
              key={letter}
            >
              <Text
                style={[
                  styles.buttonText,
                  selectedLetter === letter && styles.selectedButtonText,
                ]}
              >
                {letter}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: 8,
    rowGap: 8,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#e0e0e0',
    borderRadius: 16,
  },
  selectedButton: {
    backgroundColor: '#007AFF',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  selectedButtonText: {
    color: '#fff',
  },
});
