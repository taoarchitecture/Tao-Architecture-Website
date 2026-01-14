# Modernization & Visual Parity Plan

## 1. Resolve Linting & Type Errors
The reported errors are primarily due to missing node modules and type definitions in the new `modern` directory.
- [ ] **Install Dependencies**: Run `npm install` in both `modern/apps/client` and `modern/apps/server`.
- [ ] **Install Type Definitions**: Add missing `@types/*` packages (express, cors, helmet, morgan, node, bcryptjs, jsonwebtoken, react, react-dom).
- [ ] **Fix TypeScript Configuration**: Ensure `tsconfig.json` correctly includes necessary libraries (DOM, ESNext) and excludes node_modules.

## 2. Visual Parity & Comparison System
To ensure 1:1 visual matching, we will use **Storybook** for component development and **Playwright** for visual regression testing.
- [ ] **Storybook Setup**: Initialize Storybook in `modern/apps/client` to develop components in isolation.
- [ ] **Legacy Asset Integration**: Ensure global styles (fonts, resets) match the legacy CSS.
- [ ] **Component Refinement**: 
    - Adjust `Navbar` and `Footer` to match legacy exactly (padding, colors, font-sizes).
    - Recreate the "Hero Slider" and "Masonry Grid" with exact dimensions.

## 3. Automated Visual Regression Testing
- [ ] **Playwright Setup**: Install Playwright in `modern/apps/client`.
- [ ] **Test Scenarios**: Create tests that:
    1.  Capture screenshots of the Legacy site (running locally or via URL).
    2.  Capture screenshots of the Modern site.
    3.  Compare them using `expect(page).toHaveScreenshot()` or pixel-diff tools.
    *Note: Since the legacy site is PHP, we might need to serve it via PHP CLI for local comparison.*

## 4. Documentation
- [ ] **Migration Guide**: Write `MIGRATION.md` detailing the stack changes, how to run both versions, and deployment steps.
- [ ] **Deviations Log**: Document any intentional UI changes (e.g., accessibility improvements that slightly alter visual rendering).

## 5. Execution Strategy
1.  **Fix Linting First**: This unblocks the build process.
2.  **Setup Testing Infrastructure**: Get the comparison tools ready.
3.  **Iterative Styling**: Tweak Tailwind classes until tests pass.
