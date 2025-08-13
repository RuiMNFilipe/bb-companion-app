import { FontAwesome, FontAwesome6 } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

const CompetitionsLayout = () => {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="my-competitions"
        options={{
          title: 'My Competitions',
          tabBarIcon: ({ color }) => (
            <FontAwesome size={20} name="list" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="leagues"
        options={{
          title: 'Leagues',
          tabBarIcon: ({ color }) => (
            <FontAwesome size={20} name="trophy" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="tournaments"
        options={{
          title: 'Tournaments',
          tabBarIcon: ({ color }) => (
            <FontAwesome6 size={20} name="medal" color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default CompetitionsLayout;
