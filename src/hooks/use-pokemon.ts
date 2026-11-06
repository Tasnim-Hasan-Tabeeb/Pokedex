import { skipToken, useQuery } from '@tanstack/react-query';

import { fetchEvolutionChain, fetchPokemonDetail, fetchPokemonList } from '@/api/pokeapi';

export function usePokemonList() {
  return useQuery({
    queryKey: ['pokemon', 'list'],
    queryFn: fetchPokemonList,
    staleTime: Infinity,
  });
}

/** Pass `undefined` to wait, for example while no Pokémon is chosen yet. */
export function usePokemonDetail(id: number | undefined) {
  return useQuery({
    queryKey: ['pokemon', 'detail', id],
    queryFn: id === undefined ? skipToken : () => fetchPokemonDetail(id),
  });
}

/** Waits until the species id is known (after the detail has loaded), then loads the chain. */
export function useEvolutionChain(speciesId: number | undefined) {
  return useQuery({
    queryKey: ['pokemon', 'evolution', speciesId],
    queryFn: speciesId === undefined ? skipToken : () => fetchEvolutionChain(speciesId),
    staleTime: Infinity,
  });
}
