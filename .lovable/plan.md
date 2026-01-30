

# Vercel Deployment Preparation Plan

## Overview
Your automotive website needs a small configuration update to work correctly on Vercel. The main issue is **SPA routing** — without proper config, direct links to pages like `/article/2024-ford-mustang-gt-review` would show a 404 error.

---

## What I'll Create

### 1. Vercel Configuration File (`vercel.json`)
A simple configuration file that tells Vercel how to handle your website:

```text
+------------------+     +------------------+     +------------------+
|  User visits     | --> |  Vercel checks   | --> |  Routes to       |
|  /article/...    |     |  vercel.json     |     |  index.html      |
+------------------+     +------------------+     +------------------+
                                                          |
                                                          v
                                                  +------------------+
                                                  |  React Router    |
                                                  |  handles page    |
                                                  +------------------+
```

This ensures all your pages work when accessed directly or refreshed.

---

## After This Change

Your deployment steps on Vercel will be:

1. **Connect GitHub** (Project Settings → GitHub in Lovable)
2. **Import to Vercel** (from your Vercel dashboard)
3. **Vercel auto-detects** the Vite framework and uses:
   - Build command: `npm run build`
   - Output directory: `dist`
4. **Deploy** — your site goes live!

---

## Technical Details

### File: `vercel.json`
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

This single rule redirects all routes to `index.html`, allowing React Router to handle navigation for pages like:
- `/article/2024-ford-mustang-gt-review`
- `/category/car-reviews`
- `/author/alexander-sterling`

### No Changes Needed To:
- `package.json` — build scripts are already correct
- `vite.config.ts` — configuration is Vercel-compatible
- Any existing code

