import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PokemonGrid } from '@/components/pokemon-grid';
import { EmptyState, ErrorState, LoadingState } from '@/components/query-status';
import { SearchBar } from '@/components/search-bar';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { usePokemonSearch } from '@/hooks/use-pokemon-search';

export default function ListScreen() {
  const [query, setQuery] = useState('');
  const { results, isSearching, isPending, isError, error, isRefetching, refetch } = usePokemonSearch(query);

  if (isPending) return <LoadingState />;
  if (isError) return <ErrorState error={error} onRetry={() => void refetch()} />;

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.container}>
        <View style={styles.searchBar}>
          <SearchBar value={query} onChangeText={setQuery} />
        </View>
        <PokemonGrid
          items={results}
          header={isSearching ? undefined : <ThemedText type="heading">All Pokémon</ThemedText>}
          empty={<EmptyState title="No Pokémon found" message="Check the spelling or try a shorter name." />}
          refreshing={isRefetching}
          onRefresh={() => void refetch()}
        />
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  searchBar: { paddingHorizontal: Spacing.three, paddingTop: Spacing.three },
});
