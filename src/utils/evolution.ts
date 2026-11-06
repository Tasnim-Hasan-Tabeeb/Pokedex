export type EvolutionEntry = { id: number; name: string };

type ChainNode = EvolutionEntry & { evolvesTo: readonly ChainNode[] };

/**
 * Turns the evolution tree into stages, one list per step.
 * Pichu -> Pikachu -> Raichu gives [[Pichu], [Pikachu], [Raichu]].
 * A branch such as Eevee gives [[Eevee], [Vaporeon, Jolteon, ...]].
 */
export function toStages(root: ChainNode): EvolutionEntry[][] {
  const stages: EvolutionEntry[][] = [];
  let current: readonly ChainNode[] = [root];

  while (current.length > 0) {
    stages.push(current.map(({ id, name }) => ({ id, name })));
    current = current.flatMap((node) => node.evolvesTo);
  }
  return stages;
}
