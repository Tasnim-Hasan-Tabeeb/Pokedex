import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { artworkUrl } from '@/api/pokeapi';
import { AboutTab } from '@/components/about-tab';
import { EvolutionTab } from '@/components/evolution-tab';
import { Icon } from '@/components/icon';
import { ErrorState, LoadingState } from '@/components/query-status';
import { SegmentedTabs } from '@/components/segmented-tabs';
import { StatsTab } from '@/components/stats-tab';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { TypeChip } from '@/components/type-chip';
import { FontFamily, Spacing } from '@/constants/theme';
import { useFavorites, useToggleFavorite } from '@/hooks/use-favorites';
import { usePokemonDetail } from '@/hooks/use-pokemon';
import { formatName, formatNumber } from '@/utils/format';

const TABS = ['About', 'Stats', 'Evolution'] as const;

export default function DetailScreen() {
  const router = useRouter();
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
          <Pressable accessibilityRole="button" accessibilityLabel="Go back" onPress={() => router.back()} style={styles.iconButton}>
            <Icon name="back" />
          </Pressable>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            onPress={() => toggle.mutate({ favorite: { id: data.id, name: data.name }, isFavorite })}
            style={styles.iconButton}
          >
            <Icon name={isFavorite ? 'heartActive' : 'heart'} />
          </Pressable>
        </View>

        <View style={styles.titleRow}>
          <ThemedText type="display">{formatName(data.name)}</ThemedText>
          <ThemedText style={styles.number}>{formatNumber(data.id)}</ThemedText>
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
          {/* All three stay mounted and only hide, so switching is instant and the evolution chain loads in the background. */}
          <View style={tab === 'About' ? undefined : styles.hidden}>
            <AboutTab pokemon={data} />
          </View>
          <View style={tab === 'Stats' ? undefined : styles.hidden}>
            <StatsTab stats={data.stats} />
          </View>
          <View style={tab === 'Evolution' ? undefined : styles.hidden}>
            <EvolutionTab speciesId={data.speciesId} />
          </View>
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
    // The icon buttons have 16 px padding, so the icons line up with the 24 px margin of the design.
    marginHorizontal: -Spacing.three,
  },
  iconButton: { padding: Spacing.three },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginTop: Spacing.two,
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
  sheetContent: { paddingTop: Spacing.four, paddingBottom: Spacing.five },
  hidden: { display: 'none' },
});
