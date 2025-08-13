import { FontAwesome } from '@expo/vector-icons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="skills"
        options={{
          title: 'Skills',
          tabBarIcon: ({ color }) => (
            <FontAwesome6 size={20} name="magnifying-glass" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="tables"
        options={{
          title: 'Tables',
          tabBarIcon: ({ color }) => (
            <FontAwesome size={20} name="table" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="throwing"
        options={{
          title: 'Throwing',
          tabBarIcon: ({ color }) => (
            <FontAwesome6 size={20} name="football" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="stars"
        options={{
          title: 'Stars',
          tabBarIcon: ({ color }) => (
            <FontAwesome size={20} name="star" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="inducements"
        options={{
          title: 'Inducements',
          tabBarIcon: ({ color }) => (
            <FontAwesome size={20} name="shopping-cart" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
