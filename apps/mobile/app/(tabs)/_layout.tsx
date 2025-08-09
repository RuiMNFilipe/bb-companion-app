import { useAuth } from '@/hooks/use-auth';
import { FontAwesome } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  const { isAuthenticated } = useAuth();

  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Protected guard={isAuthenticated}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => (
              <FontAwesome size={28} name="home" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: 'Settings',
            tabBarIcon: ({ color }) => (
              <FontAwesome size={28} name="cog" color={color} />
            ),
          }}
        />
      </Tabs.Protected>
    </Tabs>
  );
}
