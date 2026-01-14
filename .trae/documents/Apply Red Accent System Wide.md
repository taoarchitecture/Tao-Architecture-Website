I have analyzed the entire modern website and identified key areas to apply the "Tao Red" accent color. The goal is to replace the existing "Gold" accents and standard "Black" interactions with "Red" to create a cohesive visual identity that matches the Project Detail pages.

### **Visual Plan: "Tao Red" System Expansion**

**1. Global Navigation & Footer (Brand Anchors)**
*   **Navbar**:
    *   **Hover States**: Menu links will turn **Red** on hover (replacing Gold).
    *   **Active State**: The current page link will be **Red**.
    *   **Dropdowns**: The top border accent for dropdown menus will be **Red**.
*   **Footer**:
    *   **Social Icons**: Hovering over social icons will turn the background **Red**.
    *   **Links**: Footer links (Email, Website, Quick Links) will turn **Red** on hover.

**2. Home Page (First Impression)**
*   **Portfolio Grid**:
    *   **Project Titles**: Hovering over project titles will turn them **Red**.
    *   **Buttons**: "See Projects" buttons will change to the **Red Outline** style (Red border/text, fills Red on hover).
    *   **Category Labels**: The small uppercase category labels (e.g., "CORPORATE") will be **Red** to guide the eye.
*   **Banner**:
    *   **CTA Button**: The "Know About Us" button will use the **Red Outline** style.

**3. Services Page (Readability)**
*   **Section Headers**: The titles of service sections (e.g., "Architecture + Interior Design") will be **Red**.
*   **Bullet Points**: The list bullets will be **Red**, making long lists easier to scan.
*   **Sidebar**: Active service category in the sidebar will be **Red**.

**4. Contact Page (Action Oriented)**
*   **Interactive Form**: Input fields will glow **Red** when focused (replacing Gold ring).
*   **Submit Button**: The "Send" button will use the **Red Outline** style.
*   **Social Icons**: Hover states will be **Red**.

**5. Studio Page (Team Identity)**
*   **Consistency**: Ensure the sidebar active state matches the Red theme (Team roles are already Red).

---

### **Implementation Steps**

1.  **Global Components**:
    *   Update `src/components/Navbar.tsx` (Hover/Active/Dropdown colors).
    *   Update `src/components/Footer.tsx` (Hover colors).

2.  **Home Page**:
    *   Update `src/components/home/PortfolioGrid.tsx` (Card styling, buttons).
    *   Update `src/components/home/Banner.tsx` (CTA button).

3.  **Inner Pages**:
    *   Update `src/app/services/page.tsx` (Headers, lists).
    *   Update `src/components/services/ServicesSidebar.tsx` (Active state).
    *   Update `src/app/contact/page.tsx` (Form focus, buttons, icons).
    *   Update `src/components/studio/StudioSidebar.tsx` (Active state).

This plan ensures the Red accent is distributed evenly across the site, functioning as a "signal" for interactivity and importance.