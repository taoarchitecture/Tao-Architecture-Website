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
