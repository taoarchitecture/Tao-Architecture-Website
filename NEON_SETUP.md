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
