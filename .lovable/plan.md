

## Two Issues to Fix

### 1. Vercel Deployment Failure (`vercel.json`)
The error message says: *"redirects[0] missing required property 'destination'"*

Vercel's `redirects` only support status codes 301, 302, 307, 308 — **not 410**. The `/goods/:path*` entry with `statusCode: 410` is invalid. 

**Fix**: Move the `/goods/:path*` rule out of `redirects` and handle it via Vercel's `rewrites` combined with a small custom 410 page, OR simply use `headers` to return a 410. The simplest valid approach: rewrite `/goods/*` to a static `/gone.html` page that returns informational content, and set the status via Vercel's `headers` config. 

Actually the cleanest approach: Remove the 410 redirect entry and add it as a **rewrite** to a static `/410.html` page placed in `public/`, combined with a custom header returning 410 status. However, Vercel `headers` can't override HTTP status codes.

**Simplest working approach**: Use Vercel Edge Middleware or accept that a pure static 410 isn't possible without serverless functions. The pragmatic fix is to change the 410 to a **301 redirect** to a `/gone` page that displays a "This page no longer exists" message, or simply remove the rule if the `/goods/` paths no longer receive traffic.

**Recommended**: Redirect `/goods/*` with a 301 to a simple `/gone` route that shows a "page removed" message — or just remove the entry entirely if these URLs aren't indexed anymore.

### 2. Build Error in `articles.ts` (line 1022)
The line contains `answer: "Excellent with e-AWD and Trail mode; TFLcar tests confirm grip in mountains."` — the TypeScript compiler reports an invalid character. This is likely an invisible Unicode character (zero-width space, smart quote, or similar) embedded in the text. 

**Fix**: Re-type the affected string on line 1022 to ensure only standard ASCII characters are present.

### Changes
| File | Change |
|------|--------|
| `vercel.json` | Remove the invalid 410 redirect entry (or convert to 301 pointing to `/gone`) |
| `src/data/articles.ts` | Re-write line 1022 to eliminate invisible characters |
| `src/pages/GonePage.tsx` | *(Optional)* Create a simple "page removed" page if we redirect `/goods/*` |

