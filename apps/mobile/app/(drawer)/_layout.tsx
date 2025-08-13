import SignOutButton from '@/components/ui/sign-out-button';
import { FontAwesome, FontAwesome6 } from '@expo/vector-icons';
import { useSegments } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { useEffect, useState } from 'react';

const DrawerLayout = () => {
  const segments = useSegments();
  const [activeTabTitle, setActiveTabTitle] = useState('');

  const getDisplayTitle = (routeName: string): string => {
    const titleMap: Record<string, string> = {
      skills: 'Skills',
      tables: 'Tables',
      throwing: 'Throwing',
      stars: 'Stars',
      inducements: 'Inducements',
      '(cheat-sheets)': 'Home',
      'game-clock': 'Game Clock',
      '(team-creation)': 'Team Creation',
      '(competitions)': 'Competitions',
    };
    return titleMap[routeName] || routeName;
  };

  useEffect(() => {
    if (segments && segments.length > 0) {
      const currentRoute = segments[segments.length - 1];
      const displayTitle = getDisplayTitle(currentRoute);
      setActiveTabTitle(displayTitle);
    }
  }, [segments]);

  return (
    <Drawer
      screenOptions={{
        headerShown: true,
        headerTitleAlign: 'center',
        headerRight: ({ pressColor }) => (
          <SignOutButton pressColor={pressColor} />
        ),
      }}
    >
      <Drawer.Screen
        name="(cheat-sheets)"
        options={{
          drawerLabel: 'Home',
          title: activeTabTitle || 'Home',
          drawerIcon: ({ color }) => (
            <FontAwesome size={20} name="home" color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="game-clock"
        options={{
          drawerLabel: 'Game Clock',
          title: activeTabTitle || 'Game Clock',
          drawerIcon: ({ color }) => (
            <FontAwesome size={20} name="clock-o" color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="(team-creation)"
        options={{
          drawerLabel: 'Team Creation',
          title: activeTabTitle || 'Team Creation',
          drawerIcon: ({ color }) => (
            <FontAwesome size={16} name="group" color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="(competitions)"
        options={{
          drawerLabel: 'Competitions',
          title: activeTabTitle || 'Competitions',
          drawerIcon: ({ color }) => (
            <FontAwesome6 size={20} name="award" color={color} />
          ),
        }}
      />
    </Drawer>
  );
};

export default DrawerLayout;
