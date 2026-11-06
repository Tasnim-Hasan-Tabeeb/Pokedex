import { useRouter } from 'expo-router';
import { FlatList, StyleSheet, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { artworkUrl } from '@/api/pokeapi';
import { Pokecard } from '@/components/pokecard';
import { ErrorState, LoadingState } from '@/components/query-status';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { usePokemonList } from '@/hooks/use-pokemon';

const COLUMNS = 2;

export default function ListScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const { data, isPending, isError, error, isRefetching, refetch } = usePokemonList();

  if (isPending) return <LoadingState />;
  if (isError) return <ErrorState error={error} onRetry={() => void refetch()} />;

  // Fixed card width, so a last row with one card is as wide as the others.
  const cardWidth = Math.floor((width - Spacing.four * 2 - Spacing.three * (COLUMNS - 1)) / COLUMNS);

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.container}>
        <FlatList
          data={data}
          numColumns={COLUMNS}
          keyExtractor={(item) => String(item.id)}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.content}
          ListHeaderComponent={<ThemedText type="heading">All Pokémon</ThemedText>}
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
  content: { paddingHorizontal: Spacing.four, paddingTop: Spacing.three, paddingBottom: Spacing.four, gap: Spacing.three },
  row: { gap: Spacing.three },
});
