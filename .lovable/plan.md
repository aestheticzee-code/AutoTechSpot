

## Build Failure: TypeScript Version Conflict

The Vercel deployment is failing at `npm install` due to conflicting TypeScript version requirements:

- **Root project** requires `typescript@^5.8.3`
- **`typescript-eslint@8.38.0`** requires `typescript@>=4.8.4 <5.9.0`
- **`@vercel/node@5.6.9`** pulls in `typescript@5.9.3` (which is outside the `<5.9.0` range)

### Fix

1. **Pin TypeScript to `5.8.3`** in `package.json` (change `"^5.8.3"` to `"5.8.3"`) to prevent npm from resolving to 5.9.x
2. **Add an `.npmrc` file** with `legacy-peer-deps=true` so Vercel's `npm install` tolerates the peer dependency conflict from `@vercel/node`

This two-part fix ensures the install succeeds without changing any tooling behavior.

