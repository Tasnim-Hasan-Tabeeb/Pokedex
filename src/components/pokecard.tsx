import { Image } from 'expo-image';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { Icon } from '@/components/icon';
import { ThemedText } from '@/components/themed-text';
import { FontFamily, Radius, SoftShadow, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { formatName, formatNumber } from '@/utils/format';

type PokecardProps = {
  id: number;
  name: string;
  imageUrl: string;
  onPress: () => void;
  /** Shows the "more" dots when given. */
  onMore?: () => void;
};

export function Pokecard({ id, name, imageUrl, onPress, onMore }: PokecardProps) {
  const theme = useTheme();
  const displayName = formatName(name);
  // Some entries (alternate forms) have no official artwork: show the Pokémon icon instead.
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${displayName}, number ${formatNumber(id)}`}
      onPress={onPress}
      style={[styles.card, SoftShadow, { backgroundColor: theme.backgroundElement }]}
    >
      <View style={[styles.imageArea, { backgroundColor: theme.imageBackground }]}>
        {imageFailed ? (
          <View style={styles.fallback}>
            <Icon name="pokemon" size={48} style={styles.fallbackIcon} />
          </View>
        ) : (
          <Image
            source={imageUrl}
            contentFit="contain"
            cachePolicy="memory-disk"
            recyclingKey={String(id)}
            transition={150}
            onError={() => setImageFailed(true)}
            style={styles.image}
          />
        )}
        <View style={[styles.label, { backgroundColor: theme.primary }]}>
          <ThemedText style={styles.labelText}>{formatNumber(id)}</ThemedText>
        </View>
      </View>
      <View style={styles.footer}>
        <ThemedText style={styles.name} numberOfLines={1} ellipsizeMode="tail">
          {displayName}
        </ThemedText>
        {onMore ? (
          <Pressable accessibilityRole="button" accessibilityLabel={`Options for ${displayName}`} onPress={onMore}>
            <Icon name="more" />
          </Pressable>
        ) : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: Radius.card,
    overflow: 'hidden',
  },
  imageArea: {
    aspectRatio: 1,
    padding: Spacing.three,
  },
  image: {
    flex: 1,
  },
  fallback: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fallbackIcon: {
    opacity: 0.3,
  },
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
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    // Fixed height so every card in the grid is the same size.
    height: 48,
  },
  name: {
    flex: 1,
    fontFamily: FontFamily.medium,
    fontSize: 16,
    lineHeight: 19,
  },
});
