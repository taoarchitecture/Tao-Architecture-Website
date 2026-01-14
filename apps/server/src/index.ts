import app from './app';
import { fetchAndStoreAllVideos } from './services/youtube.service';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  const handle = process.env.YOUTUBE_CHANNEL_HANDLE || '@TAOSTUDIO_0';
  fetchAndStoreAllVideos(handle).catch(() => {});
  setInterval(() => {
    fetchAndStoreAllVideos(handle).catch(() => {});
  }, 15 * 60 * 1000);
});
