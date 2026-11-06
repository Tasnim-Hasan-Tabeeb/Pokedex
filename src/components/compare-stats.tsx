import { StyleSheet, View } from 'react-native';

import type { PokemonDetail } from '@/api/pokeapi';
import { ThemedText } from '@/components/themed-text';
import { FontFamily, Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { compareStats, summarize, type StatComparison } from '@/utils/compare';
import { formatName } from '@/utils/format';
import { formatStatName, statFraction } from '@/utils/stats';

type CompareStatsProps = {
  first: PokemonDetail;
  second: PokemonDetail;
};

function verdict(first: PokemonDetail, second: PokemonDetail, rows: readonly StatComparison[]): string {
  const { firstWins, secondWins } = summarize(rows);
  if (firstWins === secondWins) return `${formatName(first.name)} and ${formatName(second.name)} are evenly matched.`;
  const winner = firstWins > secondWins ? first : second;
  const wins = Math.max(firstWins, secondWins);
  return `${formatName(winner.name)} is stronger in ${wins} of ${rows.length} stats.`;
}

function rowLabel(row: StatComparison, first: PokemonDetail, second: PokemonDetail): string {
  const stat = formatStatName(row.name);
  const values = `${formatName(first.name)} ${row.first}, ${formatName(second.name)} ${row.second}`;
  if (row.winner === 'tie') return `${stat}: ${values}. Equal`;
  return `${stat}: ${values}. ${formatName(row.winner === 'first' ? first.name : second.name)} is stronger`;
}

/** Per stat: both values and bars side by side. The stronger one is purple, the other one grey. */
export function CompareStats({ first, second }: CompareStatsProps) {
  const theme = useTheme();
  const rows = compareStats(first.stats, second.stats);

  const fillColor = (isWinner: boolean) => (isWinner ? theme.primary : theme.backgroundSelected);

  return (
    <View style={styles.container}>
      <ThemedText style={[styles.verdict, { color: theme.primary }]}>{verdict(first, second, rows)}</ThemedText>
      {rows.map((row) => (
        <View key={row.name} accessible accessibilityLabel={rowLabel(row, first, second)} style={styles.stat}>
          <ThemedText style={styles.statName}>{formatStatName(row.name)}</ThemedText>
          <View style={styles.bars}>
            <ThemedText style={[styles.value, row.winner === 'first' && styles.winnerValue]}>{row.first}</ThemedText>
            <View style={[styles.track, styles.trackFirst, { backgroundColor: theme.track }]}>
              <View
                style={[
                  styles.fill,
                  { width: `${statFraction(row.first) * 100}%`, backgroundColor: fillColor(row.winner === 'first') },
                ]}
              />
            </View>
            <View style={[styles.track, { backgroundColor: theme.track }]}>
              <View
                style={[
                  styles.fill,
                  { width: `${statFraction(row.second) * 100}%`, backgroundColor: fillColor(row.winner === 'second') },
                ]}
              />
            </View>
            <ThemedText style={[styles.value, styles.valueSecond, row.winner === 'second' && styles.winnerValue]}>
              {row.second}
            </ThemedText>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: Spacing.three },
  verdict: { fontFamily: FontFamily.semiBold, fontSize: 16, lineHeight: 20, textAlign: 'center' },
  stat: { gap: 7 },
  statName: { fontFamily: FontFamily.semiBold, fontSize: 14, lineHeight: 18, textAlign: 'center' },
  bars: { flexDirection: 'row', alignItems: 'center', gap: Spacing.two },
  value: { width: 32, fontFamily: FontFamily.regular, fontSize: 14, lineHeight: 18 },
  valueSecond: { textAlign: 'right' },
  winnerValue: { fontFamily: FontFamily.bold },
  track: { flex: 1, height: 4, borderRadius: Radius.pill, overflow: 'hidden' },
  // The first bar fills from the middle towards the left, the second from the middle towards the right.
  trackFirst: { flexDirection: 'row-reverse' },
  fill: { height: 4, borderRadius: Radius.pill },
});
