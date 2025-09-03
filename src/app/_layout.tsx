import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';

import '@/global.css';
import { Tabs } from 'expo-router';

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'red',
      }}
    >
      <Tabs.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather color={color} name="list" size={size} />
          ),
          title: 'Home Page',
        }}
        name="index"
      />

      <Tabs.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="clockcircleo" color={color} size={size} />
          ),
          title: 'Counter Page',
          headerShown: false,
        }}
        name="counter"
      />

      <Tabs.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="lightbulb" color={color} size={size} />
          ),
          title: 'Idea Page',
        }}
        name="idea"
      />
    </Tabs>
  );
}
