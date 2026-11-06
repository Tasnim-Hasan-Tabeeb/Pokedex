import { useQuery } from '@tanstack/react-query';

import { fetchPokemonDetail, fetchPokemonList } from '@/api/pokeapi';

export function usePokemonList() {
  return useQuery({
    queryKey: ['pokemon', 'list'],
    queryFn: fetchPokemonList,
    staleTime: Infinity,
  });
}

export function usePokemonDetail(id: number) {
  return useQuery({
    queryKey: ['pokemon', 'detail', id],
    queryFn: () => fetchPokemonDetail(id),
  });
}
