# Modernization Plan: Tao Architecture Website

## 1. Project Setup & Infrastructure
- [ ] **Initialize Repository**: Create a monorepo structure (`apps/client`, `apps/server`).
- [ ] **Docker Environment**:
    - [ ] Create `docker-compose.yml` for Postgres, Redis, Node API, and Next.js Frontend.
    - [ ] Configure environment variables (`.env`).
- [ ] **Database Setup**:
    - [ ] Initialize PostgreSQL with schemas for `users` and `applications`.
    - [ ] (Optional) Create `projects` schema for future-proofing content.

## 2. Backend Implementation (Node.js/Express)
- [ ] **Core Setup**: Initialize Express app with TypeScript, Helmet, CORS, and Logger (Winston/Morgan).
- [ ] **Database Layer**: Setup Prisma ORM or TypeORM to connect to PostgreSQL.
- [ ] **Authentication Module**:
    - [ ] Implement Login API (JWT issue).
    - [ ] Implement Password Reset API.
    - [ ] Middleware for protected Admin routes.
- [ ] **Career Module**:
    - [ ] **POST /api/career**: Handle multipart form data (fields + file uploads).
    - [ ] **GET /api/applications**: List applications with pagination/filtering (Admin only).
    - [ ] **GET /api/applications/:id**: Get full application details.
    - [ ] **PUT /api/applications/:id**: Update status (Approve/Reject).
    - [ ] **DELETE /api/applications/:id**: Soft/Hard delete.
- [ ] **Contact Module**:
    - [ ] **POST /api/contact**: Handle contact form submissions.
- [ ] **Email Service**: Configure Nodemailer to send notifications for Contact and Career submissions.

## 3. Frontend Implementation (Next.js + Tailwind)
- [ ] **Setup**: Initialize Next.js project with TypeScript and Tailwind CSS.
- [ ] **Asset Migration**: Copy images and fonts from legacy `img/` and `fonts/` to `public/`.
- [ ] **Global Components**:
    - [ ] `Navbar` (Responsive, matching `header.php`).
    - [ ] `Footer` (Matching `footer.php`).
    - [ ] `Layout` wrapper.
- [ ] **Pages Migration**:
    - [ ] **Home (`/`)**: Hero Slider, Intro Text, Featured Projects Grid.
    - [ ] **Work (`/work`)**: Masonry grid with category filtering (Luxury Villas, Corporate, etc.).
    - [ ] **Studio (`/studio`)**: Team section, Awards (Tabbed interface), News.
    - [ ] **Contact (`/contact`)**: Map integration, Address info, Contact Form.
    - [ ] **Career (`/career`)**: Complex multi-step form (replicating `career.php` fields).
- [ ] **Project Detail Pages**:
    - [ ] Create a dynamic route `/projects/[slug]`.
    - [ ] Extract content from legacy PHP files (e.g., `azaan.php`) into a JSON config or DB.
    - [ ] Render project details (Hero image, description, gallery).
- [ ] **Admin Dashboard (`/admin`)**:
    - [ ] Login Screen.
    - [ ] Dashboard Overview.
    - [ ] Applications List Table (DataTables replica).
    - [ ] Application Detail View.

## 4. Performance & Polish
- [ ] **Image Optimization**: Replace `<img>` tags with `next/image` and implement `sizes` prop.
- [ ] **SEO**: Implement Metadata API for dynamic titles and descriptions.
- [ ] **Verification**: Compare visual fidelity with the original PHP site.
