import { useDeferredValue } from 'react';

import { usePokemonList } from '@/hooks/use-pokemon';
import { filterByName } from '@/utils/search';

/** The full Pokémon list, filtered by what the user typed. Typing stays smooth while the list updates. */
export function usePokemonSearch(query: string) {
  const list = usePokemonList();
  const deferredQuery = useDeferredValue(query);
  const results = list.data ? filterByName(list.data, deferredQuery) : [];

  return { ...list, results, isSearching: deferredQuery.trim() !== '' };
}
