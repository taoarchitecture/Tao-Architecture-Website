# TAO Architecture - Website

This repository contains the source code for the TAO Architecture website, structured as a monorepo.

## Project Structure

*   `apps/client`: Next.js 16 frontend (The Website).
*   `apps/server`: Express + Prisma + SQLite backend (The API).

## Deployment Instructions

### 1. Deploying the Client (Website) on Vercel

The client is optimized for Vercel deployment.

**Steps:**
1.  Import this repository into Vercel.
2.  **Important:** In Vercel Project Settings > General, set the **Root Directory** to `apps/client`.
3.  Vercel will automatically detect Next.js.
4.  Set the Environment Variables in Vercel:
    *   `NEXT_PUBLIC_API_BASE`: The URL of your deployed server (e.g., `https://api.yourdomain.com`).

### 2. Deploying the Server (API)

The server has been configured for **Vercel Serverless Functions**.

**Pre-requisites:**
1.  **PostgreSQL Database**: You MUST use a Postgres database (e.g., Vercel Postgres, Neon, Supabase). SQLite will NOT work.
2.  **Environment Variables**: Add the following in Vercel:
    *   `DATABASE_URL`: Your Postgres connection string.
    *   `JWT_SECRET`: A secure random string.
    *   `YOUTUBE_API_KEY`: Your YouTube Data API key.
    *   `CLOUDINARY_CLOUD_NAME`: Your Cloudinary Cloud Name.
    *   `CLOUDINARY_API_KEY`: Your Cloudinary API Key.
    *   `CLOUDINARY_API_SECRET`: Your Cloudinary API Secret.

**Deployment Steps:**
1.  Vercel will automatically detect the configuration in `vercel.json`.
2.  It will build both the Client (Next.js) and the Server (Express as Serverless).
3.  The API will be available at `/api/...`.

**Database Migration:**
After deploying, you need to push the schema to your production database. Since you can't run shell commands easily on Vercel, run this locally (connecting to your production DB):
```bash
# Set your production DATABASE_URL in .env temporarily
cd apps/server
npx prisma db push
```

## Local Development

1.  **Install Dependencies:**
    ```bash
    cd apps/client && npm install
    cd ../server && npm install
    ```

2.  **Run Server:**
    ```bash
    cd apps/server
    npx prisma generate
    npx prisma db push
    npm run dev
    ```

3.  **Run Client:**
    ```bash
    cd apps/client
    npm run dev
    ```
