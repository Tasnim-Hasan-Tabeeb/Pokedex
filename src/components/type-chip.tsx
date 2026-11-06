import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { FontFamily, Radius, Spacing, TypeColors } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { formatName } from '@/utils/format';

const FALLBACK_COLOR = '#A8A77A';

export function TypeChip({ type }: { type: string }) {
  const theme = useTheme();

  return (
    <View style={[styles.chip, { backgroundColor: theme.chip }]}>
      <View style={[styles.dot, { backgroundColor: TypeColors[type] ?? FALLBACK_COLOR }]} />
      <ThemedText style={styles.text}>{formatName(type)}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    paddingLeft: 12,
    paddingRight: 14,
    paddingVertical: Spacing.one,
    borderRadius: Radius.pill,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  text: {
    fontFamily: FontFamily.semiBold,
    fontSize: 16,
    lineHeight: 24,
  },
});
