import { Text, View } from 'react-native';

import { componentStyles } from '@/styles';
import { usePasswordRequirements, usePasswordStrength } from '@/hooks';

interface PasswordStrengthIndicatorProps {
  password: string;
}

export const PasswordStrengthIndicator = ({
  password,
}: PasswordStrengthIndicatorProps) => {
  const passwordStrength = usePasswordStrength(password);
  const requirements = usePasswordRequirements(password);

  if (!password) return null;

  return (
    <View style={componentStyles.passwordStrengthContainer}>
      <View style={componentStyles.passwordStrengthHeader}>
        <Text style={componentStyles.passwordStrengthLabel}>
          Password Strength
        </Text>
        <Text
          style={[
            componentStyles.passwordStrengthValue,
            { color: passwordStrength.color },
          ]}
        >
          {passwordStrength.label}
        </Text>
      </View>
      <View style={componentStyles.passwordStrengthBar}>
        <View
          style={[
            componentStyles.passwordStrengthFill,
            {
              width: `${(passwordStrength.strength / 5) * 100}%`,
              backgroundColor: passwordStrength.color,
            },
          ]}
        />
      </View>
      <View style={componentStyles.passwordRequirements}>
        <Text style={componentStyles.requirementText}>
          Password should contain:
        </Text>
        <Text
          style={[
            componentStyles.requirementItem,
            requirements.hasLowercase && componentStyles.requirementMet,
          ]}
        >
          • At least one lowercase letter
        </Text>
        <Text
          style={[
            componentStyles.requirementItem,
            requirements.hasUppercase && componentStyles.requirementMet,
          ]}
        >
          • At least one uppercase letter
        </Text>
        <Text
          style={[
            componentStyles.requirementItem,
            requirements.hasNumber && componentStyles.requirementMet,
          ]}
        >
          • At least one number
        </Text>
        <Text
          style={[
            componentStyles.requirementItem,
            requirements.hasMinLength && componentStyles.requirementMet,
          ]}
        >
          • At least 8 characters long
        </Text>
      </View>
    </View>
  );
};
