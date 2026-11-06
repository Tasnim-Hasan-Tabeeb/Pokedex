import { StyleSheet, TextInput, View } from 'react-native';

import { Icon } from '@/components/icon';
import { FontFamily, Radius, SoftShadow, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type SearchBarProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
};

export function SearchBar({ value, onChangeText, placeholder = 'Search for Pokémon..' }: SearchBarProps) {
  const theme = useTheme();

  return (
    <View style={[styles.bar, SoftShadow, { backgroundColor: theme.backgroundElement }]}>
      <Icon name="search" />
      <TextInput
        accessibilityLabel="Search for Pokémon"
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="rgba(0, 0, 0, 0.3)"
        autoCapitalize="none"
        autoCorrect={false}
        style={[styles.input, { color: theme.text }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: Spacing.three,
    paddingVertical: 12,
    borderRadius: Radius.card,
  },
  input: {
    flex: 1,
    padding: 0,
    fontFamily: FontFamily.regular,
    fontSize: 16,
  },
});
