# Folder & File Structure Overhaul — Priority Roadmap

## 1) Critical (apply first)

### A. Adopt consistent, FSD-style layout with clear boundaries

Create top-level **app / entities / features / widgets / pages / shared**. Move/rename accordingly.

```text
src/
  app/                  # app shell, router, providers, store wiring
    router.tsx
    providers/
    store/
      index.ts
      middleware.ts
      types.ts
  entities/             # pure domain units (Channel, Video, Playlist…); no business flows
    channel/
      model/            # types, selectors, domain hooks (read-only or simple)
        types.ts
        use-channel-by-id.ts
      api/              # gql/rest docs + generated types near ops (read-only)
        channel.gql.ts
      ui/               # dumb presentational parts (cards, badges)
        channel-card.tsx
  features/             # user-facing actions/use-cases that mutate or coordinate
    create-channel/
      ui/
        create-channel-modal.tsx
        create-channel-form.tsx
        create-channel-trigger.tsx
        title.tsx
        actions.tsx
      model/
        use-create-channel.ts
        use-create-channel-form.ts
        validation.ts
      api/
        create-channel.gql.ts
      lib/
        map-form-to-input.ts
    dashboard/
      ui/
        channels-dashboard.tsx
        videos-dashboard.tsx
        channel-dashboard-card.tsx
        screenshot-count-button.tsx
      model/
        use-dashboard.ts
        use-fetch-dashboard.ts
        use-fetch-videos-dashboard.ts
        dashboard.slice.ts
        videos-dashboard.slice.ts
      widgets/          # optional local composition
        range-picker/
          range-picker.tsx
          range-filter.tsx
          range-filter-popover.tsx
        pagination/
          pagination-control.tsx
          get-pagination-range.ts
  widgets/              # cross-feature compositions (navbar, side panels, table headers, etc.)
    navbar/
      ui/
        navbar.tsx
        dropdown-menu.tsx
        theme-switcher.tsx
        processing-progress.tsx
      model/
        use-global-websocket.ts
    side-panel/
      ui/
        side-panel-header.tsx
        side-panel-wrapper.tsx
  pages/                # route segments; compose widgets/features/entities only
    channels/
      page.tsx
      layout.tsx
    gallery/
      page.tsx
    screenshots/
      by-date.page.tsx
      by-month.page.tsx
      index.page.tsx
    storyboard/
      page.tsx
    uploads/
      default.page.tsx
      saved.page.tsx
  shared/               # primitives, utilities, cross-cutting infra
    api/
      apollo-client.ts
      query-client.ts
      fetcher.ts        # your nestFetcher
      generated/        # if you keep central generation
        graphql.ts
    ui/                 # low-level, reusable components only (button, card, modal, toast…)
      button/
        index.tsx
      card/
        card-container.tsx
        card-content.tsx
        ...
      dialog/
        confirm-dialog.tsx
        dialog-provider.tsx
        input-dialog.tsx
      toast/
        toast.tsx
        toast-context.tsx
        use-toast.ts
      icons/
        icon-youtube.tsx
      static/
        error-message.tsx
        loading.tsx
        no-data-available.tsx
        not-found.tsx
    lib/                # pure functions & cross-cutting helpers (rename from utils)
      api.ts
      date.ts
      format.ts
      image.ts
      queue.ts
      routes.ts
      globals.ts
    types/
      search-params.ts
      global.ts
  styles/
    main.css
  main.tsx
  styles.d.ts
```

**Why:** Clear separation removes current ambiguity (e.g., `shared/components` mixing primitives and composites; features mixing stores, hooks, and UI without boundaries).

---

### B. Flatten & rename nested “index” components

- **Rule:** `index.ts` files are **barrels only**. **No** `index.tsx` components.
- Replace `index.tsx` with explicit names:

  - `ChannelsDashboardHeader/index.tsx` → `channels-dashboard-header.tsx` (plus `index.ts` that re-exports).
  - `Playlist/…/PlaylistsPage/index.tsx` → `playlists.page.tsx`.

- Eliminate deep nesting like `…/VideosDashboardHeader/VideosRangePicker.tsx`. Group under a single folder with 1–2 levels max.

---

### C. Co-locate per-feature state, hooks, and API under `model/` and `api/`

- Move `features/*/hooks` → `features/*/model`.
- Move `features/*/store` slices into the **same feature’s** `model/` (e.g., `dashboard.slice.ts`).
- Keep **global** slices only in `app/store/` (e.g., `websocket-slice.ts`, `side-panel-slice.ts`, `zoom-slice.ts`). If a slice is feature-only (e.g., thumbnails-processing), colocate it under that feature.

---

### D. Extract shared composites to `widgets/`

- Candidates to move from `shared/components` or feature subtrees:

  - `Navbar/*` → `widgets/navbar`.
  - `ScreenshotsSidePanel` → `widgets/side-panel`.
  - `PaginationControl` → `features/dashboard/widgets/pagination` **or** `widgets/pagination` if used elsewhere.
  - `RangePicker` → same rule as above.

**Rule of thumb:** If it composes multiple primitives and/or touches feature state, it’s a **widget**, not a shared primitive.

---

### E. Normalize naming & casing

- **Directories:** kebab-case (`create-channel`, `videos-dashboard-header`, `add-channel-to-playlist-modal`).
- **Components:** PascalCase files, but **kebab-case filenames** are acceptable if you prefer consistency with folders. Pick one and stick to it. Examples above assume kebab-case files.
- **Hooks:** `use-*.ts` (pure) or `*.hook.ts` if you want extra clarity; keep `.ts` unless JSX is rendered.
- **Slices:** `*.slice.ts`.
- **Types:** `types.ts` (domain/feature local), cross-domain in `shared/types`.

---

## 2) Strong Improvements (next pass)

### F. Move GraphQL documents next to usage; enable near-operation-file codegen

- Delete `shared/api/graphql/*` and colocate docs:

  - **Entities** for read-only queries (`entities/channel/api/channel.gql.ts`).
  - **Features** for mutations or specific screen queries (`features/create-channel/api/create-channel.gql.ts`).

- Configure Codegen **near operation file** so generated types/hooks sit adjacent:

  - `create-channel.gql.ts` → `create-channel.generated.ts` (ignored by lint, committed or cached).

- If you must keep a central `generated/graphql.ts`, move it under `shared/api/generated/` **not** top-level `generated/`.

### G. Collapse overly deep subtrees

- Example: `Dashboard/components/VideosDashboardHeader/*` → `features/dashboard/ui/videos-dashboard-header/*` with:

  - `videos-dashboard-header.tsx`
  - `select-sort-direction.tsx`
  - `videos-range-filter.tsx`
  - `videos-range-picker.tsx`
  - `videos-pagination-control.tsx`

Two levels is enough: `ui/<area>/*`.

### H. Consolidate helpers and constants

- Replace scattered `utils` with `lib`:

  - `features/thumbnail/utils/*` → `features/thumbnail/lib/*`
  - `shared/utils/*` → `shared/lib/*`

- File names should reflect purpose: `calculate-grid-dimensions.ts`, `generate-main-thumbnail-url.ts`, `queue.ts`, `routes.ts`.
- Keep **constants** in `constants.ts` per feature if they are local; otherwise `shared/lib/constants.ts`.

### I. Pages are thin composers only

- `pages/*` should import from `widgets/`, `features/`, and `entities/` and contain **no business logic**.
- Rename with explicit `.page.tsx`: `SavedUploadsPage.tsx` → `uploads/saved.page.tsx`.

### J. Align feature boundaries

- Create **entities** for `channel`, `playlist`, `video`, `upload`, `screenshot`, `thumbnail`.
- Features should compose entities and add behavior (`create-playlist`, `update-playlist`, `view-screenshots`, `thumbnail-grid-navigation`).
- Move `VideoModal`, `ZoomModal` under `widgets/` if they are cross-feature; otherwise under the owning feature.

---

## 3) Nice-to-have (polish)

### K. File suffix conventions (enforceable via lint)

- Components: `.tsx`
- Non-JSX logic: `.ts`
- Contexts: `*.context.tsx`
- Hooks: `use-*.ts`
- Tests: `*.test.ts(x)` colocated
- Stories (if used): `*.stories.tsx` colocated

### L. Barrels only where helpful

- Allow `index.ts` only for re-exports at **folder boundaries** (`ui/`, `model/`, `api/`). No deep barrels that obscure imports.

### M. Add per-unit README.md with boundaries

- Each of `entities/*`, `features/*`, `widgets/*` gets a 5–10 line `README.md` stating:

  - Responsibilities
  - Allowed imports (e.g., `features` → can import `entities` & `shared`, not other `features`)

### N. Path aliases (readability)

- In `tsconfig.json`:

  - `@app/*`, `@shared/*`, `@entities/*`, `@features/*`, `@widgets/*`, `@pages/*`

- Update imports to remove long relative paths.

### O. Lint import boundaries

- Add `eslint-plugin-boundaries` or `eslint-plugin-import` rules that forbid:

  - `features/*` importing other `features/*`’s `model` directly
  - `widgets/*` importing from `pages/*`
  - Anything importing from `app/store` except composition roots

---

## Concrete migrations (examples)

### Channel (before → after)

```text
# BEFORE
features/Channel/
  ChannelPageLayout.tsx
  ChannelsHeader/*
  components/*
  CreateChannel/*
  hooks/*

# AFTER
entities/channel/
  model/
    types.ts
    use-channel-by-id.ts
  api/
    channel.gql.ts
  ui/
    channel-card.tsx

features/create-channel/
  ui/
    create-channel-modal.tsx
    create-channel-form.tsx
    create-channel-trigger.tsx
    title.tsx
    actions.tsx
  model/
    use-create-channel.ts
    use-create-channel-form.ts
    validation.ts
  api/
    create-channel.gql.ts

pages/channels/
  page.tsx        # composes header, list/grid widgets, etc.
  layout.tsx

widgets/channels-header/
  header-layout.tsx
  tabs.tsx
  bulk-operations.tsx
  channel-controls.tsx
  use-tabs.ts
  use-is-active-route.ts
```

### Dashboard (before → after)

```text
features/dashboard/
  ui/
    channels-dashboard.tsx
    videos-dashboard.tsx
    channel-dashboard-card.tsx
    channels-dashboard-container.tsx
    videos-dashboard-container.tsx
    channels-dashboard-header/
      header.tsx
      select-sort-direction.tsx
      view-type-toggle.tsx
    videos-dashboard-header/
      header.tsx
      select-sort-direction.tsx
      videos-pagination-control.tsx
      videos-range-filter.tsx
      videos-range-picker.tsx
    screenshot-count-button.tsx
  widgets/
    pagination/
      pagination-control.tsx
      get-pagination-range.ts
    range-picker/
      range-picker.tsx
      range-filter.tsx
      range-filter-popover.tsx
  model/
    dashboard.slice.ts
    videos-dashboard.slice.ts
    use-dashboard.ts
    use-fetch-dashboard.ts
    use-fetch-videos-dashboard.ts
    use-title-click.ts
    use-dashboard-context.ts
    use-videos-dashboard-context.ts
```

---

## Operational checklist

1. Create `app/`, `entities/`, `features/`, `widgets/`, `pages/`, `shared/` roots.
2. Move **global** slices to `app/store/`; move **feature** slices into respective `features/*/model/`.
3. Relocate `shared/components`:

   - Primitives → `shared/ui/*`
   - Composites (Navbar, SidePanel, complex cards) → `widgets/*`

4. Move GraphQL **documents** to `entities/*/api` (reads) and `features/*/api` (mutations); enable **near-operation-file** codegen. Relocate `generated/graphql.ts` under `shared/api/generated/` if still needed.
5. Replace all component `index.tsx` files with named files; keep `index.ts` as barrel only.
6. Rename folders/files to **kebab-case**; enforce suffix conventions.
7. Move `pages/*` to route segments with `*.page.tsx` files; pages remain thin composers.
8. Replace `utils` with `lib` throughout; co-locate per-feature helpers under `feature/lib`.
9. Add minimal `README.md` in each `entities/*`, `features/*`, `widgets/*` stating boundaries.
10. Add TS path aliases and import-boundary lint rules; update imports.

---

Apply Level 1 fully before writing new code. Level 2 will simplify reasoning about ownership and reduce depth. Level 3 locks consistency.
