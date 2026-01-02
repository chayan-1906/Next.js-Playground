import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    /* config options here */
    cacheComponents: true,
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
        ],
    },
};

export default nextConfig;
