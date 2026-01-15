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
