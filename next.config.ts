import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    /* config options here */
    cacheComponents: true,
    experimental: {
        hideLogsAfterAbort: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'agt.files.remix.app',
            },
            {
                protocol: 'https',
                hostname: 'media.licdn.com',
            },
            {
                protocol: 'https',
                hostname: 'picsum.photos',
            },
            {
                protocol: 'https',
                hostname: 'm.media-amazon.com',
            },
        ],
    },
    async redirects() {
        return [
            {
                source: '/old-page',
                destination: '/funda',
                permanent: true,
            },
            {
                source: '/temp-page',
                destination: '/funda',
                permanent: false,
            },
            {
                source: '/about-us',
                destination: '/about',
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
