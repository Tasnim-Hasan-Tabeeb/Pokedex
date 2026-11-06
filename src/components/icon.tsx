import { Image } from 'expo-image';
import type { ImageStyle, StyleProp } from 'react-native';

/** Icons exported from the Figma design. Each file already has its own colour. */
const ICONS = {
  search: require('../../assets/icons/search.svg'),
  more: require('../../assets/icons/more.svg'),
  heart: require('../../assets/icons/heart.svg'),
  heartFilled: require('../../assets/icons/heart-filled.svg'),
  pokemon: require('../../assets/icons/pokemon.svg'),
  pokemonActive: require('../../assets/icons/pokemon-active.svg'),
};

export type IconName = keyof typeof ICONS;

type IconProps = {
  name: IconName;
  size?: number;
  style?: StyleProp<ImageStyle>;
};

export function Icon({ name, size = 24, style }: IconProps) {
  return <Image source={ICONS[name]} style={[{ width: size, height: size }, style]} />;
}
