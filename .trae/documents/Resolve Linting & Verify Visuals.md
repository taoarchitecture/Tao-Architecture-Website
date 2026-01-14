# Linting & Visual Consistency Plan

## 1. Resolve Linting Errors
The reported errors persist mainly because the previous `npm install` commands might have been interrupted or run in incorrect directories, or the editor needs a restart to pick up the new types.
- [ ] **Server Dependencies**: Re-run installation in `modern/apps/server` specifically for `express`, `multer`, and their types.
- [ ] **Client Dependencies**: Re-run installation in `modern/apps/client` for `tailwindcss`, `next-seo`, and React types.
- [ ] **Type Definitions**: Explicitly add missing dev dependencies (`@types/multer`, `@types/express`, etc.) to `package.json` to ensure persistence.
- [ ] **TS Config**: Verify `tsconfig.json` in both apps to ensure they are picking up the `node_modules/@types`.

## 2. Visual Consistency Verification
Since the linting fixes are primarily about type definitions and missing modules, they should *not* affect the runtime visual rendering unless a library version upgrade changes default styles.
- [ ] **Run Visual Tests**: Execute the Playwright tests created in the previous step to confirm that the "after" state matches the "before" state (which is currently the baseline).
- [ ] **Manual Check**: Briefly spin up the client (`npm run dev`) to ensure the Tailwind styles are loading correctly (fixing the `@tailwind` warning is a VS Code config issue, but we'll ensure the CSS generates).

## 3. Documentation
- [ ] Update `MIGRATION.md` if any specific version constraints are discovered.
