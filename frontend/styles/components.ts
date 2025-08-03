import { StyleSheet } from 'react-native';

export const componentStyles = StyleSheet.create({
  // Input styles
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  inputError: {
    borderColor: '#ff6b6b',
  },
  inputIcon: {
    marginRight: 12,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#ffffff',
    height: '100%',
  },
  eyeIcon: {
    padding: 4,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  errorText: {
    fontSize: 14,
    color: '#ff6b6b',
    marginLeft: 6,
    flex: 1,
  },

  // Password strength styles
  passwordStrengthContainer: {
    marginTop: -10,
    marginBottom: 20,
    padding: 16,
    backgroundColor: '#16213e',
    borderRadius: 12,
  },
  passwordStrengthHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  passwordStrengthLabel: {
    fontSize: 14,
    color: '#8e8e93',
    fontWeight: '500',
  },
  passwordStrengthValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  passwordStrengthBar: {
    height: 4,
    backgroundColor: '#0f3460',
    borderRadius: 2,
    marginBottom: 12,
  },
  passwordStrengthFill: {
    height: '100%',
    borderRadius: 2,
  },
  passwordRequirements: {
    marginTop: 8,
  },
  requirementText: {
    fontSize: 12,
    color: '#8e8e93',
    marginBottom: 4,
  },
  requirementItem: {
    fontSize: 12,
    color: '#ff6b6b',
    marginBottom: 2,
  },
  requirementMet: {
    color: '#0be881',
  },

  // Checkbox styles
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#8e8e93',
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxActive: {
    backgroundColor: '#e94560',
    borderColor: '#e94560',
  },
  rememberMeText: {
    fontSize: 14,
    color: '#8e8e93',
  },
  forgotPassword: {
    padding: 4,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#e94560',
    fontWeight: '500',
  },

  // Button styles
  submitButton: {
    backgroundColor: '#e94560',
    borderRadius: 12,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#e94560',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    marginTop: 24,
  },
  submitButtonDisabled: {
    backgroundColor: '#8e8e93',
    shadowOpacity: 0,
    elevation: 0,
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#ffffff',
    marginLeft: 12,
    fontWeight: '500',
  },

  // Debug styles
  debugContainer: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#16213e',
    borderRadius: 8,
  },
  debugText: {
    fontSize: 12,
    color: '#8e8e93',
    marginBottom: 4,
  },
});
