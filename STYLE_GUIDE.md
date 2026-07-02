# Style Guide - Modern Implementation

## 1. Typography

### Primary Font: Agenda
Exclusively applied to all textual elements across the website to ensure a consistent architectural identity.

**Font Family**: `Agenda`
- **Weights**:
  - Light (300) / Regular (400 / 500)
  - Bold (600 / 700)
- **Fallback**: `sans-serif`

### Global Typographic Specifications

**Body Text**
- **Font Size**: `16px`
- **Line Height**: `1.5`
- **Letter Spacing**: `0.02em`
- **Font Weight**: `400` / `500`

**Headings**
- **Line Height**: `1.2`
- **Letter Spacing**: `0.05em`
- **Font Weight**: `500` / `700`

#### Responsive Heading Sizes
- **H1**: `32px` (Mobile scales down via `clamp(28px, 1.5rem + 1vw, 32px)`)
- **H2**: `24px` (Mobile scales down via `clamp(20px, 1.25rem + 0.5vw, 24px)`)
- **H3**: `18px` (Mobile scales down via `clamp(16px, 1rem + 0.25vw, 18px)`)
- **H4**: `18px` (`1.125rem`)
- **H5**: `16px` (`1rem`)
- **H6**: `14px` (`0.875rem`, uppercase)

### Deprecated Fonts
- **Poppins** (Removed)
- **Merriweather** (Removed)

## 2. Color Palette

### Brand Colors
- **Primary Red**: `#ee1c25` (Buttons, Active States, Highlights)
- **Primary Gold**: `#c8b273` (Accents, Legacy Main Color)
- **Dark Black**: `#000000` (Backgrounds, Strong Headings)
- **Off Black**: `#1d1d1d` (Footer Background, Dark Sections)
- **Dark Grey**: `#212121` (Headings)
- **Medium Grey**: `#333333` (Body Text - Alternate)
- **Light Grey**: `#929292` (Body Text, Captions)
- **Date Grey**: `#acb0b8` (Meta info)
- **Border Grey**: `#ededed` (Borders)
- **Background Light**: `#f7f7f7` (Section Backgrounds)

### Semantic Colors
- **Success**: `#28a745` (Bootstrap standard)
- **Error**: `#dc3545` (Bootstrap standard)
- **Warning**: `#ffc107` (Bootstrap standard)
- **Info**: `#17a2b8` (Bootstrap standard)

## 3. Spacing System

Based on legacy padding/margin classes (`pad-bottom-10`, `mar-top-50`, etc.):

- **Base Unit**: `10px`
- **Scale**:
  - `1`: `10px`
  - `2`: `20px`
  - `3`: `30px`
  - `4`: `40px`
  - `5`: `50px`
  - `6`: `60px`
  - `7`: `70px`
  - `8`: `80px`
  - `9`: `90px`
  - `10`: `100px`

## 4. Components

### Buttons
- **Primary**: Background `#fff` (or Transparent), Border `#000`, Text `#000`. Hover: Background `#666` or `#ec1c24` (Red), Text `#fff`.
- **Solid Red**: Background `#ee1c25`, Text `#fff`.
- **Solid Black**: Background `#1d1d1d`, Text `#fff`. Hover: `#ec1c24`.

### Navigation
- **Sticky Header**: White background, box-shadow.
- **Links**: `#212121` (Dark), Hover: `#ee1c25` (Red) or Border Bottom `#f62929`.
- **Dropdown**: Border Top `5px solid #f62929`.

### Footer
- **Background**: `#1d1d1d` (Dark) or `#ffffff` (White variant).
- **Text**: `#929292` (Grey).
- **Links**: `#ffffff` or `#808285`. Hover: `#000` or `#f62929`.

## 5. Layout
- **Container Width**: Max-width `1200px` (Standard Bootstrap-like).
- **Grid**: 12-column grid system.
