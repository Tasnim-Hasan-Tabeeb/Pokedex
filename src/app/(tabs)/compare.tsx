import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CompareSlot } from '@/components/compare-slot';
import { CompareStats } from '@/components/compare-stats';
import { PokemonPicker } from '@/components/pokemon-picker';
import { ErrorState, LoadingState } from '@/components/query-status';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { usePokemonDetail } from '@/hooks/use-pokemon';

type Slot = 'first' | 'second';

/** The Compare screen: choose two Pokémon and see which one is stronger on each stat. */
export default function CompareScreen() {
  const [firstId, setFirstId] = useState<number>();
  const [secondId, setSecondId] = useState<number>();
  const [picking, setPicking] = useState<Slot | null>(null);

  const first = usePokemonDetail(firstId);
  const second = usePokemonDetail(secondId);

  function pick(id: number) {
    if (picking === 'first') setFirstId(id);
    if (picking === 'second') setSecondId(id);
    setPicking(null);
  }

  function retry() {
    void first.refetch();
    void second.refetch();
  }

  const bothChosen = firstId !== undefined && secondId !== undefined;
  const isLoading = first.isFetching || second.isFetching;
  const isError = first.isError || second.isError;

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.container}>
        <ScrollView contentContainerStyle={styles.content}>
          <ThemedText type="heading">Compare</ThemedText>

          <View style={styles.slots}>
            <CompareSlot
              placeholder="Pokémon 1"
              pokemon={first.data}
              isLoading={first.isPending && firstId !== undefined}
              onPress={() => setPicking('first')}
            />
            <CompareSlot
              placeholder="Pokémon 2"
              pokemon={second.data}
              isLoading={second.isPending && secondId !== undefined}
              onPress={() => setPicking('second')}
            />
          </View>

          {!bothChosen ? (
            <ThemedText themeColor="textSecondary" style={styles.hint}>
              Choose two Pokémon to see who is stronger.
            </ThemedText>
          ) : isError ? (
            <ErrorState compact error={first.error ?? second.error} onRetry={retry} />
          ) : first.data && second.data ? (
            <CompareStats first={first.data} second={second.data} />
          ) : isLoading ? (
            <LoadingState compact />
          ) : null}
        </ScrollView>
      </SafeAreaView>

      <PokemonPicker
        visible={picking !== null}
        title={picking === 'second' ? 'Choose Pokémon 2' : 'Choose Pokémon 1'}
        onPick={pick}
        onClose={() => setPicking(null)}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: Spacing.four, gap: Spacing.four },
  slots: { flexDirection: 'row', gap: Spacing.three },
  hint: { textAlign: 'center' },
});
