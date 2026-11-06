import { StyleSheet, View } from 'react-native';

import type { PokemonDetail } from '@/api/pokeapi';
import { ThemedText } from '@/components/themed-text';
import { FontFamily, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { formatName, formatNumber } from '@/utils/format';

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

/** The "About" tab: a table of facts. */
export function AboutTab({ pokemon }: { pokemon: PokemonDetail }) {
  const theme = useTheme();

  return (
    <View style={styles.list}>
      {aboutRows(pokemon).map(([label, value]) => (
        <View key={label} style={styles.row}>
          <ThemedText style={styles.label}>{label}</ThemedText>
          <ThemedText style={[styles.value, { color: theme.textSecondary }]}>{value}</ThemedText>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  list: { gap: Spacing.three },
  row: { flexDirection: 'row', gap: Spacing.three },
  label: { width: 100, fontFamily: FontFamily.semiBold, fontSize: 14, lineHeight: 18 },
  value: { flex: 1, fontFamily: FontFamily.regular, fontSize: 14, lineHeight: 18 },
});
