## Goal
Build an admin-managed Projects system (create/edit content and images) and make the modern site ready for deployment.

## Tech Stack Decisions
- **Frontend**: Next.js App Router (current), deploy on Vercel
- **Backend API**: Extend existing API used by Admin (JWT auth), deploy on Railway/Render
- **Database**: Postgres
- **Storage/CDN**: Supabase Storage or S3-compatible bucket
- **Auth**: Existing `/auth/login` with JWT; switch to httpOnly cookies on the frontend for admin routes

## Data Model
- projects: id (uuid), slug (unique), title, subtitle, category_id, status, location, plot_area, built_up_area, description_paragraphs (JSON[]), seo_title, seo_description, hero_image_url, is_published (bool), created_at, updated_at
- project_gallery: id, project_id (fk), image_url, title, description, sort_order
- project_categories: id, key (e.g., luxuryvillas), label

## Backend API (extend existing service)
- Auth: reuse `/auth/login` (already in [admin/login](file:///d:/Mann/Tao%20Arc%20PHP%20Version/modern/apps/client/src/app/admin/login/page.tsx))
- Projects CRUD:
  - `POST /projects` → create
  - `GET /projects` → list (filters: category, published)
  - `GET /projects/:slug` → detail
  - `PUT /projects/:id` → update
  - `DELETE /projects/:id` → soft delete
- Gallery:
  - `POST /projects/:id/gallery` → add image
  - `PUT /projects/:id/gallery/:imageId` → edit meta/order
  - `DELETE /projects/:id/gallery/:imageId`
- Uploads:
  - `POST /uploads/sign` → presigned URL for direct-to-bucket upload
- Validation: zod/celebrate; rate-limit; CORS allow Vercel frontend

## Admin Panel (Next.js)
Location: `/admin/projects`
- **List**: search, filter by category/status, pagination; actions: edit, publish/unpublish
- **Create/Edit**:
  - Fields: title, subtitle, category, status, location, areas, SEO fields
  - Description paragraphs: add/remove/reorder
  - Hero image: upload, preview, replace
  - Gallery manager: multi-upload, titles, descriptions, drag-drop sort, delete
  - Save triggers: API update + site revalidation
- **Auth**: guard with httpOnly cookie session; logout; 403 on non-admin

## Public Site Integration
- **Work Page**: fetch categories + projects from API, keep UX and red accents. References: [work/page.tsx](file:///d:/Mann/Tao%20Arc%20PHP%20Version/modern/apps/client/src/app/work/page.tsx), [WorkSidebar.tsx](file:///d:/Mann/Tao%20Arc%20PHP%20Version/modern/apps/client/src/components/work/WorkSidebar.tsx)
- **Project Detail**: read by slug from API, preserve gallery/lightbox. Reference: [projects/[slug]/page.tsx](file:///d:/Mann/Tao%20Arc%20PHP%20Version/modern/apps/client/src/app/projects/%5Bslug%5D/page.tsx)
- **ISR**: use `revalidate` (e.g., 60s) and add `/api/revalidate` endpoint with secret; call it after admin saves
- **Fallback**: 404 → optional fallback to static [projects.ts](file:///d:/Mann/Tao%20Arc%20PHP%20Version/modern/apps/client/src/data/projects.ts) during migration

## Migration Steps
1. Transform current [projects.ts](file:///d:/Mann/Tao%20Arc%20PHP%20Version/modern/apps