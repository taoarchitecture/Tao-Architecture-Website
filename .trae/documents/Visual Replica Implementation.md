# Visual Replica Implementation Plan

## 1. Documentation & Configuration

* [ ] **Style Guide**: Create `modern/STYLE_GUIDE.md` documenting specific hex codes (`#ee1c25`, `#c8b273`, etc.), font families (`Agenda`, `Poppins`), and grid dimensions derived from the legacy CSS analysis.

* [ ] **Tailwind Config**: Update `modern/apps/client/tailwind.config.ts` to include:

  * Custom Colors: `tao-red` (#ee1c25), `tao-gold` (#c8b273), `tao-dark` (#212121), etc.

  * Custom Fonts: `agenda`, `poppins`, `merriweather`.

  * Container breakpoints to match legacy (1170px).

## 2. Global Styles & Assets

* [ ] **Fonts Setup**: Ensure legacy font files (Agenda, etc.) are correctly placed in `public/fonts` and define `@font-face` rules in `src/app/globals.css`.

* [ ] **Base Styles**: Apply global resets in `globals.css` to match legacy `body` typography and background colors.

## 3. Component Reconstruction

* [ ] **Navbar**: Rebuild `Navbar.tsx` to implement:

  * Sticky behavior (transparent at top, solid white/black on scroll).

  * Exact padding/height (80px -> 60px).

  * Typography (uppercase, specific font weights).

  * Dropdown menu styling (border-top colors).

* [ ] **Footer**: Rebuild `Footer.tsx` with:

  * Dark background (`#1d1d1d`).

  * Widget layouts (Recent Works, Contact Info).

  * Copyright bar styling.

## 4. Page Layouts

* [ ] **Home Page**: Update `page.tsx` to include:

  * Full-screen Hero Slider (using Swiper or similar).

  * "Intro" section with specific typography.

  * Masonry Grid for projects (using CSS grid or a masonry library).

## 5. Verification

* [ ] **Visual Testing**: Run `npx playwright test` to compare the new implementation against the baselines.

* [ ] **Manual Review**: Check responsive behavior (mobile menu, font scaling) to ensure it matches legacy media queries.

