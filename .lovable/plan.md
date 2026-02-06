

# Fix Build Errors in articles.ts

## Problem Summary
The deployment is failing due to TypeScript syntax errors in `src/data/articles.ts`. The build logs show multiple "comma expected" and "identifier expected" errors starting around line 8.

## Root Causes Identified

### 1. Unescaped Quotation Mark in Excerpt (Line 8)
The excerpt string contains `8.7"` which has an unescaped double quote that breaks the string literal:
```typescript
// Current (broken)
excerpt: "...194 hp hybrid powertrain, 8.7" ground clearance..."
                                        ↑ This quote breaks the string

// Fix: Escape the quote
excerpt: "...194 hp hybrid powertrain, 8.7\" ground clearance..."
```

### 2. Invalid blob: URL for Featured Image (Line 140)
The `featuredImage` property uses a temporary browser `blob:` URL that won't work in production:
```typescript
// Current (invalid)
featuredImage: "blob:https://labs.google/52d52da3-dbbb-4e8d-b38d-7be647afc915"

// Fix: Use a placeholder or valid image URL
featuredImage: "/placeholder.svg"
```

### 3. Invalid Slug with Spaces (Line 178)
The second article has a slug with spaces, which is not URL-friendly and likely causes routing issues:
```typescript
// Current (broken)
slug: "2026 Toyota RAV4"

// Fix: Use URL-friendly slug
slug: "2026-toyota-rav4-full-redesign-hybrid-specs-price-release-date-first-look"
```

---

## Technical Changes

### File: `src/data/articles.ts`

1. **Line 8**: Escape the double quote in `8.7"` by changing it to `8.7\"`
2. **Line 140**: Replace the invalid `blob:` URL with a valid placeholder image path
3. **Line 178**: Fix the slug to be URL-friendly with hyphens instead of spaces

