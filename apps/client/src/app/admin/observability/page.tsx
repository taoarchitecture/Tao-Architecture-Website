'use client';

import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';

interface ObservabilityStatusResponse {
  project: {
    vercelTokenConfigured: boolean;
    vercelProjectIdConfigured: boolean;
    vercelTeamIdConfigured: boolean;
    vercelTeamSlugConfigured: boolean;
  };
  features: {
    webAnalytics: {
      clientInstrumentationInstalled: boolean;
      serverQueryReady: boolean;
      manualDashboardEnablementRequired: boolean;
    };
    speedInsights: {
      clientInstrumentationInstalled: boolean;
      manualDashboardEnablementRequired: boolean;
      customAdminParity: 'partial';
      drainsRecommended: boolean;
    };
    drains: {
      supportedPlanRequired: string;
      manualVercelSetupRequired: boolean;
    };
  };
  blockedItems: string[];
  nextSteps: string[];
  implementedAt: string;
}

interface MetricPoint {
  timestamp?: string;
  label?: string;
  pageviews?: number;
  visitors?: number;
  count?: number;
}

interface WebAnalyticsOverviewResponse {
  range: {
    since: string;
    until: string;
  };
  summary: {
    pageviews: number;
    visitors: number;
    customEventCount: number;
  };
  trafficTrend: MetricPoint[];
  topPages: MetricPoint[];
  topCountries: MetricPoint[];
  topEvents: MetricPoint[];
  warnings?: string[];
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_BASE || 'http://127.0.0.1:5000/api';

export default function AdminObservabilityPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<ObservabilityStatusResponse | null>(null);
  const [overview, setOverview] = useState<WebAnalyticsOverviewResponse | null>(null);
  const [overviewError, setOverviewError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      setLoading(false);
      router.replace('/admin/login');
      return;
    }

    const headers = { Authorization: `Bearer ${token}` };

    const load = async () => {
      try {
        const statusResponse = await axios.get<ObservabilityStatusResponse>(
          `${API_URL}/observability/status`,
          { headers }
        );

        setStatus(statusResponse.data);

        if (statusResponse.data.features.webAnalytics.serverQueryReady) {
          try {
            const overviewResponse = await axios.get<WebAnalyticsOverviewResponse>(
              `${API_URL}/observability/web-analytics/overview`,
              { headers }
            );
            setOverview(overviewResponse.data);
          } catch (error) {
            const message = axios.isAxiosError(error)
              ? error.response?.data?.message || error.message
              : 'Unable to load live Vercel Web Analytics data.';
            setOverviewError(message);
          }
        }
      } catch (error) {
        console.error(error);
        router.replace('/admin/login');
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, [router]);

  const statusCards = useMemo(() => {
    if (!status) {
      return [];
    }

    return [
      {
        label: 'Access Token',
        value: status.project.vercelTokenConfigured ? 'Configured' : 'Missing',
      },
      {
        label: 'Project ID',
        value: status.project.vercelProjectIdConfigured ? 'Configured' : 'Missing',
      },
      {
        label: 'Team Scope',
        value:
          status.project.vercelTeamIdConfigured || status.project.vercelTeamSlugConfigured
            ? 'Configured'
            : 'Optional',
      },
      {
        label: 'Live Query Status',
        value: status.features.webAnalytics.serverQueryReady ? 'Ready' : 'Blocked',
      },
    ];
  }, [status]);

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex h-64 items-center justify-center">
          <div className="text-xs uppercase tracking-widest text-neutral-medium-grey">
            Loading observability workspace...
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="mb-10">
        <h1 className="font-agenda text-3xl font-bold uppercase tracking-[0.14em] text-neutral-dark-grey">
          Observability
        </h1>
        <p className="mt-2 text-sm uppercase tracking-wide text-neutral-medium-grey">
          Vercel analytics readiness, live traffic visibility, and setup blockers
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {statusCards.map((card) => (
          <div key={card.label} className="border-l-2 border-primary-red bg-white p-6 shadow-sm">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-medium-grey">
              {card.label}
            </p>
            <p className="font-agenda text-2xl font-bold uppercase tracking-[0.08em] text-neutral-black">
              {card.value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 xl:grid-cols-[1.4fr_1fr]">
        <section className="border border-neutral-border bg-white p-8 shadow-sm">
          <h2 className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-neutral-dark-grey">
            Implemented Now
          </h2>
          <p className="mb-6 text-sm leading-relaxed text-neutral-medium-grey">
            The codebase is now prepared for native Vercel collection and authenticated admin-side
            reporting. External Vercel credentials are still required before live project data can
            fully populate this workspace.
          </p>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {[
              'Mounted native Vercel Analytics and Speed Insights in the Next.js root layout.',
              'Added a dedicated admin Observability workspace to track readiness and live metrics.',
              'Added server-side Web Analytics proxy endpoints secured behind admin auth.',
              'Logged implementation decisions, blockers, resources, and delivery timeline for follow-up execution.',
            ].map((item) => (
              <div key={item} className="border border-neutral-border bg-neutral-bg p-4 text-sm text-neutral-dark-grey">
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="border border-neutral-border bg-white p-8 shadow-sm">
          <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-neutral-dark-grey">
            Pending External Actions
          </h2>

          <div className="space-y-4">
            {(status?.blockedItems || []).map((item) => (
              <div key={item} className="border-l-2 border-primary-red bg-neutral-bg px-4 py-3 text-sm text-neutral-dark-grey">
                {item}
              </div>
            ))}
          </div>

          <div className="mt-6 border-t border-neutral-border pt-6">
            <h3 className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-medium-grey">
              Next Manual Steps
            </h3>
            <div className="space-y-3">
              {(status?.nextSteps || []).map((step) => (
                <p key={step} className="text-sm leading-relaxed text-neutral-medium-grey">
                  {step}
                </p>
              ))}
            </div>
          </div>
        </section>
      </div>

      <section className="mt-10 border border-neutral-border bg-white p-8 shadow-sm">
        <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-dark-grey">
              Live Web Analytics
            </h2>
            <p className="mt-2 text-sm text-neutral-medium-grey">
              Server-side reporting uses the official Vercel Web Analytics API when credentials are
              configured.
            </p>
          </div>
          {overview?.range ? (
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-medium-grey">
              {overview.range.since} to {overview.range.until}
            </p>
          ) : null}
        </div>

        {overview ? (
          <>
            {overview.warnings && overview.warnings.length > 0 ? (
              <div className="mb-6 border-l-2 border-primary-red bg-neutral-bg px-4 py-3 text-sm text-neutral-dark-grey">
                {overview.warnings.join(' ')}
              </div>
            ) : null}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="border border-neutral-border bg-neutral-bg p-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-medium-grey">
                  Pageviews
                </p>
                <p className="mt-3 font-agenda text-3xl font-bold text-neutral-black">
                  {overview.summary.pageviews}
                </p>
              </div>
              <div className="border border-neutral-border bg-neutral-bg p-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-medium-grey">
                  Visitors
                </p>
                <p className="mt-3 font-agenda text-3xl font-bold text-neutral-black">
                  {overview.summary.visitors}
                </p>
              </div>
              <div className="border border-neutral-border bg-neutral-bg p-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-medium-grey">
                  Custom Events
                </p>
                <p className="mt-3 font-agenda text-3xl font-bold text-neutral-black">
                  {overview.summary.customEventCount}
                </p>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
              <MetricList
                title="Traffic Trend"
                emptyText="No trend data returned yet."
                rows={overview.trafficTrend.map((row) => ({
                  label: row.timestamp ? new Date(row.timestamp).toLocaleDateString('en-IN') : 'Unknown',
                  value: `${row.pageviews ?? 0} pageviews / ${row.visitors ?? 0} visitors`,
                }))}
              />
              <MetricList
                title="Top Pages"
                emptyText="No page data returned yet."
                rows={overview.topPages.map((row) => ({
                  label: row.label || 'Unknown route',
                  value: `${row.pageviews ?? 0} pageviews / ${row.visitors ?? 0} visitors`,
                }))}
              />
              <MetricList
                title="Top Countries"
                emptyText="No country data returned yet."
                rows={overview.topCountries.map((row) => ({
                  label: row.label || 'Unknown country',
                  value: `${row.pageviews ?? 0} pageviews / ${row.visitors ?? 0} visitors`,
                }))}
              />
            </div>

            <div className="mt-6">
              <MetricList
                title="Top Custom Events"
                emptyText="No custom events have been tracked yet."
                rows={overview.topEvents.map((row) => ({
                  label: row.label || 'Unnamed event',
                  value: `${row.count ?? 0} total events / ${row.visitors ?? 0} visitors`,
                }))}
              />
            </div>
          </>
        ) : (
          <div className="border border-dashed border-neutral-border p-6 text-sm leading-relaxed text-neutral-medium-grey">
            {overviewError ||
              'Live Web Analytics data will appear here after Vercel credentials are configured and Web Analytics is enabled in the Vercel dashboard.'}
          </div>
        )}
      </section>
    </AdminLayout>
  );
}

function MetricList({
  title,
  rows,
  emptyText,
}: {
  title: string;
  rows: Array<{ label: string; value: string }>;
  emptyText: string;
}) {
  return (
    <div className="border border-neutral-border bg-neutral-bg p-5">
      <h3 className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-medium-grey">
        {title}
      </h3>

      {rows.length === 0 ? (
        <p className="text-sm text-neutral-medium-grey">{emptyText}</p>
      ) : (
        <div className="space-y-3">
          {rows.map((row) => (
            <div key={`${title}-${row.label}`} className="border-b border-neutral-border pb-3 last:border-b-0 last:pb-0">
              <p className="text-sm font-bold text-neutral-dark-grey">{row.label}</p>
              <p className="mt-1 text-xs uppercase tracking-wide text-neutral-medium-grey">{row.value}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
