import { Router } from 'express';
import { authenticateToken, requireAdmin } from '../middleware/auth.middleware';
import { getObservabilityStatus, getWebAnalyticsOverview } from '../controllers/observability.controller';

const router = Router();

router.get('/status', authenticateToken, requireAdmin, getObservabilityStatus);
router.get('/web-analytics/overview', authenticateToken, requireAdmin, getWebAnalyticsOverview);

export default router;
