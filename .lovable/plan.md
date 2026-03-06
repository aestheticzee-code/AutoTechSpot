

# "Crawled – Currently Not Indexed" Fix

The screenshot shows 52 pages flagged in Google Search Console. Most are legacy `/goods/` spam URLs, plus one legitimate article URL (`/car-reviews/2026-subaru-forester-hybrid-review`).

## Root Cause

1. **`/goods/` URLs**: The `Disallow: /goods/` rule only applies to the wildcard `User-agent: *` block — **not to Googlebot**, which has its own block with just `Allow: /`. Googlebot ignores the `*` block when a specific `Googlebot` block exists. So Google is still crawling `/goods/` URLs.

2. **Legitimate article**: The Forester article is "crawled but not indexed" — this is a content/authority issue, not a technical one. No code fix needed for this.

## Changes

### 1. `public/robots.txt` — Block `/goods/` for all bots consistently

Add `Disallow: /goods/` to the Googlebot and Bingbot blocks so they actually respect it:

```
User-agent: Googlebot
Allow: /
Disallow: /goods/
Disallow: /gone

User-agent: Bingbot
Allow: /
Disallow: /goods/
Disallow: /gone

User-agent: Twitterbot
Allow: /

User-agent: facebookexternalhit
Allow: /

User-agent: *
Allow: /
Disallow: /goods/
Disallow: /gone

Sitemap: https://autotechspot.com/sitemap.xml
```

Also disallow `/gone` since that page has `noindex` and shouldn't be crawled either.

### 2. No other file changes needed

The 301 redirect and `noindex` on `/gone` are already correct. The core issue is just the robots.txt bot-specific block oversight.

| File | Change |
|------|--------|
| `public/robots.txt` | Add `Disallow: /goods/` and `Disallow: /gone` to Googlebot and Bingbot blocks |

