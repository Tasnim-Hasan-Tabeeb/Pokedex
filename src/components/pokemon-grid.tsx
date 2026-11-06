import { useRouter } from 'expo-router';
import type { ReactElement } from 'react';
import { FlatList, StyleSheet, useWindowDimensions, View } from 'react-native';

import { artworkUrl } from '@/api/pokeapi';
import { Pokecard } from '@/components/pokecard';
import { Spacing } from '@/constants/theme';

const COLUMNS = 2;

type PokemonGridProps = {
  items: readonly { id: number; name: string }[];
  /** Shown above the cards, e.g. the title. */
  header?: ReactElement;
  /** Shown instead of the cards when `items` is empty. */
  empty?: ReactElement;
  refreshing?: boolean;
  onRefresh?: () => void;
  /** Called when a card is tapped. Without it, the card opens the Pokémon's detail screen. */
  onSelect?: (id: number) => void;
};

/** The two-column grid of Pokécards, used by the list, the search results, the favorites and the compare picker. */
export function PokemonGrid({ items, header, empty, refreshing, onRefresh, onSelect }: PokemonGridProps) {
  const router = useRouter();
  const { width } = useWindowDimensions();

  // Fixed card width, so a last row with one card is as wide as the others.
  const cardWidth = Math.floor((width - Spacing.four * 2 - Spacing.three * (COLUMNS - 1)) / COLUMNS);

  return (
    <FlatList
      data={items}
      numColumns={COLUMNS}
      keyExtractor={(item) => String(item.id)}
      columnWrapperStyle={styles.row}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
      ListHeaderComponent={header}
      ListEmptyComponent={empty}
      refreshing={refreshing}
      onRefresh={onRefresh}
      // The list can have ~1300 items: only render what is on (or near) the screen.
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
            onPress={() =>
              onSelect ? onSelect(item.id) : router.push({ pathname: '/pokemon/[id]', params: { id: item.id } })
            }
          />
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: Spacing.four, paddingTop: Spacing.four, paddingBottom: Spacing.four, gap: Spacing.three },
  row: { gap: Spacing.three },
});
