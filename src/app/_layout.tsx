import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';

import { Colors, FontFamily } from '@/constants/theme';

void SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

const lightTheme = {
  ...DefaultTheme,
  colors: { ...DefaultTheme.colors, background: Colors.light.background, primary: Colors.light.primary },
};
const darkTheme = {
  ...DarkTheme,
  colors: { ...DarkTheme.colors, background: Colors.dark.background, primary: Colors.dark.primary },
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded, fontError] = useFonts({
    [FontFamily.light]: require('../../assets/fonts/Rubik-Light.ttf'),
    [FontFamily.regular]: require('../../assets/fonts/Rubik-Regular.ttf'),
    [FontFamily.medium]: require('../../assets/fonts/Rubik-Medium.ttf'),
    [FontFamily.semiBold]: require('../../assets/fonts/Rubik-SemiBold.ttf'),
    [FontFamily.bold]: require('../../assets/fonts/Rubik-Bold.ttf'),
    [FontFamily.extraBold]: require('../../assets/fonts/Rubik-ExtraBold.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) void SplashScreen.hideAsync();
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={colorScheme === 'dark' ? darkTheme : lightTheme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="pokemon/[id]" />
        </Stack>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
