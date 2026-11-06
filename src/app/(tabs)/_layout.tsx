import { Tabs } from 'expo-router';

import { Icon } from '@/components/icon';
import { FontFamily } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

/** The bottom menu bar from the design: Pokémons and Favorites. */
export default function TabsLayout() {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.text,
        tabBarLabelStyle: { fontFamily: FontFamily.bold, fontSize: 10 },
        tabBarStyle: { backgroundColor: theme.background, borderTopWidth: 0, elevation: 0 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Pokémons',
          tabBarIcon: ({ focused }) => <Icon name={focused ? 'pokemonActive' : 'pokemon'} />,
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          tabBarIcon: ({ focused }) => <Icon name={focused ? 'heartFilled' : 'heart'} />,
        }}
      />
    </Tabs>
  );
}
