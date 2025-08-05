import { Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { componentStyles } from '@/styles';

interface RememberMeCheckboxProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
}

export const RememberMeCheckbox = ({
  onValueChange,
  value,
  disabled = false,
}: RememberMeCheckboxProps) => {
  return (
    <TouchableOpacity
      style={componentStyles.rememberMeContainer}
      onPress={() => onValueChange(!value)}
      disabled={disabled}
    >
      <View
        style={[
          componentStyles.checkbox,
          value && componentStyles.checkboxActive,
        ]}
      >
        {value && <Ionicons name="checkmark" size={16} color="#ffffff" />}
      </View>
      <Text style={componentStyles.rememberMeText}>
        Remember me for 30 days
      </Text>
    </TouchableOpacity>
  );
};
