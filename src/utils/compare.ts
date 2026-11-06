import type { PokemonStat } from '@/api/pokeapi';

export type StatWinner = 'first' | 'second' | 'tie';

export type StatComparison = {
  /** PokeAPI stat name, e.g. "special-attack". */
  name: string;
  first: number;
  second: number;
  winner: StatWinner;
};

export type CompareSummary = {
  firstWins: number;
  secondWins: number;
  ties: number;
};

/** Puts the stats of two Pokémon side by side. A higher base stat is the stronger one. */
export function compareStats(first: readonly PokemonStat[], second: readonly PokemonStat[]): StatComparison[] {
  return first.map((stat) => {
    const other = second.find((candidate) => candidate.name === stat.name)?.value ?? 0;
    const winner: StatWinner = stat.value === other ? 'tie' : stat.value > other ? 'first' : 'second';
    return { name: stat.name, first: stat.value, second: other, winner };
  });
}

export function summarize(rows: readonly StatComparison[]): CompareSummary {
  return {
    firstWins: rows.filter((row) => row.winner === 'first').length,
    secondWins: rows.filter((row) => row.winner === 'second').length,
    ties: rows.filter((row) => row.winner === 'tie').length,
  };
}
