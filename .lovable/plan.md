

# Giscus Comments Integration Plan

## Overview

Integrate Giscus into your AutoTechSpot website using your provided configuration. This will enable GitHub Discussions-powered comments on all article pages.

## Your Configuration

| Setting | Value |
|---------|-------|
| Repository | `aestheticzee-code/AutoTechSpot` |
| Repo ID | `R_kgDORE2bNg` |
| Category | Announcements |
| Category ID | `DIC_kwDORE2bNs4C1pJ0` |

## What Will Change

### CommentsSection Component

The placeholder will be replaced with a working Giscus widget that:

- **Loads the Giscus script** dynamically when the component mounts
- **Maps to article URL** so each article has its own discussion thread
- **Supports light/dark theme** matching your site's theme
- **Cleans up properly** when navigating between articles

## Features Included

1. **Automatic theme detection** - Comments will match your site's current theme
2. **Lazy loading** - Script only loads when comments section is visible
3. **Article-specific discussions** - Each article URL gets its own GitHub Discussion
4. **Responsive design** - Comments adapt to mobile and desktop

## Technical Details

```text
┌─────────────────────────────────────────┐
│           CommentsSection               │
├─────────────────────────────────────────┤
│ • useEffect to inject Giscus script     │
│ • useRef for container element          │
│ • Theme detection (light/dark)          │
│ • Cleanup on unmount/route change       │
└─────────────────────────────────────────┘
```

The component will:
1. Create a container div with class `giscus`
2. Inject the Giscus script with your configuration
3. Use `pathname` mapping so comments are tied to article URLs
4. Detect system/site theme preference

## File to Edit

| File | Change |
|------|--------|
| `src/components/CommentsSection.tsx` | Replace placeholder with Giscus integration |

