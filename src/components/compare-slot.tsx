import { Image } from 'expo-image';
import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native';

import { artworkUrl } from '@/api/pokeapi';
import { ThemedText } from '@/components/themed-text';
import { FontFamily, Radius, SoftShadow, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { formatName, formatNumber } from '@/utils/format';

type CompareSlotProps = {
  /** "Pokémon 1" or "Pokémon 2": used for the empty slot and for screen readers. */
  placeholder: string;
  pokemon: { id: number; name: string } | undefined;
  /** A Pokémon is chosen but its data has not arrived yet. */
  isLoading: boolean;
  onPress: () => void;
};

/** One of the two Pokémon in the comparison. Tap to choose or change it. */
export function CompareSlot({ placeholder, pokemon, isLoading, onPress }: CompareSlotProps) {
  const theme = useTheme();
  const name = pokemon ? formatName(pokemon.name) : undefined;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={name ? `${placeholder}: ${name}. Tap to change` : `Choose ${placeholder}`}
      onPress={onPress}
      style={[styles.card, SoftShadow, { backgroundColor: theme.backgroundElement }]}
    >
      <View style={[styles.imageArea, { backgroundColor: theme.imageBackground }]}>
        {pokemon ? (
          <Image
            source={artworkUrl(pokemon.id)}
            contentFit="contain"
            cachePolicy="memory-disk"
            style={styles.image}
          />
        ) : isLoading ? (
          <ActivityIndicator color={theme.primary} />
        ) : (
          <View style={[styles.plus, { borderColor: theme.primary }]}>
            <ThemedText style={[styles.plusText, { color: theme.primary }]}>+</ThemedText>
          </View>
        )}
        {pokemon ? (
          <View style={[styles.label, { backgroundColor: theme.primary }]}>
            <ThemedText style={styles.labelText}>{formatNumber(pokemon.id)}</ThemedText>
          </View>
        ) : null}
      </View>
      <View style={styles.footer}>
        <ThemedText style={styles.name} numberOfLines={1}>
          {name ?? `Choose ${placeholder}`}
        </ThemedText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { flex: 1, borderRadius: Radius.card, overflow: 'hidden' },
  imageArea: { aspectRatio: 1, padding: Spacing.three, alignItems: 'center', justifyContent: 'center' },
  image: { width: '100%', height: '100%' },
  plus: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusText: { fontFamily: FontFamily.medium, fontSize: 32, lineHeight: 36 },
  label: {
    position: 'absolute',
    top: Spacing.two,
    left: Spacing.two,
    borderRadius: Radius.label,
    paddingHorizontal: 6,
    paddingTop: Spacing.one,
    paddingBottom: Spacing.half,
  },
  labelText: {
    color: '#FFFFFF',
    fontFamily: FontFamily.medium,
    fontSize: 10,
    lineHeight: 12,
    textTransform: 'uppercase',
  },
  footer: { height: 48, justifyContent: 'center', paddingHorizontal: 12 },
  name: { fontFamily: FontFamily.medium, fontSize: 16, lineHeight: 19 },
});
