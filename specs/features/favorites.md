# Favorites

## Goal

Save the Pokémon I like and open them again later, also after closing the app.

## Constraints

- Stored in SQLite, table `favorites` (`id`, `name`), in `src/db/database.ts` and `src/db/favorites-repository.ts`. All SQL stays in `src/db/`.
- Screens reach it through the hooks in `src/hooks/use-favorites.ts` (TanStack Query), never through the database directly.
- Adding or removing gives haptic feedback (the native feature of the app).
- The Favorites screen is the second tab, `src/app/(tabs)/favorites.tsx`, and uses the same card grid as the list.
- The favorite button is the heart on the detail screen.

## Acceptance Criteria

- [ ] Tapping the heart on a detail screen adds the Pokémon. The heart turns red.
- [ ] Tapping the red heart removes it again.
- [ ] The phone gives a short tap when I add or remove one.
- [ ] The Favorites tab shows my favorites under "My favorites", with the same cards as the list.
- [ ] Tapping a favorite opens its detail screen.
- [ ] With no favorites, the screen says "No favorites yet" and how to add one.
- [ ] Favorites are still there after I close and reopen the app.
- [ ] A spinner while loading and an error with "Try again" if reading fails.

## Out of Scope

- Sorting or reordering favorites.
- Adding a favorite from a card in the list (the "⋮" menu).
- Syncing between phones.
