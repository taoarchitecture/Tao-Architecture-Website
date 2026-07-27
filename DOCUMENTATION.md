# Cloudinary Setup Guide for TAO Architecture

This guide explains how to set up a free **Cloudinary** account to handle image and file uploads for your Vercel deployment.

## 1. Create a Cloudinary Account
1.  Go to [Cloudinary](https://cloudinary.com/users/register/free).
2.  Sign up for a **Free** account.
3.  You can skip the "Personalize your experience" questions.

## 2. Get Your API Credentials
Once you are logged in, you will be on the **Programmable Media Dashboard**.

1.  Look for the **"Product Environment Credentials"** section at the top left.
2.  You will see three important values:
    *   **Cloud Name**
    *   **API Key**
    *   **API Secret** (Click "Reveal" to see it)

## 3. Configure Vercel
Go to your **Vercel Project Dashboard** > **Settings** > **Environment Variables** and add these three variables:

| Key | Value | Description |
| :--- | :--- | :--- |
| `CLOUDINARY_CLOUD_NAME` | `your_cloud_name` | Copy from Dashboard |
| `CLOUDINARY_API_KEY` | `your_api_key` | Copy from Dashboard |
| `CLOUDINARY_API_SECRET` | `your_api_secret` | Copy from Dashboard |

## 4. (Optional) Verify Upload Settings
Your project is already configured to upload files to a folder named `tao-architecture`.
*   You can view uploaded files in your Cloudinary Dashboard under the **"Media Library"** tab.
*   You will see a folder `tao-architecture` created automatically after the first upload.

## 5. Usage in Code
*   **Location:** `apps/server/src/middleware/upload.middleware.ts`
*   **Logic:** The code automatically detects if `NODE_ENV` is `production`. If yes, it uses these credentials to upload to Cloudinary. If no (local), it saves to your computer.

```typescript
// apps/server/src/middleware/upload.middleware.ts
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
```
# 🚀 Deployment Guide: Tao Architecture Portfolio

This guide outlines the steps to move the application from a local development environment to a production-ready cloud infrastructure.

## **Architecture Overview**

| Component | Service Provider | Reason |
| :--- | :--- | :--- |
| **Frontend** | **Vercel** | Optimized for Next.js, Global CDN, Zero Config. |
| **Backend** | **Railway** | Persistent Node.js server, easy deployment from GitHub. |
| **Database** | **Supabase (PostgreSQL)** | Robust relational DB, persistent (unlike SQLite on cloud). |
| **Storage** | **Cloudinary** | Permanent image hosting (local uploads are deleted on cloud deploys). |

---

## **Phase 1: Pre-Deployment Setup (Account Creation)**

Before we start coding, please create free accounts on the following platforms:

1.  **GitHub**: [github.com](https://github.com/) (If you haven't pushed the code yet).
2.  **Supabase**: [supabase.com](https://supabase.com/) (For the Database).
    *   Create a new project.
    *   Save the **Database URL** (Connection String) & **Direct URL**.
3.  **Cloudinary**: [cloudinary.com](https://cloudinary.com/) (For Image Storage).
    *   Sign up and go to the Dashboard.
    *   Save the **Cloud Name**, **API Key**, and **API Secret**.
4.  **Railway**: [railway.app](https://railway.app/) (For the Backend API).
5.  **Vercel**: [vercel.com](https://vercel.com/) (For the Frontend).

---

## **Phase 2: Code Refactoring (To Be Done)**

We need to update the codebase to support these services.

### **1. Database Migration (SQLite -> PostgreSQL)**
Update `modern/apps/server/prisma/schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

### **2. Image Uploads (Local -> Cloudinary)**
Install dependencies:
```bash
npm install cloudinary multer-storage-cloudinary
```
Update `modern/apps/server/src/middleware/upload.middleware.ts` to use Cloudinary storage engine instead of `multer.diskStorage`.

---

## **Phase 3: Backend Deployment (Railway)**

1.  **Push Code to GitHub**.
2.  **Create Project on Railway**:
    *   Select "Deploy from GitHub repo".
    *   Select the `apps/server` directory as the root.
3.  **Set Environment Variables** (in Railway Settings):
    *   `DATABASE_URL`: (From Supabase)
    *   `CLOUDINARY_CLOUD_NAME`: (From Cloudinary)
    *   `CLOUDINARY_API_KEY`: (From Cloudinary)
    *   `CLOUDINARY_API_SECRET`: (From Cloudinary)
    *   `JWT_SECRET`: (Generate a strong random string)
    *   `PORT`: `5000`
4.  **Deploy**: Railway will build and start the server.
5.  **Copy URL**: Save the generated URL (e.g., `https://tao-server-production.up.railway.app`).

---

## **Phase 4: Database Setup**

Once the backend is connected to Supabase:

1.  **Run Migrations (From Local Machine)**:
    ```bash
    # In .env, set DATABASE_URL to your Supabase Connection String
    npx prisma db push
    ```
2.  **Seed Admin User**:
    ```bash
    npx ts-node src/seed.ts
    ```

---

## **Phase 5: Frontend Deployment (Vercel)**

1.  **Import Project on Vercel**:
    *   Select the GitHub repo.
    *   Select `apps/client` as the root directory.
2.  **Set Environment Variables**:
    *   `NEXT_PUBLIC_API_URL`: The Railway URL + `/api` (e.g., `https://tao-server.../api`)
    *   `NEXT_PUBLIC_SERVER_URL`: The Railway URL root (e.g., `https://tao-server...`)
3.  **Deploy**: Vercel will build the Next.js app.

---

## **Phase 6: Verification**

1.  Visit the Vercel URL.
2.  Go to the footer -> **Click "© TAO Architecture" 5 times**.
3.  Login with `admin@tao.com` / `admin123`.
4.  Try uploading a new project image (It should appear in your Cloudinary dashboard).

---

**Next Steps:**
When we resume, simply say **"Ready to start Phase 2"**, and I will handle all the code changes for you!
# Migration to Modern Stack

This document outlines the migration from the legacy PHP application to the modern Next.js + Node.js stack.

## 1. Stack Overview

| Component | Legacy | Modern |
| :--- | :--- | :--- |
| **Frontend** | HTML5, jQuery, Bootstrap 3 | Next.js (React), Tailwind CSS |
| **Backend** | Core PHP | Node.js (Express), TypeScript |
| **Database** | MySQL | PostgreSQL |
| **ORM** | `mysqli` (Raw SQL) | Prisma |
| **Deployment** | FTP / Manual | Docker & Kubernetes |

## 2. Running the Modern Application

The modern application is fully containerized. To start it:

1.  Navigate to the `modern` directory:
    ```bash
    cd modern
    ```

2.  Run Docker Compose:
    ```bash
    docker-compose up --build
    ```

3.  Access the applications:
    - **Frontend**: `http://localhost:3000`
    - **Backend API**: `http://localhost:5000`
    - **PostgreSQL**: Port `5432`
    - **Redis**: Port `6379`

## 3. Visual Parity & Testing

To ensure the new site looks exactly like the old one, we use **Playwright** for visual regression testing.

### Running Visual Tests
1.  Navigate to `apps/client`:
    ```bash
    cd apps/client
    ```
2.  Run the tests:
    ```bash
    npx playwright test
    ```
    *Note: The first run will fail as it generates the baseline screenshots.*

## 4. Key Deviations
- **Routing**: URLs no longer end in `.php` (e.g., `/contact.php` is now `/contact`).
- **Admin Panel**: Rebuilt from scratch using React, offering a faster and more secure experience.
- **Image Optimization**: Images are now served in WebP format via Next.js Image component for better performance.

## 5. Deployment
The `modern` folder is self-contained. You can deploy it to any cloud provider supporting Docker (AWS ECS, Google Cloud Run, DigitalOcean App Platform).
# Neon Database Setup Guide for TAO Architecture

This guide explains how to set up a free **Neon PostgreSQL** database for your Vercel deployment.

## 1. Create a Neon Project
1.  Go to [Neon Console](https://console.neon.tech).
2.  Sign up/Log in.
3.  Click **"Create Project"**.
4.  Name it `tao-architecture` (or similar).
5.  Select a region close to your users (e.g., Singapore, Mumbai, or US East).
6.  Click **"Create Project"**.

## 2. Get Connection Strings
Once created, Neon will show you a **Connection Details** panel.

1.  **Pooled Connection (for `DATABASE_URL`)**:
    *   Look for the "Pooled connection" checkbox. Ensure it is **CHECKED**.
    *   Copy the string. It looks like: `postgres://user:pass@ep-xyz-pooler.region.neon.tech/neondb?sslmode=require`
    *   **Action**: Add this to Vercel Environment Variables as `DATABASE_URL`.

2.  **Direct Connection (for `DIRECT_URL`)**:
    *   Uncheck the "Pooled connection" checkbox.
    *   Copy the string. It looks like: `postgres://user:pass@ep-xyz.region.neon.tech/neondb?sslmode=require`
    *   **Action**: Add this to Vercel Environment Variables as `DIRECT_URL`.

## 3. Configure Vercel
Go to your Vercel Project Settings > Environment Variables and add:

| Key | Value | Description |
| :--- | :--- | :--- |
| `DATABASE_URL` | `postgres://...pooler...` | The Pooled connection string |
| `DIRECT_URL` | `postgres://...` | The Direct connection string |

## 4. Push Schema to Neon
Since Vercel builds don't run migrations automatically, you need to push your database schema from your local machine.

1.  Open your local terminal.
2.  Navigate to `apps/server`.
3.  Run the push command using your **Direct Connection String**:
    ```bash
    # Windows PowerShell
    $env:DATABASE_URL="your_direct_connection_string_here"
    $env:DIRECT_URL="your_direct_connection_string_here"
    npx prisma db push
    ```
    *Note: For the initial push, you can just use the Direct URL for both variables to keep it simple.*

## Why two URLs?
*   **Pooled URL**: Used by your running application (serverless functions) to manage thousands of connections efficiently.
*   **Direct URL**: Used by Prisma Migrate/Push to perform schema changes, which cannot run through the pooler.
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
