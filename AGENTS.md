# Pokédex

A Pokédex for your phone, running on live data from PokeAPI (no key, no login). It follows the course's Figma design. Product spec: `specs/product.md`. One spec per feature: `specs/features/`.

- Expo Router, TanStack Query, expo-sqlite. Must run in Expo Go.
- Screens in `src/app/`. Data goes through hooks in `src/hooks/`. API calls are in `src/api/pokeapi.ts`. SQL is only in `src/db/`. Plain logic (matching, comparing, formatting) is in `src/utils/`. Components are in `src/components/`. A screen never calls `fetch` or SQL itself.
- Shared setup, reuse it and never add a second one:
  - The one `QueryClient` is in `src/app/_layout.tsx`.
  - The one database is `getDatabase()` in `src/db/database.ts`. New tables are created there.
  - The card grid for the list, search, favorites and compare picker is `PokemonGrid` (`src/components/pokemon-grid.tsx`).
  - Loading, error and empty states are in `src/components/query-status.tsx`. Use `compact` for a part of a screen.
  - Icons are SVGs from the Figma in `assets/icons/`, shown with `<Icon name="..." />` (`src/components/icon.tsx`). Do not draw or import other icon sets.
- Design: no hard-coded colours, sizes or fonts in a component. Use `useTheme()`, `Spacing`, `Radius`, `SoftShadow`, `TypeColors` and `FontFamily` from `src/constants/theme.ts`. The font is Rubik. Choose the weight with `FontFamily`, never with `fontWeight` (custom fonts on Android ignore it). Only fire, grass, poison and electric type colours are in the Figma. The others are our own choice. Say so when you add one.
- Do not add a dependency without asking. If you do, install it with `npx expo install`.
- Do not use `console.log`, `any`, `@ts-ignore` or `as` casts. Narrow the type instead.
- A web build is a quick way to see a screen (`npx expo start --web`). Expo Go on the phone is the real test. `metro.config.js` adds `.wasm` only so expo-sqlite loads on web.
- Before you call something done: run `npx tsc --noEmit` and `npm run lint`. Both must have no errors.
- Before you write code for an issue: post a plan (which files, how, what you are unsure about) and a `- [ ] ` task list as one comment on the issue with `gh issue comment`. Wait for my go. Tick off tasks with `gh issue comment --edit-last` while you build.

---

This is an Expo/React Native mobile application. Prioritize mobile-first patterns, performance, and cross-platform compatibility.

## Expo has changed — do not trust your training data

Expo ships breaking changes every SDK release. APIs you remember are likely renamed, moved, or removed. Before writing any code that touches an Expo, EAS, or React Native API:

1. Read the major version of the `expo` package in `package.json`.
2. Fetch the matching versioned docs: `https://docs.expo.dev/versions/v<major>.0.0/`
3. For anything else, fetch https://docs.expo.dev/llms.txt — an index of all Expo docs with corrections to common LLM misconceptions. Follow its links to the specific page you need; never answer from memory.

## Commands

Use `bunx` instead of `npx` if the project uses bun (`bun.lock` present).

```bash
npx expo install <package>  # ALWAYS use instead of npm/yarn/pnpm/bun add — resolves SDK-compatible versions
npx expo start              # start the dev server
npx expo lint               # lint
npx tsc --noEmit            # typecheck
npx expo-doctor             # diagnose dependency and config issues
npx expo install --fix      # fix incompatible package versions
```

Run lint and typecheck before declaring any task done.

## Navigation & Routing

- Use **Expo Router** for all navigation. Routes live in `src/app/` — every file there is a screen, `_layout.tsx` files define navigators. Keep non-route code (components, hooks, utils) outside `src/app/`.
- Import `Link`, `router`, and `useLocalSearchParams` from `expo-router`.
- Docs: https://docs.expo.dev/router/introduction.md

## Building with EAS

Use EAS to build, sign, and submit the app in the cloud (`eas build`, `eas submit`) and to ship over-the-air updates (`eas update`) — no local Xcode or Android Studio required. Run EAS CLI as `bunx eas-cli <command>` in Bun projects, or `npx eas-cli@latest <command>` otherwise; substitute that for bare `eas` in docs examples.
Docs: https://docs.expo.dev/eas/index.md

## Rules

- If `ios/` and `android/` directories do not exist, they are generated (Continuous Native Generation). Never create or edit them by hand — configure native behavior in `app.json` and config plugins.
- Expo Go only includes its bundled native modules. After adding a library with native code, the app needs a development build: `npx expo run:ios|android` locally, or `eas build --profile development`.
- Prefer recommended Expo modules over third-party libraries, and check your available skills before adding dependencies. Docs: https://docs.expo.dev/versions/latest/index.md
