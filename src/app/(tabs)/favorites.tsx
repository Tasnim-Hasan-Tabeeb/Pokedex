import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PokemonGrid } from '@/components/pokemon-grid';
import { EmptyState, ErrorState, LoadingState } from '@/components/query-status';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useFavorites } from '@/hooks/use-favorites';

export default function FavoritesScreen() {
  const { data, isPending, isError, error, refetch } = useFavorites();

  if (isPending) return <LoadingState />;
  if (isError) return <ErrorState error={error} onRetry={() => void refetch()} />;

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.container}>
        <PokemonGrid
          items={data}
          header={<ThemedText type="heading">My favorites</ThemedText>}
          empty={
            <EmptyState
              icon="heart"
              title="No favorites yet"
              message="Open a Pokémon and tap the heart to save it here."
            />
          }
        />
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
