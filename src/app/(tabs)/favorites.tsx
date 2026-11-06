import { useRouter } from 'expo-router';
import { FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { artworkUrl } from '@/api/pokeapi';
import { Pokecard } from '@/components/pokecard';
import { ErrorState, LoadingState } from '@/components/query-status';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useFavorites } from '@/hooks/use-favorites';

export default function FavoritesScreen() {
  const router = useRouter();
  const { data, isPending, isError, error, refetch } = useFavorites();

  if (isPending) return <LoadingState />;
  if (isError) return <ErrorState error={error} onRetry={() => void refetch()} />;

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.container}>
        <FlatList
          data={data}
          numColumns={2}
          keyExtractor={(item) => String(item.id)}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.content}
          ListHeaderComponent={<ThemedText type="heading">My favorites</ThemedText>}
          renderItem={({ item }) => (
            <Pokecard
              id={item.id}
              name={item.name}
              imageUrl={artworkUrl(item.id)}
              onPress={() => router.push({ pathname: '/pokemon/[id]', params: { id: item.id } })}
            />
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
