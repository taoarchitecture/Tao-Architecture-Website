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
                hostname: 'localhost',
            }
        ],
        formats: ['image/avif', 'image/webp'],
        qualities: [75, 80],
    },
}

module.exports = nextConfig
