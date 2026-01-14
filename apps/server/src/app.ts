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
import youtubeWebsubRoutes from './routes/youtube.websub.routes';
import path from 'path';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
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
app.use('/api/youtube/websub', youtubeWebsubRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Tao Architecture API' });
});

export default app;
