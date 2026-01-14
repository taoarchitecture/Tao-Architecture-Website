# Strategy for Migrating Individual Project Pages

We have a significant number of individual project pages (approx. 30+) in the legacy PHP site. Manually creating a separate `.tsx` page for each one in Next.js would be repetitive and hard to maintain.

**The Strategy: Dynamic Routing**

Instead of creating 30+ separate files (e.g., `azaan.tsx`, `nest.tsx`), we will create **one single dynamic page template** that changes its content based on the project URL.

## Implementation Steps

### 1. Data Centralization (The "Database")
We will expand our existing `src/data/projects.ts` file to include **all** the specific details for every project.
*   **Current State**: Only has `id`, `title`, `image`, `category`.
*   **New State**: Will include `images` (array of slider images), `projectInfo` (client, location, size, etc.), `paragraphs` (text content), and `credits`.

**Example Data Structure:**
```typescript
// src/data/projects.ts
export const projectDetails = {
  'azaan': {
    title: "Azaan",
    subtitle: "Seamlessly blending tradition and modernity",
    location: "Ahmedabad, Gujarat",
    area: "15,000 sq.ft",
    year: "2019",
    heroImage: "/img/villa/azaan/cover.jpg",
    description: [
       "The Azaan villa is a testament to...",
       "Designed with a central courtyard..."
    ],
    galleryImages: [
       "/img/villa/azaan/1.jpg",
       "/img/villa/azaan/2.jpg"
    ],
    credits: {
       "Principal Architect": "Manish Banker",
       "Team": ["Ar. X", "Ar. Y"]
    }
  },
  // ... repeats for all projects
}
```

### 2. Create the Dynamic Route
We will create a single file: `src/app/projects/[slug]/page.tsx`.
*   **`[slug]`**: This is a wildcard. If a user visits `/projects/azaan`, Next.js will load this page and pass "azaan" as the slug.
*   **Logic**: The page will read the "azaan" slug, look up the data in our `projectDetails` object, and render the page. If the slug isn't found, it shows a 404.

### 3. Component Architecture
The dynamic page will be built from reusable components to match the legacy layout:
*   **`ProjectHero`**: Full-screen header image with title.
*   **`ProjectInfo`**: The sidebar or top section with "Client", "Location", "Area".
*   **`ProjectGallery`**: Masonry or Slider grid for project images.
*   **`ProjectNavigation`**: "Next Project" / "Previous Project" links at the bottom.

## Benefits
1.  **Maintainability**: You only edit one file (`projects.ts`) to update text or images. No digging through HTML.
2.  **Consistency**: Every project page will look exactly the same (font sizes, margins, layouts).
3.  **Speed**: We can migrate all 30 pages in hours, not days, by just copy-pasting the text/image paths into the data file.

## Execution Plan
1.  **Scrape/Audit**: I will read a few representative legacy project files (e.g., `azaan.php`, `nest.php`) to understand the common content patterns.
2.  **Define Schema**: Create the TypeScript interface for `ProjectDetail`.
3.  **Build Template**: Create `src/app/projects/[slug]/page.tsx`.
4.  **Migrate Data**: Systematically extract data from the legacy PHP files into `src/data/projects.ts`.
