

# JSON-LD Structured Data Audit Report

## 1. Article Schema — ⚠️ PASS with issues

| Check | Result | Detail |
|-------|--------|--------|
| `@type` | ✅ PASS | Uses `"Article"` |
| `headline` | ✅ PASS | Uses `article.title`, matches the H1 |
| `author.name` | ✅ PASS | Consistently "Alexander Sterling" across all articles |
| `author.url` | ✅ PASS | Links to `/author/alexander-sterling` |
| `datePublished` | ✅ PASS | Present, with ISO 8601 timezone fallback |
| `dateModified` | ✅ PASS | Falls back to `publishedAt` if no `updatedAt` |
| `mainEntityOfPage` | ✅ PASS | Correctly defined with `@id` = canonical URL |
| `image` | ⚠️ WARN | Hardcoded `width: 1200, height: 630` — these may not match actual image dimensions. Acceptable but not ideal |
| `author.image` | ❌ FAIL | Uses **relative path** `/images/alexander-sterling.png` — must be absolute URL for schema validators |
| `publisher.logo.url` | ❌ FAIL | Points to `https://autotechspot.com/logo.png` — this file does **not exist** in `public/`. Will fail validation |

## 2. FAQ Schema — ✅ PASS

| Check | Result | Detail |
|-------|--------|--------|
| `@type` | ✅ PASS | `"FAQPage"` |
| Questions match visible text | ✅ PASS | Generated directly from `article.faqs` array, same data renders both schema and UI |
| No duplicates | ✅ PASS | Only one FAQPage schema injected, conditionally |
| Valid JSON | ✅ PASS | `JSON.stringify` ensures valid output |

## 3. Organization / Publisher Schema — ❌ FAIL

| Check | Result | Detail |
|-------|--------|--------|
| Publisher name | ✅ PASS | "AutoTechSpot" |
| Logo URL valid | ❌ FAIL | `https://autotechspot.com/logo.png` does not exist |
| Standalone Organization schema | ❌ FAIL | **No Organization schema exists anywhere** — not in `index.html`, not injected via Helmet. The memory/docs claim it exists but it doesn't |
| `sameAs` links | ⚠️ N/A | None defined |

## 4. Breadcrumb Schema — ✅ PASS

| Check | Result | Detail |
|-------|--------|--------|
| `@type` BreadcrumbList | ✅ PASS | Correctly defined |
| Hierarchy | ✅ PASS | Home → Category → Article (3 levels) |
| Absolute URLs | ✅ PASS | All use `https://autotechspot.com/...` |

## 5. Technical Validation — ⚠️ PASS with issues

| Check | Result | Detail |
|-------|--------|--------|
| No duplicate Article schema | ⚠️ WARN | For `car-reviews` articles, both an `Article` AND a `Review` schema are injected. The `Review` schema duplicates `author`, `publisher`, `datePublished`, and `description`. Google may flag conflicting signals |
| Schema conflicts | ⚠️ WARN | `Review` schema's `itemReviewed.name` uses `article.title.replace(/review/i, "").trim()` — a naive regex that may produce awkward names (e.g., "2026 Subaru Forester Hybrid : Specs, MPG...") |
| Valid JSON | ✅ PASS | All schemas use `JSON.stringify` |

---

## Summary of Required Fixes

### Fix 1: Author image — use absolute URL
**File:** `src/pages/ArticlePage.tsx` line 83

```js
// Before
image: article.author.avatar,
// After
image: `https://autotechspot.com${article.author.avatar}`,
```

### Fix 2: Publisher logo — use existing favicon
**File:** `src/pages/ArticlePage.tsx` lines 91-92 (and line 158 in Review schema)

```js
// Before
url: "https://autotechspot.com/logo.png",
// After  
url: "https://autotechspot.com/favicon.png",
```

### Fix 3: Add standalone Organization schema to `index.html`
Add a `<script type="application/ld+json">` block with Organization schema including `name`, `url`, `logo`, and `contactPoint`.

### Fix 4: Clean up Review schema for car-reviews
The Review schema's `itemReviewed.name` regex is fragile. Replace with a dedicated field or improve the stripping logic. Also consider merging author/publisher into the Article schema via `@graph` to avoid duplication.

### Fix 5: Add WebSite schema with SearchAction (recommendation)
Not required but strongly recommended for sitelinks search box in Google results.

---

## Changes Summary

| File | Change |
|------|--------|
| `src/pages/ArticlePage.tsx` | Fix author image to absolute URL, fix logo URL to `favicon.png`, improve Review schema `itemReviewed.name` |
| `index.html` | Add Organization JSON-LD schema block |

