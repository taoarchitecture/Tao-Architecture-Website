import app from './app';
import { fetchAndStoreAllVideos } from './services/youtube.service';

const PORT = process.env.PORT || 5000;

// Defense in depth: a rejected promise that isn't awaited inside a request
// handler (e.g. a third-party upload library's internal error path) can
// otherwise crash the entire process for every user. Two independent
// incidents during this project's QA pass (a bad pagination param, and a
// multipart upload) both took the whole server down this way — log and
// keep running instead, the same way asyncHandler already does for
// rejections that DO originate inside a request handler.
process.on('unhandledRejection', (reason) => {
  console.error('Unhandled promise rejection (process kept alive):', reason);
});

// unhandledRejection only covers rejected promises; a synchronous throw
// outside of Express's own request handling (e.g. in a callback a library
// invokes directly) needs this separate handler to avoid killing the process
// the same way.
process.on('uncaughtException', (err) => {
  console.error('Uncaught exception (process kept alive):', err);
});

app.listen(PORT as number, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);

  // Off by default: production syncs via the Vercel Cron -> POST /api/videos/sync
  // path instead. Only opt in here for a standalone/Docker deployment that isn't
  // fronted by that cron job — and never against the production database.
  if (process.env.ENABLE_INTERNAL_VIDEO_SYNC === 'true') {
    const handle = process.env.YOUTUBE_CHANNEL_HANDLE || '@TAOSTUDIO_0';
    fetchAndStoreAllVideos(handle).catch(() => {});
    setInterval(() => {
      fetchAndStoreAllVideos(handle).catch(() => {});
    }, 15 * 60 * 1000);
  }
});
