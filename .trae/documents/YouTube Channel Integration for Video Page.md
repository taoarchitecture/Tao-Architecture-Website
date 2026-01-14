## Overview
Implement a robust, compliant integration between your YouTube channel and the site’s Video page. It resolves the channel ID from the provided handle, fetches and caches videos, synchronizes new uploads, and renders a responsive, searchable gallery with analytics.

## Data Flow & APIs
- Resolve channel ID from handle using channels.list: part=id, forHandle=@TAOSTUDIO_0.
- Fetch existing videos via playlistItems.list for the "Uploads" playlist (authoritative) and enrich stats via videos.list (part=statistics).
- Paginate using nextPageToken; batch stats lookups (≤50 IDs per call).
- Use ETags/If-None-Match to reduce quota; cache responses server-side.

## Server Implementation (apps/server)
- Config: add YOUTUBE_API_KEY to .env; never expose to client. Load in [app.ts](file:///d:/Mann/Tao%20Arc%20PHP%20Version/apps/server/src/app.ts).
- Models (Prisma): add Video, VideoTag, VideoCategory, and VideoToTag join; store videoId, title, description, thumbnails, publishedAt, viewCount, channelId, etag, lastSyncedAt.
- Services: create youtube.service.ts to encapsulate Data API calls (resolveChannelId, getUploadsPlaylistId, listUploadsPage, getVideoStats, fetchAllVideos).
- Sync job: create sync-youtube.ts to pull all videos initially, then incremental sync.
- WebSub: implement subscription to hub https://pubsubhubbub.appspot.com/ with topic https://www.youtube.com/feeds/videos.xml?channel_id=CHANNEL_ID.
  - Add routes: /api/youtube/websub/subscribe (POST) and /api/youtube/websub/callback (GET verify, POST notifications).
  - Verify signatures (HMAC) if using hub.secret; dedupe entries by yt:videoId; refresh metadata via videos.list.
- REST endpoints:
  - GET /api/videos: list with pagination, filters (category, tags, date range, relevance), search query.
  - GET /api/videos/:id: single video details.
  - POST /api/videos/sync: admin-triggered manual sync.
  - GET /api/videos/stats: lightweight stats refresh (rate-limited).
- Caching: in-memory LRU (per instance) and optional disk/DB ETag storage; set cache-control headers.

## Client Implementation (apps/client)
- Page: app/video/page.tsx to render Video Gallery.
- Components:
  - VideoGrid: responsive CSS Grid with thumbnails (default, HQ), titles, descriptions, published dates, view counts.
  - VideoCard: shows thumbnail, title, date, views, tags; clicking opens modal/player.
  - VideoPlayerModal: embeds YouTube IFrame with native controls, fullscreen, quality menu preserved.
  - FiltersBar: category dropdown, tag multiselect, date range, sort by date/relevance/views.
  - SearchBox: debounced text input; calls /api/videos?q=.
- State/Data: use server-side fetching (Next.js server components) for initial load; client-side fetch for filters/search; paginate/infinite scroll.
- Styling: TailwindCSS; ensure accessible focus states and keyboard navigation.

## Categorization & Tagging
- Source YouTube tags from videos.list (snippet.tags) and map to internal tags.
- Categories: maintain config mapping tags/keywords → project types (e.g., Corporate, Residential, Art Installation), extendable.
- Allow manual overrides via admin (future scope) if needed.

## Search & Sorting
- Server: full-text search across title and description; optional Prisma FTS or simple LIKE; support sort by publishedAt, views, relevance.
- Client: debounced input (300ms), show result count, highlight query terms.

## Analytics
- GA4 events from IFrame API: video_start, video_pause, video_complete, and percent milestones (25/50/75/100).
- Attributes: videoId, title, category, tags; ensure consent and privacy compliance.

## Compliance & Quotas
- Use official IFrame Player; keep YouTube branding.
- Attribute YouTube as source; link to watch and channel pages.
- Cache temporarily; respect ETags; remove stale/private videos promptly.
- Stay within quotas; batch requests; backoff on errors.

## Testing
- Unit: youtube.service API calls (mocked), categorization utilities.
- E2E (Playwright): gallery renders, filters/search work, player opens and plays.
- Cross-browser: Chrome, Edge, Firefox, Safari; responsive breakpoints.

## Configuration & Secrets
- .env (server): YOUTUBE_API_KEY, YOUTUBE_WEBSUB_SECRET, YOUTUBE_CHANNEL_ID (optional; auto-resolve from handle on first run and persist).
- Do not expose API key in client; client fetches via server endpoints.

## Rollout Plan
1) Implement server services/endpoints and Prisma models.
2) Initial full sync and cache warm-up; verify counts and stats.
3) Build client gallery components and connect to endpoints.
4) Enable WebSub subscription; verify callback delivery and dedupe.
5) Add analytics events; verify in GA4 DebugView.
6) Write tests; run Playwright across devices.
7) Ship behind feature flag; monitor quotas and errors.

## Notes on Channel ID Resolution
- Resolve channelId via channels.list with forHandle=@TAOSTUDIO_0 and persist. Fallback: search.list type=channel q=TAOSTUDIO_0 if handle fails.

Please confirm the plan; I will proceed with implementation next.