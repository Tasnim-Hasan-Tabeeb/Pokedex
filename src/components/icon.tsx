import { Image } from 'expo-image';
import type { ImageStyle, StyleProp } from 'react-native';

/** Icons exported from the Figma design. Each file already has its own colour. */
const ICONS = {
  search: require('../../assets/icons/search.svg'),
  more: require('../../assets/icons/more.svg'),
  back: require('../../assets/icons/back.svg'),
  heart: require('../../assets/icons/heart.svg'),
  /** Purple heart: the active "Favorites" tab. */
  heartFilled: require('../../assets/icons/heart-filled.svg'),
  /** Red heart: a Pokémon that is a favorite, on the detail screen. */
  heartActive: require('../../assets/icons/heart-active.svg'),
  pokemon: require('../../assets/icons/pokemon.svg'),
  pokemonActive: require('../../assets/icons/pokemon-active.svg'),
  /** Not in the Figma: drawn in the same colours for the Compare tab. */
  compare: require('../../assets/icons/compare.svg'),
  compareActive: require('../../assets/icons/compare-active.svg'),
  /** Dotted line between two Pokémon in the evolution chain (80 x 20). */
  evolutionLink: require('../../assets/icons/evolution-link.svg'),
};

export type IconName = keyof typeof ICONS;

type IconProps = {
  name: IconName;
  /** Width and height of a square icon. */
  size?: number;
  /** For icons that are not square. Overrides `size`. */
  width?: number;
  height?: number;
  style?: StyleProp<ImageStyle>;
};

export function Icon({ name, size = 24, width, height, style }: IconProps) {
  return <Image source={ICONS[name]} style={[{ width: width ?? size, height: height ?? size }, style]} />;
}
