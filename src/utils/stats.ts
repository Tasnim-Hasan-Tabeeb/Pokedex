const LABELS: Record<string, string> = {
  hp: 'HP',
  attack: 'Attack',
  defense: 'Defense',
  'special-attack': 'Special Attack',
  'special-defense': 'Special Defense',
  speed: 'Speed',
};

/** "special-attack" -> "Special Attack" */
export function formatStatName(name: string): string {
  return LABELS[name] ?? name;
}

/** The highest base stat a bar fills up to. Values above it still show a full bar. */
const BAR_MAX = 150;

/** 0 to 1, how full the bar of a stat is. */
export function statFraction(value: number): number {
  return Math.min(Math.max(value / BAR_MAX, 0), 1);
}
