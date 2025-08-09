import { useAuth } from '@/hooks/use-auth';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Settings() {
  const { logout, isLoggingOut } = useAuth();

  return (
    <SafeAreaView>
      <TouchableOpacity
        disabled={isLoggingOut}
        style={styles.btnContainer}
        onPress={() => logout()}
      >
        <Text style={styles.btnText}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  btnContainer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  btnText: {
    color: '#fff',
  },
});
