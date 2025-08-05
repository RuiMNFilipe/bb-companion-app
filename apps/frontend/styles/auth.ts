import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const authStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logoIcon: {
    backgroundColor: '#16213e',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    padding: 8,
  },
  logoText: {
    fontSize: 36,
  },
  appTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  appSubtitle: {
    fontSize: 18,
    color: '#e94560',
    fontWeight: '600',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 16,
    color: '#8e8e93',
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: width * 0.8,
  },
  formContainer: {
    flex: 1,
    alignSelf: 'stretch',
  },
  toggleContainer: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 5,
  },
  toggleText: {
    fontSize: 16,
    color: '#8e8e93',
  },
  toggleLink: {
    fontSize: 16,
    color: '#e94560',
    fontWeight: '600',
  },
});
