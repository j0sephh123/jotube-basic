i am implementing feature sliced design for client, but it is not ready yet, you shouldn't try to implement it all at once, only when tasked with that you should look into the following files:

- client/steiger.config.ts
- client/eslint.config.js
- client/tsconfig.app.json
- client/package.json

DO NOT DISABLE ESLINT RULES

## 0) Non‑negotiables

- Do not ask questions. Apply fixes.
- Prefer **moving files** (public API) over config changes; prefer **config** only if move is impossible; **rewrite** only if API is broken.
- Keep changes minimal and consistent with existing patterns.

## 1) Layers & Paths

- Layers: `app/`, `pages/`, `widgets/`, `features/`, `entities/`, `shared/`.
- Allowed deps:

  - `app → pages, widgets, features, entities, shared`
  - `pages → widgets, features, entities, shared`
  - `widgets → features, entities, shared`
  - `features → entities, shared`
  - `entities → shared`
  - `shared → (none)`

- Never create a new top‑level layer.

## 2) Imports

- Use layer aliases only: `@app/*`, `@pages/*`, `@widgets/*`, `@features/*`, `@entities/*`, `@shared/*`.
- **Ban** `@/*` and deep internal paths. Import **only via public API barrels** (`index.ts`) one level deep, e.g. `@features/Playlist`.
- If code imports internal modules (e.g. `@features/Playlist/model/...`), **fix by**:

  1. Creating/adjusting the feature barrel `src/features/Playlist/index.ts` to re‑export needed symbols.
  2. Updating call sites to `@features/Playlist`.

## 3) Public API barrels

- Each unit (`features/X`, `widgets/X`, `entities/X`) **must** export from its local `index.ts`:

  - `export * from "./ui/...";`
  - `export * from "./model/...";` (only if intentionally public)
  - `export type { ... } from "./model/types";`

- Do not re‑export private implementation files. Keep public surface small.

## 4) Type imports

- Convert all type usages to **type‑only** imports:

  - `import type { Foo } from "..."` (no value import).

- If both type+value are imported, split into two lines.

## 5) When lint/arch errors appear, fix in this order

### A) `import/no-internal-modules` (deep import)

1. Add/extend barrel in the source unit.
2. Change all imports to the unit’s barrel path: `@layer/UnitName`.

### B) `boundaries/element-types` (layer violation)

1. If lower layer calls higher (e.g., `widgets → app`): **move** the called file into the **lowest valid layer** that satisfies rules (usually downwards toward `shared`).
2. If move breaks semantics, **extract interface/type** to a shared place and invert the dependency (higher layer passes data via props/hooks).
3. Update imports to barrels.

### C) `no-restricted-imports` (using `@/...`)

1. Replace `@/...` with the correct layer alias or relative path.
2. If relative crosses layers, switch to the layer alias.

### D) Cycles (`import/no-cycle`)

1. Move shared types/constants to `@shared/...`.
2. Split the slice/module into smaller files; re‑export from barrel.

### E) Store coupling (Zustand slices)

1. **Do not** import app store from `widgets/features/entities`.
2. Expose slice hooks via the feature’s **own barrel**; `app` composes stores.
3. If a widget imports `@app/providers/store/store`, change it to the feature’s hook import (`@features/X`) and pass via props if needed.

## 6) File moves (default destinations)

- Reusable UI for a single domain → `widgets/<Name>/ui/...`
- Cross‑domain logic/UI → `shared/ui/...` (UI), `shared/lib/...` (utils), `shared/api/...` (api), `shared/config/...` (config)
- Business logic for a domain → `features/<Name>/model|lib|ui`
- Pure data models (entities) → `entities/<Name>/model|lib|ui`
- Application wiring (providers, routing) → `app/providers|routing|index.tsx`

## 7) Naming

- Folders: `FeatureName`, files: `kebab-case.ts`.
- Slice files: `<domain>-slice.ts`.
- Barrel files: `index.ts` only.
- Hooks: `useXxx.ts`. Components: `Xxx.tsx`. Types: `types.ts`.

## 8) GraphQL/REST generated

- Keep generated under `src/shared/api/generated/` (already whitelisted).
- Only import via `@shared/api/generated/...` or exports from `@shared/api`.

## 9) Commit style (per atomic fix)

- One focused change per commit:

  - `fix(fsd): replace deep imports in <Unit> with barrel`
  - `refactor(store): expose <slice> via @features/<Unit>`
  - `chore(types): convert imports to type‑only`

## 10) Automation steps Cursor must run after edits

1. Update barrels when moving/privatizing files.
2. Replace all call sites to new barrel paths.
3. Run: `pnpm lint:fix` then `pnpm build`. If build fails on imports, repeat §5.
4. Never relax ESLint rules; fix code instead.

## 11) Quick recipes

- **Fix** `import { useStoryboardProcessing } from "@app/providers/store/store";`

  1. Create/ensure `features/Storyboard/index.ts` exports the hook.
  2. Change import to `@features/Storyboard`.
  3. If hook lives in `app`, move slice/hook into `features/Storyboard/model` and wire composition in `app`.

- **Fix** `import { useUploadsWithStoryboard } from "@/features/Storyboard";`

  1. Replace `@/features/...` with `@features/Storyboard`.
  2. If symbol not in barrel, export it from `features/Storyboard/index.ts`.

- **Reaching into models** `@features/Playlist/model/...`

  1. Add named exports to `features/Playlist/index.ts`.
  2. Update all imports to `@features/Playlist`.
