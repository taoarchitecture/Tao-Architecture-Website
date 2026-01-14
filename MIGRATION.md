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
