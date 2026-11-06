const BASE_URL = 'https://pokeapi.co/api/v2';

export type PokemonListItem = {
  id: number;
  name: string;
};

type PokemonListResponse = {
  results: { name: string; url: string }[];
};

export type PokemonDetail = {
  id: number;
  name: string;
  types: string[];
  baseExperience: number | null;
  /** In kilograms. */
  weight: number;
  /** In metres. */
  height: number;
  abilities: string[];
};

type PokemonDetailResponse = {
  id: number;
  name: string;
  types: { type: { name: string } }[];
  base_experience: number | null;
  /** PokeAPI gives hectograms. */
  weight: number;
  /** PokeAPI gives decimetres. */
  height: number;
  abilities: { ability: { name: string } }[];
};

async function getJson<T>(path: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`);
  if (!response.ok) {
    throw new Error(`PokeAPI request failed (${response.status})`);
  }
  return (await response.json()) as T;
}

export function artworkUrl(id: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

export async function fetchPokemonList(): Promise<PokemonListItem[]> {
  const data = await getJson<PokemonListResponse>('/pokemon?limit=2000');
  return data.results.map((entry) => ({
    id: Number(entry.url.split('/').filter(Boolean).pop()),
    name: entry.name,
  }));
}

export async function fetchPokemonDetail(id: number): Promise<PokemonDetail> {
  const data = await getJson<PokemonDetailResponse>(`/pokemon/${id}`);
  return {
    id: data.id,
    name: data.name,
    types: data.types.map((t) => t.type.name),
    baseExperience: data.base_experience,
    weight: data.weight / 10,
    height: data.height / 10,
    abilities: data.abilities.map((a) => a.ability.name),
  };
}
