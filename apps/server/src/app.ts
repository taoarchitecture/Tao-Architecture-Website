import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import careerRoutes from './routes/career.routes';
import contactRoutes from './routes/contact.routes';
import projectRoutes from './routes/project.routes';
import videoRoutes from './routes/video.routes';
import homeRoutes from './routes/home.routes';
import homeGridRoutes from './routes/home-grid.routes';
import studioRoutes from './routes/studio.routes';
import mediaRoutes from './routes/media.routes';
import settingsRoutes from './routes/settings.routes';
import pageContentRoutes from './routes/page-content.routes';
import servicesRoutes from './routes/services.routes';
import observabilityRoutes from './routes/observability.routes';
import path from 'path';
import { errorHandler, notFoundHandler } from './middleware/error.middleware';

dotenv.config();

const app = express();

// Vercel sits in front of every request as a single trusted proxy hop, so
// express-rate-limit needs this to read the real client IP from X-Forwarded-For.
app.set('trust proxy', 1);

// Known browser origins that legitimately call this API. Extra origins (e.g. a
// Vercel preview deployment) can be added without a code change via the
// comma-separated CORS_EXTRA_ORIGINS env var.
const allowedOrigins = [
  'https://tao-architecture-website.vercel.app',
  'http://localhost:3000',
  ...(process.env.CORS_EXTRA_ORIGINS?.split(',').map((o) => o.trim()).filter(Boolean) || []),
];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: (origin, callback) => {
    // Requests with no Origin header (server-to-server, curl, the cron job) aren't
    // subject to CORS at all — only allow-list browser-supplied origins.
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
}));
app.use(helmet({ crossOriginResourcePolicy: false })); // Allow cross-origin images
app.use(morgan('dev'));

// Serve static uploads
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/career', careerRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/home', homeRoutes);
app.use('/api/home-grid', homeGridRoutes);
app.use('/api/studio', studioRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/pages', pageContentRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/observability', observabilityRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Tao Architecture API' });
});

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
