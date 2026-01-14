I have analyzed the current project detail page and the design system. The red accent color (`#ee1c25`) is already defined but underutilized.

Here is the visual plan to selectively apply the red accent to individual project pages, ensuring it enhances hierarchy without overpowering the design:

### **Visual Plan: "Tao Red" Accent Integration**

**1. Project Header & Metadata (Visual Hierarchy)**
*   **Category Label**: Change the project category (e.g., "RESIDENTIAL") above the main title from **Gold** to **Red**.
    *   *Why*: Immediately anchors the visual hierarchy with the brand color.
*   **Details Box**: Change the left border of the project details box (Location, Status, etc.) from **Black** to **Red**.
    *   *Why*: Creates a subtle "red thread" guiding the eye to key project data.
*   **Data Labels**: Color the bold labels (e.g., **"Location :"**, **"Status :"**) within the details box in **Red**.
    *   *Why*: Improves scanability of technical details.

**2. Interactive Elements (User Experience)**
*   **"Read More" Button**: Update the button style to have a **Red Border & Text**, filling with **Red** on hover.
    *   *Why*: Clearly signals interactivity and calls to action.
*   **Navigation Arrows**: Update the "Previous/Next Project" arrows to turn **Red** (background & border) on hover instead of Black.
    *   *Why*: Provides satisfying, branded feedback during navigation.

**3. Gallery Interaction (Detail)**
*   **Hover Indicator**: Change the circular `+` icon that appears over gallery images on hover to have a **Red Border & Text** (currently white).
    *   *Why*: Adds a pop of brand color to the image browsing experience.

---

### **Implementation Steps**

1.  **Modify `src/app/projects/[slug]/page.tsx`**:
    *   Update the `className` for the project category to use `text-primary-red`.
    *   Update the details container `border-l-4` color.
    *   Add `text-primary-red` to the span tags inside the details box.
    *   Refine the "Read More" button styling.
    *   Update the gallery overlay icon styles.
    *   Update the footer navigation arrow hover states.

This approach keeps the large canvas (images, white space) neutral while using Red as a functional and navigational highlight.