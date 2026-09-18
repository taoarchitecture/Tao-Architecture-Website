# Animation Opportunities — Client App

A read-only sweep of the public-facing UI (`apps/client`) for moments that would
genuinely benefit from motion, filtered through a strict frequency/purpose/speed/
function gate. This does not implement anything — it's a prioritized recipe list.

**Existing motion vocabulary this all builds on** (from
[`globals.css`](apps/client/src/app/globals.css:69) and
[`PortfolioGrid.tsx`](apps/client/src/components/home/PortfolioGrid.tsx:23)):

```css
--ease-out-expo:    cubic-bezier(0.16, 1, 0.3, 1);
--ease-in-out-circ: cubic-bezier(0.85, 0, 0.15, 1);
--ease-out-quart:   cubic-bezier(0.25, 1, 0.5, 1);
--trans-fast:  180ms var(--ease-out-expo);
--trans-base:  300ms var(--ease-out-expo);
--trans-slow:  600ms var(--ease-out-expo);
--trans-image: 800ms var(--ease-out-quart);
```

Framer Motion and Lenis are already dependencies and already used correctly
(viewport-triggered card reveals, spring-based magnetic hover), so every
suggestion below extends that existing system rather than inventing a new one.

---

## Opportunities

### 1. Project gallery lightbox teleports open/closed
**Where:** [`ProjectDetailClient.tsx:289`](apps/client/src/app/projects/[slug]/ProjectDetailClient.tsx:289)

**Today:** The lightbox mounts/unmounts via a bare `{isLightboxOpen && (...)}`.
Switching between images just swaps the `src` with zero transition.

**Purpose:** Spatial consistency + preventing a jarring change
**Frequency:** Occasional — only when a visitor opens the gallery

**Suggested motion:**
- Wrap in `AnimatePresence`.
- Backdrop: `opacity 0→1`, `250ms var(--ease-out-expo)`.
- Panel: `scale(0.96)+opacity:0 → scale(1)+opacity:1`, `300ms var(--ease-out-expo)`
  (mirrors the `[0.16,1,0.3,1]` variant already used in `PortfolioGrid.tsx`).
- Image swap: `AnimatePresence mode="wait"` keyed on `lightboxIndex`, crossfade
  `220ms` + `translateX(16px)` in the direction of travel (next → from right,
  prev → from left).

---

### 2. "Read More" reveal is wired to a class that doesn't exist
**Where:** [`ProjectDetailClient.tsx:135-137`](apps/client/src/app/projects/[slug]/ProjectDetailClient.tsx:135)

**Today:** `className="mb-6 animate-fadeIn"` — `fadeIn` is never defined (no
`keyframes`/`animation` block in
[`tailwind.config.ts`](apps/client/tailwind.config.ts) or `globals.css`), so
this is a dead class. The extra paragraphs just snap into place.

**Purpose:** Preventing a jarring change
**Frequency:** Occasional — click

**Suggested motion:**
```tsx
<motion.div
  initial={{ opacity: 0, y: 8 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
>
```
Reuses the repo's own `--ease-out-quart` / `--trans-base` value, just
expressed via framer-motion since a conditionally-rendered paragraph can't
rely on a CSS class toggle alone.

---

### 3. Contact form → success message swaps instantly
**Where:** [`contact/page.tsx:178-207`](apps/client/src/app/contact/page.tsx:178)

**Today:** A successful submit instantly replaces the whole form with a
"Thank you" block — no transition class at all.

**Purpose:** Delight (rare, high-emotion confirmation) + preventing a jarring change
**Frequency:** Rare — once per successful submission

**Suggested motion:**
`AnimatePresence mode="wait"` crossfade between form and success state:
`opacity 0→1` + `translateY(12px→0)`, `400ms var(--ease-out-expo)` — inside
the modal/confirmation budget (200–500ms), no bounce; stays as restrained as
the rest of this brand's motion.

---

### 4. Fullscreen search overlay has no spatial arrival
**Where:** [`Navbar.tsx:273-302`](apps/client/src/components/Navbar.tsx:273)

**Today:** Fades opacity only (`duration-300`); the input and results appear
at full strength the instant opacity hits 1, with no sense of arrival.

**Purpose:** Spatial consistency
**Frequency:** Occasional — search icon click

**Suggested motion:** Keep the existing 300ms opacity toggle, add
`translateY(-8px)→0` on the inner container in lock-step,
`300ms var(--ease-out-expo)` — symmetric on close since it's the same class
toggling both directions.

---

### 5. Work-page sidebar active indicator jumps between categories
**Where:** [`WorkSidebar.tsx:39-43`](apps/client/src/components/work/WorkSidebar.tsx:39)

**Today:** The active-category accent (`border-l-4 -ml-[21px] pl-4`) is a
class toggle — only color is in `transition-colors`, so the bar jumps
straight to whichever label is active as the user scrolls past a section
boundary.

**Purpose:** State indication
**Frequency:** Occasional — fires once per section crossed, not per scroll tick

**Suggested motion:** Replace the per-button border with one shared indicator:
```tsx
<motion.span
  layoutId="work-sidebar-indicator"
  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
/>
```
Shows where the indicator came from instead of teleporting to the new item.

---

### 6. Gallery & Related Projects grids skip the site's own stagger pattern
**Where:** [`ProjectDetailClient.tsx:187-209`](apps/client/src/app/projects/[slug]/ProjectDetailClient.tsx:187)
and [`:247-282`](apps/client/src/app/projects/[slug]/ProjectDetailClient.tsx:247)

**Today:** Both grids render with no entrance treatment at all.

**Purpose:** Preventing a jarring change (consistency with an existing sibling pattern)
**Frequency:** Occasional — project detail page view

**Suggested motion:** Reuse `PortfolioGrid.tsx`'s own `cardVariants` verbatim:
`opacity:0,y:32 → opacity:1,y:0`, `700ms`, `ease:[0.16,1,0.3,1]`, via
`whileInView` + `staggerChildren:0.14` — the identical grid-of-cards pattern
already shipped on the homepage, just not extended to this page.

---

## Rejected candidates

These were considered and deliberately **not** suggested:

- **[`Navbar.tsx:125-129`](apps/client/src/components/Navbar.tsx:125)** —
  hamburger → X icon morph. Already animated correctly (rotate/translate,
  300ms, tuned restraint) — nothing to add.
- **[`Magnetic.tsx`](apps/client/src/components/ui/Magnetic.tsx)** hover-follow
  on CTA buttons. Already correct — spring physics
  (`stiffness:150, damping:15`) is the right feedback treatment; more would
  be decoration on decoration.
- **[`MobilePageNav.tsx:56-62`](apps/client/src/components/layout/MobilePageNav.tsx:56)** —
  scroll-fade hint on the mobile category strip. Tens-of-times/day frequency
  (mobile scroll); the existing 200ms opacity fade is already at the right
  subtlety for that tier.
- **[`globals.css:428-483`](apps/client/src/app/globals.css:428)** — Swiper
  pagination dots / nav arrows. Already animated via `--ease-out-expo`
  width/background transitions, no gap found.
- **`src/app/admin/**`** (dashboard, project/page forms, tables). Functional,
  data-dense internal tool used by a small staff team many times a day —
  motion here would hinder scanning/editing, not help.
- **`.img-hover-zoom`** hover-zoom on portfolio thumbnails
  ([`globals.css:201-206`](apps/client/src/app/globals.css:201)). Already
  correct — the 800ms `--trans-image` scale is deliberately slow/expensive-
  feeling and appropriately gated to hover only.

---

## Verdict

This codebase already has real motion literacy — a shared easing/duration
vocabulary, framer-motion used correctly for viewport-triggered card reveals,
and a physics-based magnetic hover that's genuinely well-tuned. The gaps
aren't "needs more animation," they're a handful of moments where the
existing vocabulary simply wasn't extended: a lightbox and a search overlay
that teleport instead of arriving, a "read more" reveal wired to a CSS class
that doesn't exist, and two grids that skipped the stagger pattern their
sibling component already established.

The highest-leverage fix is **#1, the project lightbox** — it's the
most-used interactive surface on the site's flagship page (project
galleries) and currently has zero transition in either direction. Everything
else here is a one-line extension of a pattern this repo already trusts
elsewhere, which is the cheapest kind of "more premium" there is.

Take any item above to `improve-animations plan <item description + file:line>`
for a self-contained implementation plan.
