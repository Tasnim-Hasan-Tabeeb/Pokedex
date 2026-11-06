import { ActivityIndicator, Pressable } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useTheme } from '@/hooks/use-theme';

export function LoadingState() {
  const theme = useTheme();

  return (
    <ThemedView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator size="large" color={theme.primary} />
    </ThemedView>
  );
}

export function ErrorState({ onRetry, error }: { onRetry: () => void; error?: Error | null }) {
  return (
    <ThemedView style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 }}>
      <ThemedText>Something went wrong.</ThemedText>
      {error ? (
        <ThemedText type="small" themeColor="textSecondary" style={{ textAlign: 'center', paddingHorizontal: 24 }}>
          {error.message}
        </ThemedText>
      ) : null}
      <Pressable accessibilityRole="button" onPress={onRetry}>
        <ThemedText type="link">Try again</ThemedText>
      </Pressable>
    </ThemedView>
  );
}
