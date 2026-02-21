# Admin Panel & CMS Implementation Plan

Based on the analysis of your existing codebase, you already have the foundation for a **Custom Full-Stack CMS** using your current tech stack. You do **not** need an external Headless CMS (like Sanity or Strapi), which would require rewriting your backend.

**Recommendation:** Complete and polish the existing **Next.js + Express + Prisma** custom admin panel.

***

## 1. Technical Architecture (Existing & To-Be-Completed)

| Component    | Technology                    | Status     | Action Required                                               |
| :----------- | :---------------------------- | :--------- | :------------------------------------------------------------ |
| **Frontend** | Next.js 14 (App Router)       | ✅ Active   | Refactor to fetch data from API instead of `data/*.ts` files. |
| **Admin UI** | Custom React Pages (`/admin`) | ⚠️ Partial | Complete the forms for Homepage, Studio, and Media sections.  |
| **Backend**  | Express.js + Node.js          | ✅ Active   | Ensure endpoints exist for all content types.                 |
| **Database** | PostgreSQL + Prisma ORM       | ✅ Active   | Extend schema for Homepage and Studio content.                |
| **Images**   | Cloudinary                    | ✅ Active   | Integrate drag-and-drop uploaders in Admin forms.             |
| **Auth**     | JWT + BCrypt                  | ✅ Active   | Secure all Admin API routes.                                  |

***

## 2. Content Models (Database Schema)

We will extend your `schema.prisma` to cover all dynamic sections.

### **A. Project (Core Content)**

*Already exists, needs aligning with* *`projects.ts`*

* `title` (String)

* `slug` (String, Unique)

* `category` (Enum: Luxury Villas, Corporate, etc.)

* `heroImage` (String - URL)

* `gallery` (Json Array: `{ src, width, height, caption }`)

* `description` (Text / Rich Text)

* `details` (Json: `{ location, area, year, status }`)

* `isFeatured` (Boolean) - *For Home Page Grid*

* `status` (Enum: DRAFT, PUBLISHED)

### **B. Home Page Config (New)**

*To make the Home Page editable*

* `heroSlides` (Json Array: Image URLs for the main slider)

* `bannerText` (String) - *The "Touching intangible beauty..." text*

* `bottomCtaText` (String)

### **C. Studio & Team (New)**

*To replace* *`data/studio.ts`*

* `name` (String)

* `role` (String)

* `bio` (Text)

* `image` (String - URL)

* `order` (Int)

***

## 3. Admin Panel Structure (Sitemap)

The Admin Panel will be accessible at `/admin`.

1. **Dashboard (`/admin/dashboard`)**: Quick stats (Total Projects, Recent Inquiries).
2. **Projects (`/admin/projects`)**:

   * List View: Table with search/filter.

   * Create/Edit: Form with tabs (General Info, Gallery, Details).
3. **Home Page (`/admin/home`)**:

   * Hero Slider Manager (Upload/Reorder slides).

   * Banner Text Editor.
4. **Studio (`/admin/studio`)**:

   * Team Member List (Add/Edit/Delete/Reorder).
5. **Media (`/admin/media`)**:

   * Publications & Awards manager.
6. **Settings**: Change Admin Password.

***

## 4. Image Management Strategy

* **Storage:** Continue using **Cloudinary**. It allows on-the-fly resizing and optimization.

* **Upload Experience:**

  * In the Admin forms, replace text inputs with a **"Drop Zone"**.

  * When an image is dropped:

    1. Frontend sends it to `POST /api/upload`.
    2. Server uploads to Cloudinary.
    3. Server returns the Secure URL.
    4. Frontend saves the URL in the form state.

* **Gallery Management:** Implement a drag-and-drop list to reorder images easily.

***

## 5. Preview & Publish Workflow

Since you asked for "Draft/Publish" capabilities:

1. **Draft System:**

   * Add a `status` field (`DRAFT` vs `PUBLISHED`) to all items.

   * **Public Website:** Only fetches items where `status === 'PUBLISHED'`.

   * **Admin Panel:** Shows ALL items.
2. **Preview:**

   * Add a "Preview" button in the Admin Editor.

   * This opens the live page (e.g., `/projects/new-villa`) but with a special `?preview=true` query param that bypasses the "Published" filter (requires Admin login).

***

## 6. Implementation Steps

### **Phase 1: Backend & Database (Foundation)**

1. Update `schema.prisma` with new models (Home, Studio).
2. Run migration (`npx prisma migrate dev`).
3. Create API Endpoints (GET/POST/PUT/DELETE) for all new models.

### **Phase 2: Admin Frontend (The Tool)**

1. Finish the `ProjectForm` component (add Gallery upload support).
2. Create `HomeForm` and `TeamForm` components.
3. Connect forms to the API.

### **Phase 3: Client Integration (The Connection)**

1. Create a `lib/api.ts` in the Client to fetch data.
2. Replace static imports (`import { projects } from '@/data/projects'`) with async API calls in your Next.js pages.

   * *Example:* `const projects = await getProjects();` inside your Server Components.
3. Test responsiveness with real data.

### **Phase 4: Migration**

1. Write a script to push all existing data from `data/*.ts` into your Database.
2. Verify the live site looks identical to the static version.

***

## 7. Future Scalability

* **Blog:** Easy to add a `Post` model later.

* **Multi-language:** Add a `locale` field to content tables (e.g., `en`, `fr`).

* **Performance:** Next.js automatically caches API requests. We can implement "On-Demand Revalidation" so the site updates instantly when you click "Save" in Admin, but remains static (fast) for users.

**Decision:** Shall we proceed with **Phase 1 (Backend & Schema Update)** to set up the database structure first?
