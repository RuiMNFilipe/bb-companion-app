import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Collapsible from 'react-native-collapsible';

interface AccordionProps {
  title: string;
  subtitle: string;
  content: string;
  isCollapsed: boolean;
  onPress: () => void;
}

export const Accordion = ({
  title,
  subtitle,
  content,
  isCollapsed,
  onPress,
}: AccordionProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPressOut={onPress} style={styles.header}>
        <Text style={styles.headerTitleText}>{title}</Text>
        <Text style={styles.headerSubtitleText}>{subtitle}</Text>
      </TouchableOpacity>
      <Collapsible collapsed={isCollapsed}>
        <View style={styles.content}>
          <Text>{content}</Text>
        </View>
      </Collapsible>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ddd',
    borderWidth: 1,
    borderColor: '#f9f9f9',
    borderRadius: 5,
  },
  header: {
    padding: 15,
    backgroundColor: '#e0e0e0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitleText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerSubtitleText: {
    fontSize: 14,
    fontWeight: 'light',
    color: 'rgba(0,0,0,0.5)',
  },
  content: {
    padding: 15,
    backgroundColor: '#fff',
  },
});
