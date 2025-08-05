import { authApi } from '@/lib/api';
import { AuthScreen } from '@/screens';
import { LoginFormData, SignUpFormData } from '@/types';
import { Alert } from 'react-native';

const loginFormSubmit = async (data: LoginFormData): Promise<void> => {
  try {
    void (await authApi.login(data));
    void Alert.alert('Success', 'Logged in successfully!');
  } catch (error) {
    console.error(`loginFormSubmit Error: ${error}`);
  }
};

const signUpFormSubmit = async (
  data: Omit<SignUpFormData, 'confirmPassword'>,
): Promise<void> => {
  try {
    void (await authApi.register(data));
    void Alert.alert('Success', 'Account created successfully!');
  } catch (error) {
    console.error(`signUpFormSubmit Error: ${error}`);
  }
};

export default function App() {
  return <AuthScreen onLogin={loginFormSubmit} onSignUp={signUpFormSubmit} />;
}
