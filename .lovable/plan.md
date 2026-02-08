
# Restructure to Category-Based SEO-Friendly URLs

## Overview
Migrate from `/article/[slug]` to `/[category]/[slug]` URL structure for better SEO and cleaner URLs. Articles will be accessible at `/car-reviews/article-slug` or `/car-updates/article-slug`.

## URL Structure Changes

| Current URL | New URL |
|------------|---------|
| `/article/2026-subaru-crosstrek-hybrid...` | `/car-reviews/2026-subaru-crosstrek-hybrid...` |
| `/article/2026-toyota-rav4...` | `/car-reviews/2026-toyota-rav4...` |
| `/category/car-reviews` | `/car-reviews` |
| `/category/news` | `/car-updates` |

## Files to Modify

### 1. Update Category Slug: `src/types/article.ts`
- Change `ArticleCategory` type from `"car-reviews" | "news"` to `"car-reviews" | "car-updates"`
- Update the categories array to use `slug: "car-updates"` instead of `slug: "news"`

### 2. Update Article Data: `src/data/articles.ts`
- Change any articles with `category: "news"` to `category: "car-updates"`

### 3. Restructure Routes: `src/App.tsx`
- Remove `/article/:slug` route
- Remove `/category/:slug` route
- Add `/:category` route for category index pages
- Add `/:category/:slug` route for articles
- Ensure catch-all 404 still works properly

### 4. Create Combined Route Handler: `src/pages/DynamicPage.tsx`
New component that handles both category index and article detail:
- If only category param exists → show category listing
- If category + slug params exist → show article detail
- Validate that the category is a known category slug
- Redirect to 404 if invalid

### 5. Update Article Links (7 locations):

| File | Change |
|------|--------|
| `src/components/ArticleCard.tsx` | Line 22 & 71: `/article/` → `/${article.category}/` |
| `src/components/SearchOverlay.tsx` | Line 94: `/article/` → `/${article.category}/` |
| `src/pages/NotFound.tsx` | Line 89: `/article/` → `/${article.category}/` |
| `src/pages/ArticlePage.tsx` | Line 43: Update canonical URL pattern |

### 6. Update Category Links (3 locations):

| File | Change |
|------|--------|
| `src/components/layout/Header.tsx` | Lines 35 & 73: `/category/` → `/` |
| `src/components/FeaturedCategories.tsx` | Line 30: `/category/` → `/` |
| `src/pages/NotFound.tsx` | Lines 63, 69, 124: `/category/` → `/` |
| `src/pages/CategoryPage.tsx` | Line 65: `/category/` → `/` |

### 7. Update Sitemap Generation

**`vite.config.ts`:**
- Change article URLs from `/article/${slug}` to `/${category}/${slug}` (requires extracting category from article data)
- Change category URLs from `/category/${slug}` to `/${slug}`

**`scripts/generate-sitemap.ts`:**
- Same URL pattern updates

### 8. Update SEO Metadata: `src/pages/ArticlePage.tsx`
- Update canonical URL to `https://autotechspot.com/${category}/${slug}`
- Update breadcrumb schema URLs
- Keep all other SEO metadata intact

---

## Technical Details

### Route Configuration
```text
Routes:
├── /                    → Index (home)
├── /car-reviews         → Category listing (Car Reviews)
├── /car-reviews/:slug   → Article page
├── /car-updates         → Category listing (Car Updates)  
├── /car-updates/:slug   → Article page
├── /author/:slug        → Author page
├── /about               → Static page
├── /contact             → Static page
├── /privacy             → Legal page
├── /terms               → Legal page
├── /disclaimer          → Legal page
└── *                    → 404 page
```

### Category Validation
The dynamic route handler will validate that the category parameter matches a known category slug (`car-reviews` or `car-updates`). If it doesn't match AND it's not a known static route, it will show the 404 page.

### Link Generation Helper (Optional)
Add a utility function to generate article URLs consistently:
```typescript
export function getArticleUrl(article: Article): string {
  return `/${article.category}/${article.slug}`;
}
```

---

## What Stays the Same
- Article page UI, layout, and components
- SEO metadata structure (just URL updates)
- Article data structure in `src/data/articles.ts`
- Slug format and content
- Related articles, FAQ sections, Table of Contents
