const BASE_URL = 'https://pokeapi.co/api/v2';

export type PokemonListItem = {
  id: number;
  name: string;
};

type PokemonListResponse = {
  results: { name: string; url: string }[];
};

export type PokemonStat = {
  /** PokeAPI name, e.g. "special-attack". */
  name: string;
  value: number;
};

export type PokemonDetail = {
  id: number;
  name: string;
  /** The species this Pokémon belongs to. Alternate forms share it with their base Pokémon. */
  speciesId: number;
  types: string[];
  stats: PokemonStat[];
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
  species: { url: string };
  types: { type: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
  base_experience: number | null;
  /** PokeAPI gives hectograms. */
  weight: number;
  /** PokeAPI gives decimetres. */
  height: number;
  abilities: { ability: { name: string } }[];
};

/** One Pokémon in the evolution chain, with the Pokémon it evolves into. */
export type EvolutionNode = {
  id: number;
  name: string;
  evolvesTo: EvolutionNode[];
};

type SpeciesResponse = {
  evolution_chain: { url: string };
};

type ChainLinkResponse = {
  species: { name: string; url: string };
  evolves_to: ChainLinkResponse[];
};

type EvolutionChainResponse = {
  chain: ChainLinkResponse;
};

async function getJson<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`PokeAPI request failed (${response.status})`);
  }
  return response.json();
}

/** "https://pokeapi.co/api/v2/pokemon-species/25/" -> 25 */
function idFromUrl(url: string): number {
  return Number(url.split('/').filter(Boolean).pop());
}

export function artworkUrl(id: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

export async function fetchPokemonList(): Promise<PokemonListItem[]> {
  const data = await getJson<PokemonListResponse>(`${BASE_URL}/pokemon?limit=2000`);
  return data.results.map((entry) => ({
    id: idFromUrl(entry.url),
    name: entry.name,
  }));
}

export async function fetchPokemonDetail(id: number): Promise<PokemonDetail> {
  const data = await getJson<PokemonDetailResponse>(`${BASE_URL}/pokemon/${id}`);
  return {
    id: data.id,
    name: data.name,
    speciesId: idFromUrl(data.species.url),
    types: data.types.map((t) => t.type.name),
    stats: data.stats.map((s) => ({ name: s.stat.name, value: s.base_stat })),
    baseExperience: data.base_experience,
    weight: data.weight / 10,
    height: data.height / 10,
    abilities: data.abilities.map((a) => a.ability.name),
  };
}

function toEvolutionNode(link: ChainLinkResponse): EvolutionNode {
  return {
    id: idFromUrl(link.species.url),
    name: link.species.name,
    evolvesTo: link.evolves_to.map(toEvolutionNode),
  };
}

/** The species names its evolution chain, and the chain endpoint gives the whole family tree. */
export async function fetchEvolutionChain(speciesId: number): Promise<EvolutionNode> {
  const species = await getJson<SpeciesResponse>(`${BASE_URL}/pokemon-species/${speciesId}`);
  const chain = await getJson<EvolutionChainResponse>(species.evolution_chain.url);
  return toEvolutionNode(chain.chain);
}
