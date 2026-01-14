I have analyzed the legacy and modern codebases. The modern site is a good foundation (Next.js/Tailwind), but it lacks several specific visual and functional elements present in the legacy PHP site.

Here is the plan to achieve 100% parity:

## Phase 1: Global Styles & Assets (Foundation)
1.  **Typography**: Replace `Inter` with the custom `Agenda` font in `layout.tsx` and `tailwind.config.ts` to match the legacy brand identity.
2.  **Colors**: Verify and refine `tailwind.config.ts` colors (e.g., Gold `#c8b273`, Dark Grey `#231f20`) to match legacy exactly.
3.  **Loader & Animations**: Implement the "Ball Pulse" preloader and page transition effects. Add `WOW.js` (or a React equivalent like `framer-motion` or `aos`) for scroll animations.
4.  **Global CSS**: Port essential global CSS from legacy (e.g., specific button styles `btn-stroke`, `btn-fill`, sliding underlines).

## Phase 2: Layout Components (Header & Footer)
1.  **Navbar**:
    *   Update menu structure: Work, Services, Studio, Media & Awards (Dropdown), Contact.
    *   Implement "Active" state logic (highlight current page).
    *   Add Search overlay and Mobile Menu (hamburger with collapse behavior).
2.  **Footer**:
    *   Add the specific address block, phone numbers, and email.
    *   Add the "Review" modal trigger (if desired).
    *   Update Social Icons (dark, rounded style) and Copyright text.

## Phase 3: Home Page Recreation
1.  **Hero Slider**: Update `HeroSlider.tsx` to use the exact 12 legacy images with a 4-second auto-play interval (no pause on hover).
2.  **Work Categories**: Update `PortfolioGrid.tsx` to match the 2-column masonry layout with background images and "See Projects" buttons.
3.  **Missing Sections**: Add the "Know About Us" section and the specific Banner text ("Touching intangible beauty...").

## Phase 4: Inner Pages (Work, Studio, Contact)
1.  **Work Page**:
    *   Update `WorkSidebar.tsx` to implement "Scroll Spy" (highlight category as you scroll).
    *   Ensure the project grid uses the legacy 4-column layout with hover effects.
2.  **Studio (Profile)**:
    *   Implement the "Wizard Menu" sidebar.
    *   Add the "Read More/Less" toggle for the long description.
    *   Add the Team/Awards sections if missing.
3.  **Contact**:
    *   Update the Contact Form fields (First Name, Last Name, Company, etc.).
    *   Embed the exact Google Maps iframe.

## Phase 5: Project Detail & Interactivity
1.  **Dynamic Routing**: Continue refining `src/app/projects/[slug]/page.tsx`.
2.  **Gallery**: Implement a Lightbox (modal view) for project galleries.
3.  **Navigation**: Ensure "Next/Previous Project" links work correctly with the legacy ordering.

**Immediate Next Step:**
I will start with **Phase 1 & 2** (Global Styles, Header, Footer) to set the correct visual baseline.
