/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
            },
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
            }
        ],
        formats: ['image/avif', 'image/webp'],
        minimumCacheTTL: 60,
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        // Explicit allow-list for the quality values actually requested across
        // the codebase (Image components use 75 or 85). Without this, Next
        // silently clamps any unlisted quality down to whatever it defaults
        // to, degrading every image that asks for 85.
        qualities: [75, 85],
    },
    compiler: {
        removeConsole: process.env.NODE_ENV === 'production',
    },
    poweredByHeader: false,
    // Introduced in Next 16.3; don't auto-generate AGENTS.md/CLAUDE.md on every dev run.
    agentRules: false,
    // Prevent HTML pages from being cached as immutable so Vercel can patch
    // preview-comment injection after the build completes (required by Vercel
    // infra when using immutable static file uploads with next@>=16.3.0-canary.32).
    async headers() {
        return [
            {
                // Only apply to HTML pages — JS/CSS/images stay immutable.
                source: '/:path*',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=0, must-revalidate',
                    },
                ],
            },
        ];
    },
}

module.exports = nextConfig
