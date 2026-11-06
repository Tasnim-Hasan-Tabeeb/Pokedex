import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { FontFamily, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type SegmentedTabsProps = {
  tabs: readonly string[];
  value: string;
  onChange: (tab: string) => void;
};

/** The About / Stats / Evolution switcher from the detail design. */
export function SegmentedTabs({ tabs, value, onChange }: SegmentedTabsProps) {
  const theme = useTheme();

  return (
    <View style={styles.row}>
      {tabs.map((tab) => {
        const active = tab === value;
        return (
          <Pressable
            key={tab}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
            onPress={() => onChange(tab)}
            style={[styles.tab, { borderBottomColor: active ? theme.primary : theme.backgroundSelected }]}
          >
            <ThemedText style={[styles.label, { opacity: active ? 1 : 0.5 }]}>{tab}</ThemedText>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  tab: {
    flex: 1,
    borderBottomWidth: 2,
    paddingTop: 5,
    paddingBottom: 10,
  },
  label: {
    fontFamily: FontFamily.semiBold,
    fontSize: 14,
    lineHeight: 17,
    textAlign: 'center',
    marginHorizontal: Spacing.half,
  },
});
