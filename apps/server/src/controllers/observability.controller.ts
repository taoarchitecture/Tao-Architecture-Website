import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';

interface AggregateRow {
  [key: string]: unknown;
}

interface AggregateResponse {
  data?: AggregateRow[] | AggregateRow;
}

const VERCEL_WEB_ANALYTICS_BASE_URL = 'https://api.vercel.com/v1/query/web-analytics';

function toDateString(value: string | undefined, fallback: Date): string {
  if (!value) {
    return fallback.toISOString().slice(0, 10);
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return fallback.toISOString().slice(0, 10);
  }

  return parsed.toISOString().slice(0, 10);
}

function resolveRange(query: AuthRequest['query']) {
  const today = new Date();
  const defaultSince = new Date(today);
  defaultSince.setDate(today.getDate() - 6);

  return {
    since: toDateString(typeof query.since === 'string' ? query.since : undefined, defaultSince),
    until: toDateString(typeof query.until === 'string' ? query.until : undefined, today),
  };
}

function getConfigStatus() {
  const token = process.env.VERCEL_ACCESS_TOKEN?.trim();
  const projectId = process.env.VERCEL_PROJECT_ID?.trim();
  const teamId = process.env.VERCEL_TEAM_ID?.trim();
  const teamSlug = process.env.VERCEL_TEAM_SLUG?.trim();

  return {
    token,
    projectId,
    teamId,
    teamSlug,
    vercelTokenConfigured: Boolean(token),
    vercelProjectIdConfigured: Boolean(projectId),
    vercelTeamIdConfigured: Boolean(teamId),
    vercelTeamSlugConfigured: Boolean(teamSlug),
    webAnalyticsQueryReady: Boolean(token && projectId),
  };
}

function normalizeRows(response: AggregateResponse): AggregateRow[] {
  if (Array.isArray(response.data)) {
    return response.data;
  }

  if (response.data && typeof response.data === 'object') {
    return [response.data];
  }

  return [];
}

function getNumber(value: unknown): number {
  if (typeof value === 'number') {
    return value;
  }

  if (typeof value === 'string') {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  return 0;
}

function getString(value: unknown, fallback = 'Unknown'): string {
  return typeof value === 'string' && value.trim().length > 0 ? value : fallback;
}

async function fetchWebAnalytics(
  endpoint: string,
  params: Record<string, string>
): Promise<AggregateResponse> {
  const config = getConfigStatus();

  if (!config.token || !config.projectId) {
    throw new Error('Missing Vercel Web Analytics configuration.');
  }

  const url = new URL(`${VERCEL_WEB_ANALYTICS_BASE_URL}/${endpoint}`);
  url.searchParams.set('projectId', config.projectId);

  if (config.teamId) {
    url.searchParams.set('teamId', config.teamId);
  } else if (config.teamSlug) {
    url.searchParams.set('slug', config.teamSlug);
  }

  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      url.searchParams.set(key, value);
    }
  });

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${config.token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Vercel API request failed (${response.status}): ${detail}`);
  }

  return (await response.json()) as AggregateResponse;
}

export async function getObservabilityStatus(req: AuthRequest, res: Response): Promise<void> {
  const config = getConfigStatus();
  const blockedItems: string[] = [];
  const nextSteps: string[] = [];

  if (!config.vercelTokenConfigured) {
    blockedItems.push('`VERCEL_ACCESS_TOKEN` is not configured on the server, so live Vercel API queries are blocked.');
    nextSteps.push('Create a Vercel access token with project access and store it as `VERCEL_ACCESS_TOKEN` in `apps/server/.env`.');
  }

  if (!config.vercelProjectIdConfigured) {
    blockedItems.push('`VERCEL_PROJECT_ID` is missing, so the server cannot target the Tao Arc Vercel project.');
    nextSteps.push('Add the Vercel project identifier as `VERCEL_PROJECT_ID` in `apps/server/.env`.');
  }

  if (!config.vercelTeamIdConfigured && !config.vercelTeamSlugConfigured) {
    nextSteps.push('If the Vercel project belongs to a team, add either `VERCEL_TEAM_ID` or `VERCEL_TEAM_SLUG` for scoped API access.');
  }

  nextSteps.push('Enable Web Analytics and Speed Insights from the Vercel project dashboard before expecting live metrics.');
  nextSteps.push('If full custom Speed Insights reporting is required later, provision a Pro or Enterprise Drains workflow and store forwarded events in your own database.');

  res.json({
    project: {
      vercelTokenConfigured: config.vercelTokenConfigured,
      vercelProjectIdConfigured: config.vercelProjectIdConfigured,
      vercelTeamIdConfigured: config.vercelTeamIdConfigured,
      vercelTeamSlugConfigured: config.vercelTeamSlugConfigured,
    },
    features: {
      webAnalytics: {
        clientInstrumentationInstalled: true,
        serverQueryReady: config.webAnalyticsQueryReady,
        manualDashboardEnablementRequired: true,
      },
      speedInsights: {
        clientInstrumentationInstalled: true,
        manualDashboardEnablementRequired: true,
        customAdminParity: 'partial' as const,
        drainsRecommended: true,
      },
      drains: {
        supportedPlanRequired: 'pro-or-enterprise',
        manualVercelSetupRequired: true,
      },
    },
    blockedItems,
    nextSteps,
    implementedAt: new Date().toISOString(),
  });
}

export async function getWebAnalyticsOverview(req: AuthRequest, res: Response): Promise<void> {
  const config = getConfigStatus();

  if (!config.webAnalyticsQueryReady) {
    res.status(503).json({
      message: 'Vercel Web Analytics is not fully configured on the server.',
      missing: [
        !config.vercelTokenConfigured ? 'VERCEL_ACCESS_TOKEN' : null,
        !config.vercelProjectIdConfigured ? 'VERCEL_PROJECT_ID' : null,
      ].filter(Boolean),
    });
    return;
  }

  const range = resolveRange(req.query);
  const warnings: string[] = [];

  try {
    const [visitsCountResponse, trendResponse, topPagesResponse, topCountriesResponse] =
      await Promise.all([
        fetchWebAnalytics('visits/count', {}),
        fetchWebAnalytics('visits/aggregate', { ...range, by: 'day' }),
        fetchWebAnalytics('visits/aggregate', { ...range, by: 'requestPath', limit: '5' }),
        fetchWebAnalytics('visits/aggregate', { ...range, by: 'country', limit: '5' }),
      ]);

    let eventsCountResponse: AggregateResponse = {};
    let topEventsResponse: AggregateResponse = {};

    try {
      [eventsCountResponse, topEventsResponse] = await Promise.all([
        fetchWebAnalytics('events/count', {}),
        fetchWebAnalytics('events/aggregate', { ...range, by: 'eventName', limit: '5' }),
      ]);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Custom event reporting is unavailable.';
      warnings.push(message);
    }

    const visitsCount = normalizeRows(visitsCountResponse)[0] || {};
    const eventsCount = normalizeRows(eventsCountResponse)[0] || {};
    const topPages = normalizeRows(topPagesResponse).map((row) => ({
      label: getString(row.requestPath ?? row.route, 'Unknown page'),
      pageviews: getNumber(row.pageviews),
      visitors: getNumber(row.visitors),
    }));
    const topCountries = normalizeRows(topCountriesResponse).map((row) => ({
      label: getString(row.country, 'Unknown country'),
      pageviews: getNumber(row.pageviews),
      visitors: getNumber(row.visitors),
    }));
    const topEvents = normalizeRows(topEventsResponse).map((row) => ({
      label: getString(row.eventName, 'Unnamed event'),
      count: getNumber(row.count),
      visitors: getNumber(row.visitors),
    }));

    res.json({
      range,
      summary: {
        pageviews: getNumber(visitsCount.pageviews),
        visitors: getNumber(visitsCount.visitors),
        customEventCount: getNumber(eventsCount.count),
      },
      trafficTrend: normalizeRows(trendResponse).map((row) => ({
        timestamp: getString(row.timestamp, ''),
        pageviews: getNumber(row.pageviews),
        visitors: getNumber(row.visitors),
      })),
      topPages,
      topCountries,
      topEvents,
      warnings,
    });
  } catch (error) {
    console.error('Error querying Vercel Web Analytics:', error);
    res.status(502).json({
      message: error instanceof Error ? error.message : 'Failed to query Vercel Web Analytics.',
    });
  }
}
