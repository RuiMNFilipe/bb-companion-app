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
import { forwardRef } from 'react';

interface ControlledInputProps {
  name: string;
  control: Control<any>;
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
  returnKeyType?: TextInputProps['returnKeyType'];
  onSubmitEditing?: TextInputProps['onSubmitEditing'];
}

export const ControlledInput = forwardRef<TextInput, ControlledInputProps>(
  (
    {
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
      returnKeyType,
      onSubmitEditing,
    },
    ref,
  ) => {
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
                ref={ref}
                placeholder={placeholder}
                placeholderTextColor="#8e8e93"
                value={value || ''}
                onChangeText={onChange}
                onBlur={onBlur}
                secureTextEntry={secureTextEntry && !showPassword}
                keyboardType={keyboardType}
                autoCapitalize={autoCapitalize}
                autoCorrect={false}
                editable={editable}
                style={componentStyles.textInput}
                returnKeyType={returnKeyType}
                onSubmitEditing={onSubmitEditing}
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
  },
);

ControlledInput.displayName = 'ControlledInput';
