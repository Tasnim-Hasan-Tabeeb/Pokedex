# Explanation - Pokédex

**Route:** Pokédex. **Tools:** Claude Code.

## 1. Your technical choices

**What I store in SQLite: the favorites.** The table `favorites` (`id`, `name`) is created in `src/db/database.ts:10`, and the database file `pokedex.db` is opened on line 8. The reading and writing is in `src/db/favorites-repository.ts`: `getFavorites` (line 5), `addFavorite` with `INSERT OR REPLACE` (line 12) and `removeFavorite` with `DELETE` (line 20). I chose SQLite and not AsyncStorage because the `id` is the primary key, so one Pokémon can never be a favorite twice, and add and remove are one statement each. I store the name next to the id so the Favorites screen can show its cards without waiting for the network. I did not store the Pokémon data itself, because the API stays the source of truth and TanStack Query caches it. This did not change while I built.

**Which native feature: haptics.** The phone gives a medium tap when a favorite is added or removed, in `src/hooks/use-favorites.ts:23`, after the database write succeeded. I chose haptics and not Share because it gives instant feedback on the heart button, needs no permission, and does not need a screen that the Figma does not have. This did not change while I built.

## 2. Pick one feature and explain how it works, from API call to screen.

**Evolution chain (the "Evolution" tab of the detail screen).**

1. The detail screen (`src/app/pokemon/[id].tsx`) loads the Pokémon with `usePokemonDetail` (line 28). The answer contains the `speciesId`.
2. It passes that id to `EvolutionTab` (line 79). The tab calls `useEvolutionChain(speciesId)` (`src/components/evolution-tab.tsx:19`, hook in `src/hooks/use-pokemon.ts:22`). TanStack Query caches it per species and never marks it stale, so going back and forth does not reload.
3. The hook calls `fetchEvolutionChain` (`src/api/pokeapi.ts:116`). That needs two requests: `/pokemon-species/{id}` gives the URL of the chain, and then the chain URL gives the whole family tree. `toEvolutionNode` (line 107) turns the API's tree into my own `EvolutionNode` with an id, a name and the Pokémon it evolves into.
4. `toStages` (`src/utils/evolution.ts:10`) turns the tree into stages, one list per step. A straight chain gives one Pokémon per stage. A branch like Eevee gives one stage with all its evolutions.
5. `EvolutionTab` draws a card per Pokémon (`src/components/evolution-card.tsx`) with a dotted line between stages. Tapping a card does `router.push` to that Pokémon's detail (`src/components/evolution-tab.tsx:41`). The Pokémon you are already on is not tappable (`isCurrent`, line 40).
6. While it loads, the tab shows its own small spinner, and if the request fails it shows an error with "Try again" (`evolution-tab.tsx:21-22`). A Pokémon that does not evolve says so. The three tabs stay mounted and only hide (`[id].tsx:72-80`), so the chain loads in the background while you read About, and switching is instant.

## 3. Name a suggestion from the agent that you rejected or changed.

TODO: write this one yourself, in your own words. It must be something that really happened in your chats. Say:

After building the list, the agent suggested I write the specs and set up git first, because they are needed for a pass. I said no and built search instead, and did the same after favorites: the agent suggested the hand-in files, and I built Compare first. I noticed it in the chat when the agent asked "write the specs first, or go straight to D?" and I answered "Do D now". The result was that all the app features were done, but the specs, AGENTS.md and issues were written at the end, so my issues do not have a plan from before the build. Next time I would write the spec for each feature before building it. Chat: chat-history/ (the messages right after sections C and F).
