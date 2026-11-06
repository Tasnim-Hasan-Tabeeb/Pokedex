import { useRouter } from 'expo-router';
import { useState } from 'react';
import { FlatList, StyleSheet, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { artworkUrl } from '@/api/pokeapi';
import { Pokecard } from '@/components/pokecard';
import { EmptyState, ErrorState, LoadingState } from '@/components/query-status';
import { SearchBar } from '@/components/search-bar';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { usePokemonSearch } from '@/hooks/use-pokemon-search';

const COLUMNS = 2;

export default function ListScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [query, setQuery] = useState('');
  const { results, isSearching, isPending, isError, error, isRefetching, refetch } = usePokemonSearch(query);

  if (isPending) return <LoadingState />;
  if (isError) return <ErrorState error={error} onRetry={() => void refetch()} />;

  // Fixed card width, so a last row with one card is as wide as the others.
  const cardWidth = Math.floor((width - Spacing.four * 2 - Spacing.three * (COLUMNS - 1)) / COLUMNS);

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.container}>
        <View style={styles.searchBar}>
          <SearchBar value={query} onChangeText={setQuery} />
        </View>
        <FlatList
          data={results}
          numColumns={COLUMNS}
          keyExtractor={(item) => String(item.id)}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          ListHeaderComponent={isSearching ? undefined : <ThemedText type="heading">All Pokémon</ThemedText>}
          ListEmptyComponent={
            <EmptyState title="No Pokémon found" message="Check the spelling or try a shorter name." />
          }
          refreshing={isRefetching}
          onRefresh={() => void refetch()}
          // The list has ~1300 items: only render what is on (or near) the screen.
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={7}
          removeClippedSubviews
          renderItem={({ item }) => (
            <View style={{ width: cardWidth }}>
              <Pokecard
                id={item.id}
                name={item.name}
                imageUrl={artworkUrl(item.id)}
                onPress={() => router.push({ pathname: '/pokemon/[id]', params: { id: item.id } })}
              />
            </View>
          )}
        />
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  searchBar: { paddingHorizontal: Spacing.three, paddingTop: Spacing.three },
  content: { paddingHorizontal: Spacing.four, paddingTop: Spacing.four, paddingBottom: Spacing.four, gap: Spacing.three },
  row: { gap: Spacing.three },
});
