# Vercel Observability Execution Log

Last updated: 2026-07-17

## Objective

Execute every practical recommendation from the Vercel Analytics and Speed Insights research without waiting for external credentials or paid-plan changes.

## Recommendations Implemented

## Latest Verification Outcome

Status: Partially live

Verified result:
- `VERCEL_PROJECT_ID` and `VERCEL_ACCESS_TOKEN` were configured locally in `apps/server/.env`
- The local `/api/observability/status` endpoint now confirms:
  - token configured
  - project ID configured
  - live Web Analytics server query path is ready
- Direct and local API validation confirmed that the current project can be queried without adding `VERCEL_TEAM_ID` or `VERCEL_TEAM_SLUG`
- The local `/api/observability/web-analytics/overview` endpoint now returns successfully
- Current live dataset is zeroed, which is consistent with either no traffic yet or Web Analytics not yet enabled on the Vercel dashboard
- Vercel currently returns a `402 payment_required` response for Analytics custom events, so custom event reporting now degrades gracefully to zero with a warning instead of failing the endpoint

Files affected during verification hardening:
- `apps/server/.env`
- `apps/server/src/controllers/observability.controller.ts`
- `apps/client/src/app/admin/observability/page.tsx`

Remaining active blocker after configuration:
- Web Analytics custom event reporting is not available on the current Vercel plan unless Pro or Enterprise access is enabled

Security follow-up:
- Because the Vercel access token was pasted into chat for setup, rotate that token after confirming production configuration is complete

### 1. Native client instrumentation

Status: Implemented

What was done:
- Installed `@vercel/analytics` in `apps/client`
- Installed `@vercel/speed-insights` in `apps/client`
- Mounted both products in the Next.js root layout through `src/components/observability/VercelObservability.tsx`

Files:
- `apps/client/package.json`
- `apps/client/package-lock.json`
- `apps/client/src/app/layout.tsx`
- `apps/client/src/components/observability/VercelObservability.tsx`

Implementation steps:
1. Install the official Vercel client SDK packages
2. Create a shared observability component for both products
3. Mount that component in the root app layout so all public routes are covered

Resources required:
- Access to the client app package
- Vercel deployment target for production collection

Timeline:
- Completed in this execution session

### 2. Custom admin observability workspace

Status: Implemented

What was done:
- Added `/admin/observability`
- Added sidebar navigation entry under System
- Added dashboard quick action for observability
- Built a readiness-focused admin screen that shows:
  - current configuration state
  - implemented work
  - blocked items
  - next manual steps
  - live Web Analytics data when credentials are available

Files:
- `apps/client/src/app/admin/observability/page.tsx`
- `apps/client/src/components/admin/AdminLayout.tsx`
- `apps/client/src/app/admin/dashboard/page.tsx`

Implementation steps:
1. Add admin route and navigation entry
2. Create configuration status cards
3. Add placeholders for live Vercel Web Analytics reporting
4. Surface current blockers so the admin area remains useful even before Vercel credentials are provided

Resources required:
- Existing admin JWT authentication
- Backend API URL in `NEXT_PUBLIC_API_URL`

Timeline:
- Completed in this execution session

### 3. Server-side Web Analytics integration scaffold

Status: Implemented

What was done:
- Added authenticated backend endpoints for observability
- Added server-side Vercel Web Analytics API proxy logic
- Added graceful blocking responses when required env vars are missing

Files:
- `apps/server/src/controllers/observability.controller.ts`
- `apps/server/src/routes/observability.routes.ts`
- `apps/server/src/app.ts`

Implementation steps:
1. Create a configuration status endpoint for admin use
2. Create a live Web Analytics overview endpoint
3. Proxy calls through the server with Bearer token auth so Vercel credentials never reach the browser
4. Return structured blocker messages if env vars are not yet configured

Resources required:
- `VERCEL_ACCESS_TOKEN`
- `VERCEL_PROJECT_ID`
- Optional `VERCEL_TEAM_ID` or `VERCEL_TEAM_SLUG` for team-owned projects

Timeline:
- Code completed in this execution session
- Live data becomes available immediately after env configuration and Vercel dashboard enablement

### 4. Environment and setup documentation

Status: Implemented

What was done:
- Updated client `.env.example` to align with real app usage
- Updated server `.env.example` with Vercel observability variables
- Corrected SMTP example variable names to match server code

Files:
- `apps/client/.env.example`
- `apps/server/.env.example`
- `apps/client/src/types/global.d.ts`

Implementation steps:
1. Add the current client API variable name used by the app
2. Document Vercel access requirements for the backend
3. Correct stale environment examples that could block later setup

Resources required:
- Environment variable management for local and deployed environments

Timeline:
- Completed in this execution session

## Recommendations Not Fully Executable Yet

### 1. Enable Web Analytics in the Vercel dashboard

Status: Blocked by external platform access

Root cause:
- Requires a Vercel account with project access and dashboard permissions

Required resources:
- Vercel project access
- Project-level Analytics permission

Estimated timeline after access is provided:
- 15 to 30 minutes

### 2. Enable Speed Insights in the Vercel dashboard

Status: Blocked by external platform access

Root cause:
- Requires Vercel dashboard access to toggle the feature per project

Required resources:
- Vercel project access
- Project-level Speed Insights permission

Estimated timeline after access is provided:
- 15 to 30 minutes

### 3. Provide live custom dashboard parity for Speed Insights

Status: Partially blocked

Root cause:
- Vercel does not expose the same first-class REST query model for Speed Insights that it exposes for Web Analytics
- Full custom parity requires Drains or a separate warehouse/reporting layer

Required resources:
- Pro or Enterprise Vercel plan for Drains
- HTTPS ingestion endpoint
- Data storage layer such as Supabase/Postgres
- Reporting logic for percentile-based vitals aggregation

Estimated timeline after approval and access:
- 1 to 2 days for initial drain ingestion
- 2 to 4 additional days for polished dashboard-grade reporting

## Step-by-step Remaining Manual Plan

### Phase A. Credential activation

1. Create a Vercel access token
2. Retrieve the Tao Arc Vercel `projectId`
3. If team-owned, capture `teamId` or `teamSlug`
4. Store them in `apps/server/.env`

Estimated timeline:
- 30 to 60 minutes

### Phase B. Platform enablement

1. Open the Vercel project dashboard
2. Enable Web Analytics
3. Enable Speed Insights
4. Deploy the latest client build to Vercel

Estimated timeline:
- 30 to 60 minutes

### Phase C. Verification

1. Visit production pages
2. Confirm Web Analytics requests are captured
3. Confirm Speed Insights script is present
4. Open `/admin/observability`
5. Validate that live Web Analytics data appears

Estimated timeline:
- 30 to 90 minutes depending on propagation and traffic

### Phase D. Optional advanced Speed Insights reporting

1. Upgrade to a plan that supports Drains if necessary
2. Create a Speed Insights drain
3. Send data to a dedicated ingestion endpoint
4. Persist drain payloads
5. Build percentile and route-level reporting in the admin dashboard

Estimated timeline:
- 2 to 6 days depending on desired fidelity

## Decision Log

- Decision: implement official Vercel client SDKs now
  Reason: fully feasible in-code and required for native collection

- Decision: build Web Analytics API support first
  Reason: Vercel officially documents a query API for Web Analytics and supports embedding/reporting use cases

- Decision: do not fake full Speed Insights parity
  Reason: official read-side access is not equivalent to Web Analytics; dashboard parity would require drains and custom aggregation

- Decision: expose blocker status inside the admin UI
  Reason: the dashboard remains operational and informative even before external Vercel access is granted

- Decision: log changes in-repo instead of relying only on chat history
  Reason: future contributors need persistent implementation context

## Completion Summary

Completed now:
- Native Vercel client instrumentation
- Admin observability screen
- Authenticated server-side Web Analytics integration scaffold
- Environment examples and execution logging

Awaiting external access:
- Vercel token and project identifiers
- Dashboard enablement for Analytics and Speed Insights
- Optional Drains setup for advanced Speed Insights reporting
