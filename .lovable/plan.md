
# Automatic Sitemap Generation at Build Time

## Overview
Create an automated sitemap generation system that runs during the Vite build process. The sitemap will dynamically include all articles, authors, categories, and static pages - no manual editing required after adding new content.

## How It Works

```text
┌─────────────────────────────────────────────────────────────────┐
│                     BUILD TIME FLOW                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  src/data/articles.ts ──┐                                       │
│  src/data/authors.ts ───┼──► Vite Plugin ──► /public/sitemap.xml│
│  src/types/article.ts ──┘    (generate)                         │
│                                                                  │
│  When you run: npm run build                                    │
│  The sitemap is automatically regenerated                       │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Sitemap Structure

| URL Type | Example | Priority | Change Frequency |
|----------|---------|----------|------------------|
| Homepage | `/` | 1.0 | daily |
| Categories | `/category/car-reviews` | 0.8 | weekly |
| Articles | `/article/[slug]` | 0.7 | monthly |
| Authors | `/author/[slug]` | 0.6 | monthly |
| Static | `/about`, `/contact` | 0.5 | monthly |
| Legal | `/privacy`, `/terms`, `/disclaimer` | 0.3 | yearly |

## What Happens When You Add a New Article

1. Add article object to `src/data/articles.ts`
2. Run `npm run build`
3. Sitemap automatically includes the new article with correct `<lastmod>` date

---

## Technical Changes

### New File: `scripts/generate-sitemap.ts`

A Node.js script that:
- Imports articles from `src/data/articles.ts`
- Imports authors from `src/data/authors.ts`
- Imports categories from `src/types/article.ts`
- Generates valid XML sitemap following sitemaps.org schema
- Outputs to `public/sitemap.xml`

### Modified File: `vite.config.ts`

Add a custom Vite plugin that runs the sitemap generation during the `buildStart` hook:
- Uses dynamic imports to load the TypeScript data files
- Generates sitemap XML before the main build completes
- Writes output to `public/sitemap.xml`

### Modified File: `package.json`

Add a standalone script for manual sitemap generation:
```json
"scripts": {
  "generate:sitemap": "npx tsx scripts/generate-sitemap.ts"
}
```

### File: `public/robots.txt`

Already configured correctly with sitemap reference - no changes needed.

### New Dev Dependency: `tsx`

Required to run TypeScript scripts directly from Node.js for the build process.
