# Pokédex

A Pokédex for your phone. It lists every Pokémon from PokeAPI, lets you search by name, shows a detail page with about, stats and evolution chain, keeps a list of favorites, and compares two Pokémon stat by stat. It is for anyone who wants to look up a Pokémon quickly. The design follows the course's [Figma file](https://www.figma.com/design/dsgGXcu5WELIvRW90m5308/Pok%C3%A9mon-Code-Challenge?node-id=1-2).

## Core action

Find a Pokémon and look at it.

## Features

1. [Browse the list](./features/browse-list.md): all Pokémon as a grid of cards, loads fast, scrolls smoothly.
2. [Search by name](./features/search.md): type part of a name, results show while you type.
3. [Pokémon detail](./features/detail.md): name, number, artwork, types, and three tabs (about, stats, evolution).
4. [Favorites](./features/favorites.md): save a Pokémon, see them on their own screen, still there after a restart.
5. [Compare](./features/compare.md): pick two Pokémon and see who is stronger on each stat.

## Data

- **API**: [PokeAPI](https://pokeapi.co/docs/v2). Public, no key, no login.
- **Endpoints**:
  - `/pokemon?limit=2000`: the whole list (name and id) in one request, for the list, the search and the pickers.
  - `/pokemon/{id}`: detail (types, stats, weight, height, abilities, base experience, species).
  - `/pokemon-species/{id}`: gives the URL of the evolution chain.
  - `/evolution-chain/{id}`: the evolution tree.
  - Artwork comes from the PokeAPI sprites repository (`official-artwork/{id}.png`).
- **Stored on the phone**: table `favorites` in SQLite with `id` (the Pokémon id, primary key) and `name`.

## Technical choices

- **Stored in SQLite**: the favorites (`id` and `name`). I did not store the Pokémon data itself, because the API is the source of truth and TanStack Query already caches it while the app is open. Alternative: AsyncStorage with a JSON list. I picked SQLite because the `id` as primary key makes a duplicate favorite impossible, `INSERT OR REPLACE` and `DELETE` are one statement each, and the list comes back sorted from the database. The `name` is stored next to the `id` so the Favorites screen can draw its cards without waiting for the network (the artwork URL is built from the `id`).
- **Native feature**: haptics, a medium tap on the phone when a Pokémon is added to or removed from the favorites (in `src/hooks/use-favorites.ts`). Alternative: Share, sending a Pokémon to a friend from the detail screen. I picked haptics because it gives instant feedback on the heart button, needs no permission and no extra screen, and works in Expo Go. Share needs a message design and a place in the UI that the Figma does not have.

## Technical core

- [x] Runs in Expo Go
- [x] Live data through TanStack Query
- [x] At least 2 screens with Expo Router
- [x] Something in SQLite that survives a restart
- [x] Loading and error state on every load
- [x] One native feature: haptics, when you favorite or unfavorite a Pokémon
- [x] TypeScript and ESLint without errors
- [x] UI, data and logic in separate files

## Optional

- [ ] Three different Reanimated animations, each with a purpose
- [ ] Dark mode: every screen looks right, all colours from the theme
- [ ] Pagination: page by page while you scroll, not all at once
- [x] Clean TypeScript: no `any`, no `as` casts, no `@ts-ignore`
- [ ] Localization: two languages
- [ ] No warnings: no `console.log`, none in the terminal or on screen
- [ ] Offline: works in airplane mode with the last data
- [ ] Tests: one per feature on the logic, `npm test` passes
- [ ] CI: lint and tsc on every push
- [ ] Accessibility: button labels, largest text size
- [ ] Optimistic update

## Out of scope

- Accounts, or syncing favorites between phones.
- Moves, abilities in detail, items, or any data beyond what the detail tabs show.
- A web version.
- Filtering by type or generation.
- The options menu behind the "⋮" on a card (it is in the Figma, but not built).
