import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';

import { componentStyles } from '@/styles';

interface LoadingButtonProps {
  onPress: () => void;
  disabled: boolean;
  isLoading: boolean;
  title: string;
  loadingTitle: string;
}

export const LoadingButton = ({
  disabled,
  isLoading,
  loadingTitle,
  onPress,
  title,
}: LoadingButtonProps) => {
  return (
    <TouchableOpacity
      style={[
        componentStyles.submitButton,
        disabled && componentStyles.submitButtonDisabled,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      {isLoading ? (
        <View style={componentStyles.loadingContainer}>
          <ActivityIndicator size="small" color="#ffffff" />
          <Text style={componentStyles.loadingText}>{loadingTitle}</Text>
        </View>
      ) : (
        <Text style={componentStyles.submitButtonText}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};
