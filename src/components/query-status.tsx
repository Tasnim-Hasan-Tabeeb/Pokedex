import { ActivityIndicator, Pressable } from 'react-native';

import { Icon, type IconName } from '@/components/icon';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useTheme } from '@/hooks/use-theme';

/** `compact` is for a part of a screen (such as a tab): it takes its own height instead of filling the screen. */
const fill = { flex: 1, alignItems: 'center', justifyContent: 'center' } as const;
const inline = { alignItems: 'center', justifyContent: 'center', paddingVertical: 32 } as const;

export function LoadingState({ compact = false }: { compact?: boolean }) {
  const theme = useTheme();

  return (
    <ThemedView type={compact ? 'backgroundElement' : undefined} style={compact ? inline : fill}>
      <ActivityIndicator size="large" color={theme.primary} />
    </ThemedView>
  );
}

export function EmptyState({
  title,
  message,
  icon = 'pokemon',
}: {
  title: string;
  message?: string;
  icon?: IconName;
}) {
  return (
    <ThemedView style={{ alignItems: 'center', paddingTop: 64, paddingHorizontal: 24, gap: 8 }}>
      <Icon name={icon} size={48} style={{ opacity: 0.3 }} />
      <ThemedText type="subtitle" style={{ fontSize: 20, lineHeight: 26, textAlign: 'center' }}>
        {title}
      </ThemedText>
      {message ? (
        <ThemedText themeColor="textSecondary" style={{ textAlign: 'center' }}>
          {message}
        </ThemedText>
      ) : null}
    </ThemedView>
  );
}

export function ErrorState({
  onRetry,
  error,
  compact = false,
}: {
  onRetry: () => void;
  error?: Error | null;
  compact?: boolean;
}) {
  return (
    <ThemedView type={compact ? 'backgroundElement' : undefined} style={[compact ? inline : fill, { gap: 12 }]}>
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
