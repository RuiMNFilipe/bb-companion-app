import { useAuth } from '@/hooks/use-auth';
import { FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

interface SignOutButtonProps {
  pressColor?: string | undefined;
}

const SignOutButton = ({ pressColor }: SignOutButtonProps) => {
  const { isLoggingOut, logout } = useAuth();

  return (
    <TouchableOpacity disabled={isLoggingOut} onPress={() => logout()}>
      <FontAwesome
        size={20}
        name="sign-out"
        color={pressColor}
        style={{ marginRight: 15 }}
      />
    </TouchableOpacity>
  );
};

export default SignOutButton;
