import { StyleSheet, View } from 'react-native';

import type { PokemonStat } from '@/api/pokeapi';
import { ThemedText } from '@/components/themed-text';
import { FontFamily, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { formatStatName, statFraction } from '@/utils/stats';

/** The "Stats" tab: a label, the value and a bar for each base stat. */
export function StatsTab({ stats }: { stats: readonly PokemonStat[] }) {
  const theme = useTheme();

  return (
    <View style={styles.list}>
      {stats.map((stat) => (
        <View key={stat.name} style={styles.stat}>
          <View style={styles.labels}>
            <ThemedText style={styles.name}>{formatStatName(stat.name)}</ThemedText>
            <ThemedText style={[styles.value, { color: theme.textSecondary }]}>{stat.value}</ThemedText>
          </View>
          <View
            accessible
            accessibilityRole="progressbar"
            accessibilityLabel={`${formatStatName(stat.name)} ${stat.value}`}
            style={[styles.track, { backgroundColor: theme.track }]}
          >
            <View style={[styles.fill, { backgroundColor: theme.primary, width: `${statFraction(stat.value) * 100}%` }]} />
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  list: { gap: Spacing.four },
  stat: { gap: 7 },
  labels: { flexDirection: 'row', justifyContent: 'space-between' },
  name: { fontFamily: FontFamily.semiBold, fontSize: 14, lineHeight: 18 },
  value: { fontFamily: FontFamily.regular, fontSize: 14, lineHeight: 18, textAlign: 'right' },
  track: { height: 4, borderRadius: Radius.pill, overflow: 'hidden' },
  fill: { height: 4, borderRadius: Radius.pill },
});
