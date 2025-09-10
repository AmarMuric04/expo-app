import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Stack, Link } from 'expo-router';
import { Pressable } from 'react-native';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Link href="/counter/history" asChild>
              <Pressable hitSlop={20}>
                <MaterialIcons name="history" color="red" size={32} />
              </Pressable>
            </Link>
          ),
          title: 'Counter',
        }}
        name="index"
      />
    </Stack>
  );
}
