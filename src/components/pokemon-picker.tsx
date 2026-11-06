import { useState } from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { PokemonGrid } from '@/components/pokemon-grid';
import { EmptyState, ErrorState, LoadingState } from '@/components/query-status';
import { SearchBar } from '@/components/search-bar';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { FontFamily, Spacing } from '@/constants/theme';
import { usePokemonSearch } from '@/hooks/use-pokemon-search';
import { useTheme } from '@/hooks/use-theme';

type PokemonPickerProps = {
  visible: boolean;
  title: string;
  onPick: (id: number) => void;
  onClose: () => void;
};

/** A full-screen sheet to search the whole list and pick one Pokémon. */
export function PokemonPicker({ visible, title, onPick, onClose }: PokemonPickerProps) {
  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <SafeAreaProvider>
        <PickerContent title={title} onPick={onPick} onClose={onClose} />
      </SafeAreaProvider>
    </Modal>
  );
}

function PickerContent({ title, onPick, onClose }: Omit<PokemonPickerProps, 'visible'>) {
  const theme = useTheme();
  const [query, setQuery] = useState('');
  const { results, isPending, isError, error, refetch } = usePokemonSearch(query);

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.container}>
        <View style={styles.header}>
          <ThemedText type="heading">{title}</ThemedText>
          <Pressable accessibilityRole="button" accessibilityLabel="Close" onPress={onClose} hitSlop={12}>
            <ThemedText style={[styles.close, { color: theme.primary }]}>
              Close
            </ThemedText>
          </Pressable>
        </View>
        <View style={styles.searchBar}>
          <SearchBar value={query} onChangeText={setQuery} />
        </View>
        {isPending ? (
          <LoadingState />
        ) : isError ? (
          <ErrorState error={error} onRetry={() => void refetch()} />
        ) : (
          <PokemonGrid
            items={results}
            onSelect={onPick}
            empty={<EmptyState title="No Pokémon found" message="Check the spelling or try a shorter name." />}
          />
        )}
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.three,
    paddingBottom: Spacing.three,
  },
  close: { fontFamily: FontFamily.semiBold, fontSize: 16 },
  searchBar: { paddingHorizontal: Spacing.three },
});
