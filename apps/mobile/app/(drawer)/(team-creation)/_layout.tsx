import { FontAwesome } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

const TeamCreationLayout = () => {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'All',
          tabBarIcon: ({ color }) => (
            <FontAwesome size={20} name="list" color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TeamCreationLayout;
