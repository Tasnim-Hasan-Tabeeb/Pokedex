# Search by name

## Goal

Find a Pokémon by typing a part of its name, so I do not have to scroll through the whole list.

## Constraints

- Search field at the top of the first tab, as in the Figma. No new screen.
- PokeAPI has no search endpoint. The search filters the list that is already loaded (`/pokemon?limit=2000`), so it needs no extra request and also finds Pokémon that were never scrolled to.
- The matching logic is a plain function in `src/utils/search.ts`, not inside a component.
- Results use the same cards as the list.

## Acceptance Criteria

- [ ] A search field with the placeholder "Search for Pokémon..".
- [ ] Results update while I type.
- [ ] A part of a name is enough, in any case: "pika" and "PIKA" find Pikachu.
- [ ] It finds a Pokémon far down the list: "mirai" finds Miraidon.
- [ ] While searching, the title "All Pokémon" is hidden and only results show.
- [ ] No match shows "No Pokémon found" with a hint.
- [ ] Clearing the field shows the whole list again.

## Out of Scope

- Search by number or type.
- Search history or suggestions.
- Typo tolerance.
