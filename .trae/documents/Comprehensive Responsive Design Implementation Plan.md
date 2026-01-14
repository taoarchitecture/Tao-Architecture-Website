I have analyzed the entire codebase and identified the key areas requiring updates to ensure full responsiveness across all devices (Mobile, Tablet, Laptop, TV).

### **The Master Plan for Responsiveness**

#### **1. Navigation System (Header & Mobile Menu)**
*   **Current State**: Hamburger menu exists but needs refinement for nested dropdowns (Media & Awards).
*   **Action**: 
    *   Enhance `Navbar.tsx` to ensure the mobile menu occupies full screen height if needed and scrolls independently.
    *   Fix the "Media & Awards" dropdown in mobile view to be an accordion/expandable list rather than a hover flyout.

#### **2. Inner Page Navigation (The "Missing Sidebar" Fix)**
*   **Current State**: Sidebars (Work, Services, Studio) are `hidden md:block`, making navigation impossible on mobile.
*   **Action**: 
    *   Create a **`MobilePageNav` component**: A sticky, horizontal scrollable bar (or dropdown) that appears *only* on mobile (`block md:hidden`) at the top of Work, Services, and Studio pages.
    *   This ensures mobile users can jump between "Architecture", "Interiors", etc., just like desktop users.

#### **3. Typography & Spacing (Global Scaling)**
*   **Current State**: Some headers are fixed at `text-4xl` or `text-5xl`, which is too large for mobile screens.
*   **Action**: 
    *   Update all H1/H2 tags to use fluid typography: `text-3xl md:text-4xl lg:text-5xl`.
    *   Adjust section padding: `py-12` for mobile vs `py-20` for desktop.

#### **4. Grid Layouts & Images**
*   **Current State**: Grids generally stack (`grid-cols-1 md:grid-cols-2`), but image heights are fixed (e.g., `h-[300px]`).
*   **Action**: 
    *   **Work Grid**: Ensure 1 column on mobile, 2 on tablet, 4 on desktop.
    *   **Services/Studio**: Allow image heights to be `h-auto aspect-video` on mobile for better proportions, reverting to fixed heights on desktop.
    *   **Project Detail**: Ensure the Lightbox is touch-friendly and the masonry gallery stacks correctly.

#### **5. Footer Optimization**
*   **Current State**: Stacks vertically on mobile.
*   **Action**: Center-align content on mobile for better aesthetics, left/right align on desktop.

### **Execution Order**
1.  **Global Styles**: Adjust global typography and spacing utility classes.
2.  **Navbar**: Fix mobile dropdown behavior.
3.  **Mobile Page Nav**: Implement the new mobile navigation component.
4.  **Page-Specific Fixes**: Apply the mobile nav and grid adjustments to Work, Services, Studio, and Contact pages.
5.  **Project Detail**: Refine the project view and lightbox.
