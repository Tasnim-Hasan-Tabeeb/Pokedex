import { Image } from 'expo-image';
import { Pressable, StyleSheet, View } from 'react-native';

import { artworkUrl } from '@/api/pokeapi';
import { ThemedText } from '@/components/themed-text';
import { FontFamily, Radius, SoftShadow, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { formatName, formatNumber } from '@/utils/format';

type EvolutionCardProps = {
  id: number;
  name: string;
  /** The Pokémon whose detail screen is open. It is shown but cannot be opened again. */
  isCurrent: boolean;
  onPress: () => void;
};

/** The horizontal Pokécard of the evolution chain: artwork on the left, number and name on the right. */
export function EvolutionCard({ id, name, isCurrent, onPress }: EvolutionCardProps) {
  const theme = useTheme();
  const displayName = formatName(name);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={isCurrent ? `${displayName}, this Pokémon` : `Open ${displayName}`}
      disabled={isCurrent}
      onPress={onPress}
      style={[styles.card, SoftShadow, { backgroundColor: theme.backgroundElement }]}
    >
      <View style={[styles.imageArea, { backgroundColor: theme.imageBackground }]}>
        <Image
          source={artworkUrl(id)}
          contentFit="contain"
          cachePolicy="memory-disk"
          recyclingKey={String(id)}
          style={styles.image}
        />
      </View>
      <View style={styles.content}>
        <View style={[styles.label, { backgroundColor: theme.primary }]}>
          <ThemedText style={styles.labelText}>{formatNumber(id)}</ThemedText>
        </View>
        <ThemedText style={styles.name} numberOfLines={1}>
          {displayName}
        </ThemedText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    height: 80,
    borderRadius: Radius.card,
    overflow: 'hidden',
  },
  imageArea: { width: 80, height: 80, padding: Spacing.two },
  image: { flex: 1 },
  content: { flex: 1, justifyContent: 'center', gap: Spacing.two, padding: 12 },
  label: {
    alignSelf: 'flex-start',
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
  name: { fontFamily: FontFamily.medium, fontSize: 16, lineHeight: 19 },
});
