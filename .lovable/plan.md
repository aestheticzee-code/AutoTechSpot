

## Fix Article URLs in Static Sitemap

The `public/sitemap.xml` has two article URLs still using the old `/article/` prefix instead of the category-based structure (`/car-reviews/` or `/car-updates/`).

### Changes

**`public/sitemap.xml`** — Update article URLs:
- Line 24: `/article/2024-ford-mustang-gt-review` → `/car-reviews/2024-ford-mustang-gt-review`
- Line 30: `/article/2026-nissan-frontier-unveiled` → `/car-updates/2026-nissan-frontier-unveiled`

Also regenerate with all current articles from `src/data/articles.ts` so the static file is comprehensive. The build plugin will overwrite this at deploy time, but having a correct static version ensures consistency in the editor preview.

