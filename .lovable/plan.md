

# Add Author Box to Every Article

## What
A reusable `AuthorBox` component displayed at the bottom of every article (after tags/FAQ, before related articles), showing the author's photo, name, role, short bio, expertise badges, and a link to their full profile.

## Component: `src/components/AuthorBox.tsx`
- Accepts an `Author` object as prop
- Displays: avatar (64px rounded), name (linked to `/author/{slug}`), role, truncated bio (~2 lines), expertise as badges
- Modern card design with subtle border, rounded corners, clean spacing
- Mobile responsive (stacks vertically on small screens)
- Supports E-E-A-T by prominently crediting the author

## Integration: `src/pages/ArticlePage.tsx`
- Import `AuthorBox`
- Place it after the FAQ section (line ~310) and before the closing `</div>` of the content column
- Pass the `author` object (already resolved from `getAuthorByName` on line 68)
- Show fallback gracefully if author not found in authors database (just skip the box)

## Changes

| File | Change |
|------|--------|
| `src/components/AuthorBox.tsx` | New component — author card with avatar, name, role, bio, expertise badges, link to profile |
| `src/pages/ArticlePage.tsx` | Import and render `<AuthorBox>` after FAQ section, before related articles |

