import { useState } from 'react';
import {
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Control, Controller, FieldErrors, useForm } from 'react-hook-form';

import {
  ControlledInput,
  LoadingButton,
  PasswordStrengthIndicator,
  RememberMeCheckbox,
} from '@/components';
import { authStyles, componentStyles } from '@/styles';
import { loginSchema, signUpSchema } from '@/schemas';
import { AuthScreenProps, LoginFormData, SignUpFormData } from '@/types';

export const AuthScreen = ({
  onLogin = async () => {},
  onSignUp = async () => {},
  isLoading = false,
}: AuthScreenProps) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    mode: 'onBlur',
  });

  const signUpForm = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onBlur',
  });

  const currentForm = isLoginMode ? loginForm : signUpForm;

  const {
    handleSubmit,
    control,
    formState: { errors, isValid, isDirty },
  } = currentForm;

  const watchedPassword = !isLoginMode && signUpForm.watch('password');

  const handleFormSubmit = async (
    data: LoginFormData | SignUpFormData,
  ): Promise<void> => {
    try {
      if (isLoginMode) {
        await onLogin(data as LoginFormData);
      } else {
        const { confirmPassword: _cPassword, ...signUpData } =
          data as SignUpFormData;
        await onSignUp(signUpData);
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Something went wrong. Please try again.';
      Alert.alert(
        isLoginMode ? 'Login Failed' : 'Sign Up Failed',
        errorMessage,
      );
    }
  };

  const toggleMode = (): void => {
    setIsLoginMode(!isLoginMode);
    setShowPassword(false);
    setShowConfirmPassword(false);

    if (isLoginMode) {
      loginForm.reset();
    } else {
      signUpForm.reset();
    }
  };

  const handleForgotPassword = (): void => {
    Alert.alert('Forgot Password', 'Password reset functionality coming soon!');
  };

  const isSubmitDisabled: boolean = !isValid || !isDirty || !isLoading;

  return (
    <SafeAreaView style={authStyles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={authStyles.keyboardAvoidingView}
      >
        <ScrollView
          contentContainerStyle={authStyles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={authStyles.header}>
            <View style={authStyles.logoContainer}>
              <View style={authStyles.logoIcon}>
                <Text style={authStyles.logoText}>🏈</Text>
                <Text style={authStyles.appTitle}>Blood Bowl</Text>
                <Text style={authStyles.appSubtitle}>Companion</Text>
              </View>

              <Text style={authStyles.welcomeText}>
                {isLoginMode ? 'Welcome back, Coach!' : 'Join the league!'}
              </Text>
              <Text style={authStyles.descriptionText}>
                {isLoginMode
                  ? 'Sign in to manage your teams and track your victories'
                  : 'Create your account and start building legendary teams'}
              </Text>
            </View>
            <View style={authStyles.formContainer}>
              {!isLoginMode && (
                <ControlledInput
                  name="username"
                  control={control as Control<SignUpFormData>}
                  label="Username"
                  placeholder="Enter your username"
                  icon="person-outline"
                  error={
                    (errors as FieldErrors<SignUpFormData>).username?.message
                  }
                  editable={!isLoading}
                  autoCapitalize="none"
                />
              )}

              <ControlledInput
                name="email"
                control={control as Control<SignUpFormData>}
                label="Email"
                placeholder="Enter your email"
                icon="mail-outline"
                keyboardType="email-address"
                error={errors.password?.message}
                editable={!isLoading}
                autoCapitalize="none"
              />

              <ControlledInput
                name="password"
                control={control as Control<SignUpFormData>}
                label="Password"
                placeholder="Enter your password"
                icon="lock-closed-outline"
                secureTextEntry={true}
                showPasswordToggle={true}
                showPassword={showPassword}
                onTogglePassword={() => setShowPassword(!showPassword)}
                error={errors.password?.message}
                editable={!isLoading}
              />

              {!isLoginMode && (
                <PasswordStrengthIndicator
                  password={watchedPassword as string}
                />
              )}

              {!isLoginMode && (
                <ControlledInput
                  name="confirmPassword"
                  control={control as Control<SignUpFormData>}
                  label="Confirm Password"
                  placeholder="Confirm your password"
                  icon="lock-closed-outline"
                  secureTextEntry={true}
                  showPasswordToggle={true}
                  showPassword={showConfirmPassword}
                  onTogglePassword={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  error={
                    (errors as FieldErrors<SignUpFormData>).confirmPassword
                      ?.message
                  }
                  editable={!isLoading}
                />
              )}

              {isLoginMode && (
                <>
                  <Controller
                    control={control as Control<LoginFormData>}
                    name="rememberMe"
                    render={({ field: { onChange, value } }) => (
                      <RememberMeCheckbox
                        value={Boolean(value)}
                        onValueChange={onChange}
                        disabled={isLoading}
                      />
                    )}
                  />
                </>
              )}

              <View style={authStyles.toggleContainer}>
                <Text style={authStyles.toggleText}>
                  {isLoginMode
                    ? "Don't have an account?"
                    : 'Already have an account?'}
                </Text>
                <TouchableOpacity onPress={toggleMode} disabled={isLoading}>
                  <Text style={authStyles.toggleLink}>
                    {isLoginMode ? 'Sign Up' : 'Sign In'}
                  </Text>
                </TouchableOpacity>
              </View>

              {isLoginMode && (
                <TouchableOpacity
                  style={componentStyles.forgotPassword}
                  disabled={isLoading}
                  onPress={handleForgotPassword}
                >
                  <Text style={componentStyles.forgotPasswordText}>
                    Forgot Password?
                  </Text>
                </TouchableOpacity>
              )}

              <LoadingButton
                onPress={handleSubmit(handleFormSubmit)}
                disabled={isSubmitDisabled}
                isLoading={isLoading}
                title={isLoginMode ? 'Sign In' : 'Create Account'}
                loadingTitle={
                  isLoginMode ? 'Signing in...' : 'Creating account...'
                }
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
