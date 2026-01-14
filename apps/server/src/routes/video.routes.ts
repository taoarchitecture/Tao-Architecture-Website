import { Router } from 'express';
import { getVideo, listVideos, syncAll } from '../controllers/video.controller';

const router = Router();

router.get('/', listVideos);
router.get('/:id', getVideo);
router.post('/sync', syncAll);

export default router;
