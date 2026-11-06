import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { artworkUrl, type PokemonDetail } from '@/api/pokeapi';
import { Icon } from '@/components/icon';
import { ErrorState, LoadingState } from '@/components/query-status';
import { SegmentedTabs } from '@/components/segmented-tabs';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { TypeChip } from '@/components/type-chip';
import { FontFamily, Spacing } from '@/constants/theme';
import { useFavorites, useToggleFavorite } from '@/hooks/use-favorites';
import { usePokemonDetail } from '@/hooks/use-pokemon';
import { useTheme } from '@/hooks/use-theme';
import { formatName, formatNumber } from '@/utils/format';

const TABS = ['About', 'Stats', 'Evolution'] as const;

function aboutRows(pokemon: PokemonDetail): [string, string][] {
  return [
    ['Name', formatName(pokemon.name)],
    ['ID', formatNumber(pokemon.id)],
    ['Base', pokemon.baseExperience === null ? '-' : `${pokemon.baseExperience} XP`],
    ['Weight', `${pokemon.weight} kg`],
    ['Height', `${pokemon.height} m`],
    ['Types', pokemon.types.map(formatName).join(', ')],
    ['Abilities', pokemon.abilities.map(formatName).join(', ')],
  ];
}

export default function DetailScreen() {
  const router = useRouter();
  const theme = useTheme();
  const { id } = useLocalSearchParams<{ id: string }>();
  const pokemonId = Number(id);
  const { data, isPending, isError, error, refetch } = usePokemonDetail(pokemonId);
  const favorites = useFavorites();
  const toggle = useToggleFavorite();
  const [tab, setTab] = useState<string>(TABS[0]);

  if (isPending) return <LoadingState />;
  if (isError) return <ErrorState error={error} onRetry={() => void refetch()} />;

  const isFavorite = favorites.data?.some((f) => f.id === data.id) ?? false;

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.top}>
        <View style={styles.header}>
          <Pressable accessibilityRole="button" accessibilityLabel="Go back" onPress={() => router.back()} style={styles.back}>
            <ThemedText style={styles.backChevron}>‹</ThemedText>
            <ThemedText style={styles.backLabel}>Back</ThemedText>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            onPress={() => toggle.mutate({ favorite: { id: data.id, name: data.name }, isFavorite })}
            style={styles.heart}
          >
            <Icon name={isFavorite ? 'heartFilled' : 'heart'} />
          </Pressable>
        </View>

        <View style={styles.titleRow}>
          <ThemedText type="display">{formatName(data.name)}</ThemedText>
          <ThemedText style={styles.number}>#{formatNumber(data.id)}</ThemedText>
        </View>
        <View style={styles.chips}>
          {data.types.map((type) => (
            <TypeChip key={type} type={type} />
          ))}
        </View>
      </SafeAreaView>

      <Image source={artworkUrl(data.id)} contentFit="contain" style={styles.artwork} />

      <ThemedView type="backgroundElement" style={styles.sheet}>
        <SegmentedTabs tabs={TABS} value={tab} onChange={setTab} />
        <ScrollView contentContainerStyle={styles.sheetContent}>
          {tab === 'About'
            ? aboutRows(data).map(([label, value]) => (
                <View key={label} style={styles.aboutRow}>
                  <ThemedText style={styles.aboutLabel}>{label}</ThemedText>
                  <ThemedText style={[styles.aboutValue, { color: theme.textSecondary }]}>{value}</ThemedText>
                </View>
              ))
            : null}
        </ScrollView>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  top: { paddingHorizontal: Spacing.four },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: -Spacing.three,
    minHeight: 40,
  },
  back: { flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: 9, paddingVertical: Spacing.two },
  backChevron: { fontSize: 28, lineHeight: 30, fontFamily: FontFamily.regular },
  backLabel: { fontSize: 17, lineHeight: 22, fontFamily: FontFamily.regular },
  heart: { padding: Spacing.two },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginTop: Spacing.three,
  },
  number: { fontSize: 24, lineHeight: 38, fontFamily: FontFamily.regular, opacity: 0.3 },
  chips: { flexDirection: 'row', gap: Spacing.two, marginTop: Spacing.three },
  artwork: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginTop: Spacing.four,
    marginBottom: -50,
    zIndex: 1,
  },
  sheet: {
    flex: 1,
    paddingTop: 74,
    paddingHorizontal: Spacing.four,
  },
  sheetContent: { paddingTop: Spacing.four, gap: Spacing.three, paddingBottom: Spacing.five },
  aboutRow: { flexDirection: 'row', gap: Spacing.three },
  aboutLabel: { width: 100, fontFamily: FontFamily.semiBold, fontSize: 14, lineHeight: 18 },
  aboutValue: { flex: 1, fontFamily: FontFamily.regular, fontSize: 14, lineHeight: 18 },
});
