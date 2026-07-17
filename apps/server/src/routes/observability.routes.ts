import { Router } from 'express';
import { authenticateToken } from '../middleware/auth.middleware';
import { getObservabilityStatus, getWebAnalyticsOverview } from '../controllers/observability.controller';

const router = Router();

router.get('/status', authenticateToken, getObservabilityStatus);
router.get('/web-analytics/overview', authenticateToken, getWebAnalyticsOverview);

export default router;
