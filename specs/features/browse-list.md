# Browse the list

## Goal

See every Pokémon as a grid of cards and scroll through them, so I can find one by looking.

## Constraints

- Lives on the first tab, `src/app/(tabs)/index.tsx`.
- One request for the whole list: `/pokemon?limit=2000`. The id comes from the URL of each entry.
- Only render what is near the screen (a virtualized list, `windowSize` and `removeClippedSubviews`). Images are cached on the phone.
- Cards look like the Pokécard in the Figma: number label, artwork, name. Colours, font and spacing from `src/constants/theme.ts`.
- The grid is shared with the search, favorites and picker (`src/components/pokemon-grid.tsx`).

## Acceptance Criteria

- [ ] All Pokémon show in two columns under the title "All Pokémon".
- [ ] Each card has the number (`001`), the artwork and the name.
- [ ] Scrolling stays smooth through the whole list.
- [ ] A spinner shows while the list loads.
- [ ] If the request fails, an error with the message and a "Try again" button shows.
- [ ] Pulling down refreshes the list.
- [ ] A Pokémon without artwork shows a faded Pokéball instead of an empty space.
- [ ] Tapping a card opens its detail screen.

## Out of Scope

- Filtering by type or generation.
- Sorting.
- Loading the list in pages from the API.
