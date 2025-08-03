import {
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Control, Controller } from 'react-hook-form';

import { componentStyles } from '@/styles';
import { FormData } from '@/types';

interface ControlledInputProps {
  name: keyof FormData;
  control: Control<FormData>;
  placeholder: string;
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  secureTextEntry?: boolean;
  keyboardType?: TextInputProps['keyboardType'];
  autoCapitalize?: TextInputProps['autoCapitalize'];
  error?: string;
  editable?: boolean;
  showPasswordToggle?: boolean;
  onTogglePassword?: () => void;
  showPassword?: boolean;
}

export const ControlledInput = ({
  control,
  icon,
  label,
  name,
  placeholder,
  autoCapitalize,
  editable,
  error,
  keyboardType,
  onTogglePassword,
  secureTextEntry,
  showPassword,
  showPasswordToggle,
}: ControlledInputProps) => {
  return (
    <View style={componentStyles.inputContainer}>
      <Text style={componentStyles.inputLabel}>{label}</Text>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <View
            style={[
              componentStyles.inputWrapper,
              error && componentStyles.inputError,
            ]}
          >
            <Ionicons
              name={icon}
              size={20}
              color={error ? '#ff6b6b' : '#8e8e93'}
              style={componentStyles.inputIcon}
            />
            <TextInput
              placeholder={placeholder}
              placeholderTextColor="#8e8e93"
              value={value as unknown as string}
              onChangeText={onChange}
              onBlur={onBlur}
              secureTextEntry={secureTextEntry && !showPassword}
              keyboardType={keyboardType}
              autoCapitalize={autoCapitalize}
              autoCorrect={false}
              editable={editable}
              style={componentStyles.textInput}
            />
            {showPasswordToggle && onTogglePassword && (
              <TouchableOpacity
                onPress={onTogglePassword}
                disabled={!editable}
                style={componentStyles.eyeIcon}
              >
                <Ionicons
                  name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                  size={20}
                  color="#8e8e93"
                />
              </TouchableOpacity>
            )}
          </View>
        )}
      />
      {error && (
        <View style={componentStyles.errorContainer}>
          <Ionicons name="alert-circle-outline" size={14} color="#ff6b6b" />
          <Text style={componentStyles.errorText}>{error}</Text>
        </View>
      )}
    </View>
  );
};
