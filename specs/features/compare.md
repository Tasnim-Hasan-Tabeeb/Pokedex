# Compare

## Goal

Put two Pokémon side by side and see which one is stronger on each stat. The Figma has no screen for this, so the design is ours, in the style of the Figma.

## Constraints

- A third tab, "Compare", `src/app/(tabs)/compare.tsx`. The Figma has no icon for it, so the icons in `assets/icons/compare*.svg` are drawn in the Figma colours.
- Choosing a Pokémon opens a sheet with the same search and cards as the list (`src/components/pokemon-picker.tsx`, reusing `PokemonGrid`).
- Both Pokémon load through `usePokemonDetail`. Nothing new is stored.
- The comparison itself is a plain function in `src/utils/compare.ts`. A higher base stat is the stronger one, equal is a tie.
- Colours, font and bars like the Stats tab in the detail design. The stronger side is purple, the other grey.

## Acceptance Criteria

- [ ] Two cards side by side, each with a "+" until a Pokémon is chosen.
- [ ] Tapping a card opens a search sheet. Tapping a Pokémon fills the card and closes the sheet.
- [ ] Tapping a filled card lets me change the Pokémon. Choosing the same one twice is allowed.
- [ ] Once both are chosen, each of the six stats shows both values and both bars.
- [ ] Per stat, the stronger Pokémon has a purple bar and a bold value. A tie has no purple bar.
- [ ] A sentence says who is stronger in how many stats, or that they are evenly matched.
- [ ] A spinner while the data loads, and an error with "Try again" if it fails.
- [ ] Before two are chosen, a hint says "Choose two Pokémon to see who is stronger."

## Out of Scope

- Comparing more than two Pokémon.
- Types, moves, weight or height in the comparison.
- Saving or sharing a comparison.
- Type effectiveness (who wins a fight).
