/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://unistyl.es/), etc.
 */

import { Platform } from 'react-native';

export const Colors = {
  // Light values come from the Figma design: Primary/Midnight, Primary/Daylight, white cards, Shades/Silver.
  light: {
    text: '#0E0940',
    background: '#EDF6FF',
    backgroundElement: '#FFFFFF',
    backgroundSelected: '#DBDAE6',
    textSecondary: 'rgba(14, 9, 64, 0.65)',
    primary: '#5631E8',
    imageBackground: '#F6F6FF',
    chip: 'rgba(14, 9, 64, 0.08)',
  },
  dark: {
    text: '#ffffff',
    background: '#000000',
    backgroundElement: '#212225',
    backgroundSelected: '#2E3135',
    textSecondary: '#B0B4BA',
    primary: '#8566FF',
    imageBackground: '#17142E',
    chip: 'rgba(255, 255, 255, 0.12)',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

/** Spacing used in the Figma that is not on the scale above. */
export const Radius = { card: 8, label: 4, pill: 99 } as const;

/** "Soft shadow" style from the Figma: drop shadow #30377326, offset (0, 2), blur 15. */
export const SoftShadow = {
  shadowColor: '#303773',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.15,
  shadowRadius: 15,
  elevation: 4,
} as const;

/**
 * Dot colour per Pokémon type.
 * Fire, grass, poison and electric are read from the Figma design.
 * The other types do not appear in the design: those colours are our own choice.
 */
export const TypeColors: Record<string, string> = {
  fire: '#FF4F68',
  grass: '#64BC55',
  poison: '#AB6AC8',
  electric: '#FFCF00',
  // Not in the Figma:
  normal: '#A8A77A',
  water: '#4F9DFF',
  ice: '#7FD6E6',
  fighting: '#D2553B',
  ground: '#D6B05A',
  flying: '#8FA8FF',
  psychic: '#FF6FA8',
  bug: '#A8C23A',
  rock: '#B6A36A',
  ghost: '#735797',
  dragon: '#6F4AF0',
  dark: '#5A4E57',
  steel: '#8FA3B5',
  fairy: '#F2A0D4',
};

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;

/** Rubik, the font from the Figma design. Keys are the names registered with expo-font in the root layout. */
export const FontFamily = {
  light: 'Rubik-Light',
  regular: 'Rubik-Regular',
  medium: 'Rubik-Medium',
  semiBold: 'Rubik-SemiBold',
  bold: 'Rubik-Bold',
  extraBold: 'Rubik-ExtraBold',
} as const;
