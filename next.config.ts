import createMDX from '@next/mdx'
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
    pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
};

const withMDX = createMDX({
    extension: /\.(md|mdx)$/,
    options: {
        remarkPlugins: ['remark-gfm'],
        rehypePlugins: [],
    },
});

export default withMDX(nextConfig);
