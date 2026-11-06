# Pokémon detail

## Goal

Look at one Pokémon: who it is, what type, its facts, its stats and what it evolves from and into.

## Constraints

- One screen, `src/app/pokemon/[id].tsx`, reached from the list, the search results, the favorites and the evolution chain.
- Data: `/pokemon/{id}` for the header, about and stats. The evolution chain uses `/pokemon-species/{id}` and then the chain URL it gives. The species id comes from the detail response, so alternate forms (id above 10000) show the chain of their base Pokémon.
- The evolution tree is turned into stages by a plain function in `src/utils/evolution.ts` (a branch such as Eevee shows all its evolutions in one stage).
- The three tabs stay mounted, so switching is instant and the chain loads in the background.
- Type colours: Fire, Grass, Poison and Electric are from the Figma. The other 14 are our own choice (`TypeColors` in `src/constants/theme.ts`).
- Each tab is its own component in `src/components/`.

## Acceptance Criteria

- [ ] The header shows the name, the number and the artwork.
- [ ] Each type shows as a chip with a dot in the type colour.
- [ ] Tabs "About", "Stats" and "Evolution" switch at once.
- [ ] About lists name, ID, base experience, weight, height, types and abilities.
- [ ] Stats shows the six base stats, each with a value and a bar.
- [ ] Evolution shows the chain from the API, with a dotted line between stages.
- [ ] Tapping a Pokémon in the chain opens its detail. The one you are on cannot be tapped.
- [ ] A Pokémon that does not evolve says "This Pokémon does not evolve."
- [ ] The heart in the top corner adds or removes the favorite (see [favorites](./favorites.md)).
- [ ] The back arrow goes back.
- [ ] A spinner and an error with "Try again" for the detail, and its own spinner and error for the evolution chain.

## Out of Scope

- Moves, held items, locations, sprites of other generations.
- Shiny or alternate artwork.
- Evolution requirements (level, item, trade).
