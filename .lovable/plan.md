

# SEO Improvements to Help Articles Get Indexed

After auditing the full codebase, here are the actionable improvements grouped by impact:

---

## High Impact

### 1. Remove duplicate Organization schema from Index.tsx
The Organization schema now lives in `index.html` (added in the previous fix), but `Index.tsx` still injects a second one via React Helmet (lines 24-47). Google may flag conflicting or duplicate schemas.

**File:** `src/pages/Index.tsx` — Remove the entire `<script type="application/ld+json">` block containing the Organization schema from the Helmet.

### 2. Fix Author page Person schema — use absolute image URL
`AuthorPage.tsx` line 48 uses `author.avatar` (relative path like `/images/alexander-sterling.png`). Same bug we fixed on ArticlePage.

**File:** `src/pages/AuthorPage.tsx` — Prefix with `https://autotechspot.com` if it's a relative path.

### 3. Add `<noscript>` content with internal links to `index.html`
The current `<noscript>` block only has a heading and paragraph. Since this is a CSR app, adding actual internal links to key pages in `<noscript>` helps crawlers that don't execute JS discover articles directly.

**File:** `index.html` — Expand the `<noscript>` block to include links to category pages and recent articles.

### 4. Update sitemap.xml with all current articles
The static `sitemap.xml` only has 4 articles but there appear to be more (the Nissan Rogue PHEV, Kia models, etc. based on image files). Need to regenerate or manually add missing entries.

**File:** `public/sitemap.xml` — Run the sitemap generator script or manually add missing article URLs.

---

## Medium Impact

### 5. Add `CollectionPage` schema to category pages
Category pages (`CategoryPage.tsx`) have no structured data beyond basic meta tags. Adding an `ItemList` or `CollectionPage` schema helps Google understand the page's purpose and may generate rich results.

**File:** `src/pages/CategoryPage.tsx` — Add `ItemList` JSON-LD with each article as a `ListItem`.

### 6. Add missing redirects to `vercel.json`
Only 2 old `/article/` paths have 301 redirects. If there are more articles that previously lived under `/article/[slug]`, those need redirects too (e.g., Honda CR-V, Hyundai Tucson, Nissan Rogue).

**File:** `vercel.json` — Add 301 redirects for any remaining old `/article/` URLs.

### 7. Add `noindex` to the 404 page
The `NotFound` component doesn't have `<meta name="robots" content="noindex">`. If crawlers hit invalid URLs, Google may waste crawl budget on soft 404s.

**File:** `src/pages/NotFound.tsx` — Add `<Helmet>` with `noindex, nofollow`.

---

## Summary of Changes

| File | Change |
|------|--------|
| `src/pages/Index.tsx` | Remove duplicate Organization JSON-LD schema |
| `src/pages/AuthorPage.tsx` | Fix Person schema `image` to use absolute URL |
| `index.html` | Expand `<noscript>` block with internal links to categories and articles |
| `public/sitemap.xml` | Add missing article URLs (Nissan Rogue PHEV, Kia Sportage, etc.) |
| `src/pages/CategoryPage.tsx` | Add `ItemList` JSON-LD structured data |
| `vercel.json` | Add 301 redirects for remaining old `/article/` paths |
| `src/pages/NotFound.tsx` | Add `noindex` meta via Helmet |

