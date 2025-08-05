import { useRef, useState } from 'react';
import {
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Controller, FieldErrors, useForm } from 'react-hook-form';

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

  const loginUsernameRef = useRef<TextInput>(null);
  const loginPasswordRef = useRef<TextInput>(null);

  const signUpUsernameRef = useRef<TextInput>(null);
  const signUpEmailRef = useRef<TextInput>(null);
  const signUpPasswordRef = useRef<TextInput>(null);
  const signUpConfirmPasswordRef = useRef<TextInput>(null);

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
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

  const loginFormState = loginForm.formState;
  const signUpFormState = signUpForm.formState;
  const currentFormState = isLoginMode ? loginFormState : signUpFormState;

  const { errors, isValid, isDirty } = currentFormState;

  const watchedPassword = signUpForm.watch('password');

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

    loginForm.reset();
    signUpForm.reset();
  };

  const handleForgotPassword = (): void => {
    Alert.alert('Forgot Password', 'Password reset functionality coming soon!');
  };

  const isSubmitDisabled: boolean = !isValid || !isDirty || isLoading;
  const currentHandleSubmit = isLoginMode
    ? loginForm.handleSubmit
    : signUpForm.handleSubmit;

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
              <ControlledInput
                key={
                  isLoginMode ? 'login-username-input' : 'signup-username-input'
                }
                ref={isLoginMode ? loginUsernameRef : signUpUsernameRef}
                name="username"
                control={isLoginMode ? loginForm.control : signUpForm.control}
                label="Username"
                placeholder="Enter your username"
                icon="person-outline"
                error={errors.username?.message}
                editable={!isLoading}
                autoCapitalize="none"
                returnKeyType="next"
                onSubmitEditing={() => {
                  if (isLoginMode) {
                    loginPasswordRef.current?.focus();
                  } else {
                    signUpEmailRef.current?.focus();
                  }
                }}
              />

              {!isLoginMode && (
                <ControlledInput
                  name="email"
                  ref={signUpEmailRef}
                  control={signUpForm.control}
                  label="Email"
                  placeholder="Enter your email"
                  icon="mail-outline"
                  keyboardType="email-address"
                  error={signUpForm.formState.errors.email?.message}
                  editable={!isLoading}
                  autoCapitalize="none"
                  returnKeyType="next"
                  onSubmitEditing={() => signUpPasswordRef.current?.focus()}
                />
              )}

              <ControlledInput
                key={
                  isLoginMode ? 'login-password-input' : 'signup-password-input'
                }
                ref={isLoginMode ? loginPasswordRef : signUpPasswordRef}
                name="password"
                control={isLoginMode ? loginForm.control : signUpForm.control}
                label="Password"
                placeholder="Enter your password"
                icon="lock-closed-outline"
                secureTextEntry={!showPassword}
                showPasswordToggle={true}
                showPassword={showPassword}
                onTogglePassword={() => setShowPassword(!showPassword)}
                error={errors.password?.message}
                editable={!isLoading}
                autoCapitalize="none"
                returnKeyType={isLoginMode ? 'done' : 'next'}
                onSubmitEditing={() => {
                  if (isLoginMode) {
                    currentHandleSubmit(handleFormSubmit)();
                  } else {
                    signUpConfirmPasswordRef.current?.focus();
                  }
                }}
              />

              {!isLoginMode && (
                <PasswordStrengthIndicator password={watchedPassword} />
              )}

              {!isLoginMode && (
                <ControlledInput
                  ref={signUpConfirmPasswordRef}
                  name="confirmPassword"
                  control={signUpForm.control}
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
                  autoCapitalize="none"
                  returnKeyType="done"
                  onSubmitEditing={currentHandleSubmit(handleFormSubmit)}
                />
              )}

              {isLoginMode && (
                <>
                  <Controller
                    control={loginForm.control}
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
                onPress={currentHandleSubmit(handleFormSubmit)}
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
