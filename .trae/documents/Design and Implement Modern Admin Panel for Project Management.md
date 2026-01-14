# Modern Admin Panel Design & Implementation Plan

To create a seamless, aesthetically consistent Admin Panel for managing the Tao Architecture portfolio, I will implement a full-stack solution connecting the Next.js frontend with the Express/Prisma backend.

## 1. Backend Architecture (Server)
**Goal**: Enable dynamic content management via API.

- **Database Schema Upgrade (`schema.prisma`)**:
  - Enhance the `Project` model to support rich content and structured gallery management.
  - **Proposed Fields**:
    - `description`: JSON (to store structured paragraphs/sections).
    - `gallery`: JSON or Relation (to store image URLs with sort order).
    - `seoTitle`, `seoDescription`: For better SEO control.
- **API Endpoints (`src/routes/project.routes.ts`)**:
  - `GET /projects`: Fetch all projects (for Admin List & Public Work page).
  - `GET /projects/:slug`: Fetch single project details.
  - `POST /projects`: Create new project with image uploads.
  - `PUT /projects/:id`: Update details and gallery.
  - `DELETE /projects/:id`: Remove project.
- **File Handling**:
  - Configure `multer` to handle multi-file uploads for project galleries.
  - Ensure the `/uploads` directory is statically served to the frontend.

## 2. Admin Panel Design (Frontend)
**Goal**: A sleek, "Tao Modern" aesthetic using the existing Tailwind design system (`primary-red`, `primary-gold`, `Agenda` font).

### **A. Admin Layout**
- **Sidebar Navigation**:
  - Dashboard (Overview)
  - **Projects** (Main Focus)
  - Media (News, Awards)
  - Settings
- **Style**: Minimalist dark/light mode capable, using the signature Red for active states and Gold for accents.

### **B. Project Management Pages**
1.  **Project List (`/admin/projects`)**:
    -   **Visual**: Clean data table/grid displaying Title, Category, Status, and Thumbnail.
    -   **Actions**: "Add Project" button (Primary Red), Edit (Icon), Delete (Icon).
    -   **Features**: Search bar, Category filter.

2.  **Add/Edit Project Editor (`/admin/projects/[action]`)**:
    -   **Section 1: Essentials**: Title, Slug (auto-generated), Category, Status (Ongoing/Completed).
    -   **Section 2: Details**: Location, Plot Area, Built-up Area.
    -   **Section 3: Content Builder**:
        -   Dynamic "Add Paragraph" blocks (Heading + Text) to match the current website's layout structure.
    -   **Section 4: Media Manager**:
        -   **Hero Image**: Drag & drop uploader with preview.
        -   **Gallery**: Grid view uploader allowing reordering (if possible) and deletion.

## 3. Implementation Steps
1.  **Backend Setup**:
    -   Update Prisma schema and run migrations.
    -   Create Controller & Routes for Projects.
    -   Enable static file serving for uploaded images.
2.  **Frontend Admin UI**:
    -   Build `AdminSidebar` and `AdminLayout`.
    -   Develop the `ProjectForm` component with image preview and dynamic text fields.
    -   Integrate API calls for Create/Update actions.
3.  **Data Migration**:
    -   Create a script to import existing data from `projects.ts` into the database so the admin panel is pre-populated.
