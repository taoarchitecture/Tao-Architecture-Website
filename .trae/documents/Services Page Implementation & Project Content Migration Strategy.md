I have analyzed the legacy `services.php` and project pages like `aurum.php`.

**The Plan:**

1.  **Implement the Services Page (`/services`)**:
    *   Create a sticky **Services Sidebar** (similar to Work/Studio) for navigation between service categories (Architecture, Design Coordination, etc.).
    *   Build the **Services Main Content** area with the text and images extracted from `services.php`.
    *   Ensure the "Scroll Spy" functionality highlights the active service as the user scrolls.

2.  **Migrate Project Content**:
    *   The modern site uses a **Dynamic Routing** system (`/projects/[slug]`), so we don't need to create 70+ individual files. We just need to add the *content* to `src/data/projects.ts`.
    *   I will immediately migrate the **Aurum** project (which I analyzed) into the data file as a template.
    *   I will verify the `ProjectDetail` interface handles all legacy features (social share, specific details, related projects).

3.  **Refine Project Detail Template**:
    *   Ensure the dynamic page (`/projects/[slug]`) correctly displays all the new data fields (e.g., specific "Carpet Area" or "Status" fields if they vary).

**Why this is "Fullproof":**
Instead of maintaining 70 separate PHP/HTML files, you will have **one** template and **one** data file. Adding the remaining projects becomes a simple data entry task (copy-pasting text/image paths into `projects.ts`) rather than coding new pages.
