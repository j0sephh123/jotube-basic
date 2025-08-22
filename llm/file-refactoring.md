Below is a **strict, one-by-one** migration plan aligned with Feature-Sliced Design (layers: `app/`, `processes/`, `pages/`, `widgets/`, `features/`, `entities/`, `shared/`).
Each step has: intent → before/after → command(s) → notes. Apply in order.

---

### 1) Remove duplicated generated types (single source of truth)

**Intent:** Keep GraphQL types only in `shared/api/generated/`.

**Before → After**

| Before                 | After                                        |
| ---------------------- | -------------------------------------------- |
| `generated/graphql.ts` | `shared/api/generated/graphql.ts` (existing) |

**Commands**

```bash
git rm generated/graphql.ts
```

**Notes:** Update imports: `from "generated/graphql"` → `from "shared/api/generated/graphql"`.

---

### 2) Normalize `features/Playlist/components` to conventional `ui`

**Intent:** In FSD, presentational bits live under `ui/`.

**Before → After**

| Before                            | After                     |
| --------------------------------- | ------------------------- |
| `features/Playlist/components/**` | `features/Playlist/ui/**` |

**Commands**

```bash
git mv features/Playlist/components features/Playlist/ui
```

**Notes:** Fix any local re-exports/index files accordingly.

---

### 3) Move `features/Playlist/store` under `model`

**Intent:** Local state/slices belong to `model/`.

**Before → After**

| Before                                      | After                                       |
| ------------------------------------------- | ------------------------------------------- |
| `features/Playlist/store/playlist-slice.ts` | `features/Playlist/model/playlist-slice.ts` |
| `features/Playlist/store/index.ts`          | `features/Playlist/model/index.ts`          |

**Commands**

```bash
git mv features/Playlist/store features/Playlist/model
```

**Notes:** Update imports: `features/Playlist/store` → `features/Playlist/model`.

---

### 4) Promote “Thumbnails” from `widgets/` to a feature

**Intent:** `widgets/Thumbnails` contains `api/` and `model/` → that’s business logic (feature), not a pure widget.

**Before → After**

| Before                        | After                                |
| ----------------------------- | ------------------------------------ |
| `widgets/Thumbnails/api/**`   | `features/Thumbnails/api/**`         |
| `widgets/Thumbnails/lib/**`   | `features/Thumbnails/lib/**`         |
| `widgets/Thumbnails/model/**` | `features/Thumbnails/model/**`       |
| `widgets/Thumbnails/utils/**` | `features/Thumbnails/lib/**` (merge) |
| `widgets/Thumbnails/ui/**`    | `widgets/Thumbnails/ui/**` (stays)   |

**Commands**

```bash
mkdir -p features/Thumbnails/{api,lib,model}
git mv widgets/Thumbnails/api features/Thumbnails/api
git mv widgets/Thumbnails/model features/Thumbnails/model
git mv widgets/Thumbnails/lib features/Thumbnails/lib
git mv widgets/Thumbnails/utils/* features/Thumbnails/lib/
git rm -r widgets/Thumbnails/utils
```

**Notes:** `widgets/Thumbnails/ui/*` remains as compositional UI; it should import `features/Thumbnails` API/model via public entrypoints (no deep paths).

---

### 5) Consolidate “Dashboard” logic into the existing feature

**Intent:** You already have `features/Dashboard`; move API/model there. Keep only composition UI in `widgets/`.

**Before → After**

| Before                       | After                             |
| ---------------------------- | --------------------------------- |
| `widgets/Dashboard/api/**`   | `features/Dashboard/api/**`       |
| `widgets/Dashboard/lib/**`   | `features/Dashboard/lib/**`       |
| `widgets/Dashboard/model/**` | `features/Dashboard/model/**`     |
| `widgets/Dashboard/types.ts` | `features/Dashboard/types.ts`     |
| `widgets/Dashboard/ui/**`    | `widgets/Dashboard/ui/**` (stays) |

**Commands**

```bash
mkdir -p features/Dashboard/{api,lib,model}
git mv widgets/Dashboard/api features/Dashboard/api
git mv widgets/Dashboard/lib features/Dashboard/lib
git mv widgets/Dashboard/model features/Dashboard/model
git mv widgets/Dashboard/types.ts features/Dashboard/types.ts
```

**Notes:** Update `widgets/Dashboard/ui/*` imports to use `features/Dashboard`.

---

### 6) Split “SidePanel” state out of widget into a feature

**Intent:** Slices live in features; widgets remain composition-only.

**Before → After**

| Before                                        | After                                          |
| --------------------------------------------- | ---------------------------------------------- |
| `widgets/SidePanel/model/side-panel-slice.ts` | `features/SidePanel/model/side-panel-slice.ts` |
| `widgets/SidePanel/ui/SidePanel.tsx`          | `widgets/SidePanel/ui/SidePanel.tsx` (stays)   |

**Commands**

```bash
mkdir -p features/SidePanel/model
git mv widgets/SidePanel/model/side-panel-slice.ts features/SidePanel/model/side-panel-slice.ts
git rm -r widgets/SidePanel/model || true
```

**Notes:** `widgets/SidePanel/ui/SidePanel.tsx` should depend on the feature via public API (e.g., `features/SidePanel`).

---

### 7) Generalize `PaginationControl` into shared UI + lib

**Intent:** Reusable, domain-agnostic component → `shared/`.

**Before → After**

| Before                                                | After                                         |
| ----------------------------------------------------- | --------------------------------------------- |
| `widgets/PaginationControl/ui/PaginationControl.tsx`  | `shared/ui/pagination/PaginationControl.tsx`  |
| `widgets/PaginationControl/lib/getPaginationRange.ts` | `shared/lib/pagination/getPaginationRange.ts` |

**Commands**

```bash
mkdir -p shared/ui/pagination shared/lib/pagination
git mv widgets/PaginationControl/ui/PaginationControl.tsx shared/ui/pagination/PaginationControl.tsx
git mv widgets/PaginationControl/lib/getPaginationRange.ts shared/lib/pagination/getPaginationRange.ts
git rm -r widgets/PaginationControl
```

**Notes:** Update all imports.

---

### 8) Generalize `RangePicker` to shared

**Intent:** Generic date-range UI reused across pages/features.

**Before → After**

| Before                      | After                       |
| --------------------------- | --------------------------- |
| `widgets/RangePicker/ui/**` | `shared/ui/range-picker/**` |

**Commands**

```bash
mkdir -p shared/ui/range-picker
git mv widgets/RangePicker/ui/* shared/ui/range-picker/
git rm -r widgets/RangePicker
```

**Notes:** Ensure no business logic leaks remain inside; keep it presentational/utilitarian.

---

### 9) Normalize `features/Screenshot/components` to `ui` and keep feature logic together

**Intent:** Conform naming; keep hooks in `model/`.

**Before → After**

| Before                              | After                          |
| ----------------------------------- | ------------------------------ |
| `features/Screenshot/components/**` | `features/Screenshot/ui/**`    |
| `features/Screenshot/hooks/**`      | `features/Screenshot/model/**` |

**Commands**

```bash
git mv features/Screenshot/components features/Screenshot/ui
git mv features/Screenshot/hooks features/Screenshot/model
```

**Notes:** `TheCarousel.tsx` can stay here if it encapsulates screenshot-specific behavior. If it becomes generic later, promote to `shared/ui`.

---

### 10) Extract page-only logic from `pages/image-navigator` into a feature

**Intent:** Pages should orchestrate; logic lives in features.

**Before → After**

| Before                                                    | After                                                     |
| --------------------------------------------------------- | --------------------------------------------------------- |
| `pages/image-navigator/context/ImageNavigatorContext.tsx` | `features/ImageNavigator/model/ImageNavigatorContext.tsx` |
| `pages/image-navigator/hooks/reducer/reducer.ts`          | `features/ImageNavigator/model/reducer.ts`                |
| `pages/image-navigator/hooks/useNavigatorState.ts`        | `features/ImageNavigator/model/useNavigatorState.ts`      |
| `pages/image-navigator/hooks/useSubmitMutation.ts`        | `features/ImageNavigator/model/useSubmitMutation.ts`      |
| `pages/image-navigator/types.ts`                          | `features/ImageNavigator/types.ts`                        |
| `pages/image-navigator/ui/**`                             | `pages/image-navigator/ui/**` (stays)                     |

**Commands**

```bash
mkdir -p features/ImageNavigator/model
git mv pages/image-navigator/context/ImageNavigatorContext.tsx features/ImageNavigator/model/ImageNavigatorContext.tsx
git mv pages/image-navigator/hooks/reducer/reducer.ts features/ImageNavigator/model/reducer.ts
git mv pages/image-navigator/hooks/useNavigatorState.ts features/ImageNavigator/model/useNavigatorState.ts
git mv pages/image-navigator/hooks/useSubmitMutation.ts features/ImageNavigator/model/useSubmitMutation.ts
git mv pages/image-navigator/types.ts features/ImageNavigator/types.ts
```

**Notes:** Page imports the feature and composes UI.

---

### 11) Introduce `processes/` for long-running multi-step flows

**Intent:** Processing pipelines (storyboard, thumbnails) are multi-slice, cross-entity → `processes/`.

**Before → After**

| Before                                                                      | After                                                       |
| --------------------------------------------------------------------------- | ----------------------------------------------------------- |
| `features/Storyboard/model/storyboard-processing-slice.ts`                  | `processes/storyboard/model/storyboard-processing-slice.ts` |
| `widgets/Thumbnails/model/thumbnails-processing-slice.ts` (moved in step 4) | `processes/thumbnails/model/thumbnails-processing-slice.ts` |

**Commands**

```bash
mkdir -p processes/storyboard/model processes/thumbnails/model
git mv features/Storyboard/model/storyboard-processing-slice.ts processes/storyboard/model/storyboard-processing-slice.ts
git mv features/Thumbnails/model/thumbnails-processing-slice.ts processes/thumbnails/model/thumbnails-processing-slice.ts
```

**Notes:** Features can dispatch process actions; pages can orchestrate multiple processes.

---

### 12) Make `shared/model/zoom-slice.ts` consistent and colocate with shared UI

**Intent:** It’s used by `shared/ui/ZoomModal.tsx`; keep both under clear namespaces.

**Before → After**

| Before                       | After                             |
| ---------------------------- | --------------------------------- |
| `shared/model/zoom-slice.ts` | `shared/model/zoom/zoom-slice.ts` |
| `shared/ui/ZoomModal.tsx`    | `shared/ui/zoom/ZoomModal.tsx`    |

**Commands**

```bash
mkdir -p shared/model/zoom shared/ui/zoom
git mv shared/model/zoom-slice.ts shared/model/zoom/zoom-slice.ts
git mv shared/ui/ZoomModal.tsx shared/ui/zoom/ZoomModal.tsx
```

**Notes:** Update imports accordingly.

---

### 13) Set public entrypoints (`index.ts`) for modules you’ll import across layers

**Intent:** Enforce stable, shallow imports.

**Add files**

* `features/Thumbnails/index.ts` (re-export selected api/model hooks)
* `features/Dashboard/index.ts`
* `features/SidePanel/index.ts`
* `features/Screenshot/index.ts`
* `features/ImageNavigator/index.ts`
* `processes/storyboard/index.ts`
* `processes/thumbnails/index.ts`

**Example content**

```ts
// features/Thumbnails/index.ts
export * from "./api/thumbnail.gql";
export * from "./model/thumbnails-processing-slice"; // if still local
export * from "./lib/useThumbnailsCount"; // cherry-pick only what’s public
```

**Notes:** Consumers import from `features/Name` rather than deep paths.

---

### 14) Rename leftover `components/` dirs to `ui/` for consistency

**Intent:** You have a few `components/` pockets.

**Before → After**

| Before                              | After                       |
| ----------------------------------- | --------------------------- |
| `features/Gallery/components/**`    | `features/Gallery/ui/**`    |
| `features/Storyboard/components/**` | `features/Storyboard/ui/**` |
| `features/Upload/components/**`     | `features/Upload/ui/**`     |

**Commands**

```bash
git mv features/Gallery/components features/Gallery/ui
git mv features/Storyboard/components features/Storyboard/ui
git mv features/Upload/components features/Upload/ui
```

**Notes:** Fix any `index.ts` barrels.

---

### 15) Keep entity API under entities; move stray API accordingly

**Intent:** Entity-centric GraphQL stays with the entity.

**Audit & Move**

| Before                                          | After                              |
| ----------------------------------------------- | ---------------------------------- |
| `features/Playlist/api/*` (if any appear later) | `entities/Playlist/api/*`          |
| `features/Channel/hooks/useDeleteChannel.ts`    | **stay** (feature is the “action”) |

**Commands**
*(run only if such files exist later)*

**Notes:** Entity describes data shape & basic ops; features orchestrate use-cases.

---

### 16) Pages import only from public entrypoints

**Intent:** Enforce strict layering.

**Action**

* Replace imports in `pages/**/ui/Page.tsx`:

  * Deep imports `widgets/<X>/ui/...` → `widgets/<X>`
  * Deep imports `features/<X>/**` → `features/<X>`
  * Entity UI pieces via `entities/<X>/ui/*` are OK, but consider adding `entities/<X>/index.ts` barrels.

---

### 17) App-level providers remain in `app/providers/*`; remove dead dirs

**Intent:** Keep DI and infra cohesive.

**Before → After**

| Before                             | After            |
| ---------------------------------- | ---------------- |
| `app/providers/ws/model/` (empty?) | remove if unused |

**Commands**

```bash
[ -z "$(ls -A app/providers/ws/model 2>/dev/null)" ] && git rm -r app/providers/ws/model || true
```

**Notes:** If WS model needed globally, either `app/providers/ws` for client/provider or move domain-specific WS logic into relevant features.

---

### 18) Create lint rule and path alias guards (optional but recommended)

**Intent:** Prevent regressions (deep imports, wrong layers).

**Actions**

* Add ESLint import rules to forbid deep paths like `features/**/model/*` from outside the feature.
* Add TS path aliases to only expose `index.ts` of each slice (`features/*`, `widgets/*`, `entities/*`, `processes/*`).

---

## What this unblocks next

* After steps 1–14, your *heavy* domain logic sits in `features/` and `processes/`, widgets are thin, pages orchestrate, and shared is generic.
* If you want the **next 10 granular moves** (e.g., `Navbar/` audit, `Upload/` split into feature vs. process, `Search/` public API, `shared/ui/card` barrels), say so and I’ll enumerate them in the same before/after style.
