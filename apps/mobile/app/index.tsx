import { useAuth } from '@/hooks/use-auth';
import { AuthScreen } from '@/screens';
import { LoginFormData, SignUpFormData } from '@/types';

export default function App() {
  const { login, register, isLoggingIn, isRegistering } = useAuth();

  const handleLogin = async (data: LoginFormData) => {
    try {
      await login(data);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleRegister = async (
    data: Omit<SignUpFormData, 'confirmPassword'>,
  ) => {
    try {
      await register(data as SignUpFormData);
    } catch (error) {
      console.error('Register failed:', error);
    }
  };

  return (
    <AuthScreen
      onLogin={handleLogin}
      onSignUp={handleRegister}
      isLoading={isLoggingIn || isRegistering}
    />
  );
}
