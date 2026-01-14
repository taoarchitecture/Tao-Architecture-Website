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

**Note:** The server uses **SQLite** (`dev.db`) by default, which is **NOT compatible with Vercel** (serverless functions have ephemeral filesystems, meaning your database will reset constantly).

To deploy the server, you have two options:

#### Option A: Deploy to a VPS or Persistent Cloud (Railway, Render, DigitalOcean) - **Recommended**
1.  These platforms support persistent storage (volumes) or SQLite files if the instance doesn't restart often (though Postgres is better).
2.  Set the build command to `npm install && npm run build`.
3.  Start command: `npm start`.
4.  Env Vars:
    *   `PORT`: 5000 (or platform default)
    *   `DATABASE_URL`: `file:./dev.db` (or your Postgres URL)
    *   `YOUTUBE_API_KEY`: Your key.
    *   `CLOUDINARY_...`: Your credentials.

#### Option B: Deploy to Vercel (Requires Migration)
To run the server on Vercel, you **MUST**:
1.  Migrate the database from SQLite to **PostgreSQL** (e.g., Vercel Postgres, Neon, Supabase).
    *   Update `apps/server/prisma/schema.prisma` to use `provider = "postgresql"`.
    *   Update `DATABASE_URL` to the Postgres connection string.
2.  Refactor `src/index.ts` to export the Express app as a Serverless Function (instead of `app.listen`).
3.  Replace `setInterval` (YouTube fetcher) with **Vercel Cron Jobs**.

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
