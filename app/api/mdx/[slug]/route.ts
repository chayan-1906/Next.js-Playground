import {NextRequest, NextResponse} from "next/server"

type RouteParams = {
    params: Promise<{ slug: string }>;
};

const mdxContent: Record<string, string> = {
    welcome: `
# Welcome

Welcome to the **Remote MDX** demo!

This content is fetched from an API endpoint.

## How it works

1. Client requests MDX from \`/api/mdx/[slug]\`
2. Server returns raw MDX string
3. Client renders using \`next-mdx-remote-client\`

> Remote MDX is great for CMS-driven content!
`,
    about: `
# About

This is the **about** page loaded remotely.

## Benefits of Remote MDX

- Content stored in database or CMS
- Dynamic content updates without rebuild
- Flexible content management

Visit our [docs](https://nextjs.org) for more info.
`,
    features: `
# Features

Explore what remote MDX can do.

## Syntax Support

- **Bold** and *italic* text
- Lists and blockquotes
- Code blocks with \`inline code\`

## Dynamic Loading

Content is fetched at runtime, enabling:

- A/B testing
- Personalized content
- Real-time updates
`,
};

async function GET(request: NextRequest, {params}: RouteParams): Promise<NextResponse> {
    const {slug} = await params

    const content: string | undefined = mdxContent[slug]

    if (!content) {
        return NextResponse.json(
            {error: 'Content not found'},
            {status: 404}
        );
    }

    return new NextResponse(content.trim(), {
        headers: {
            'Content-Type': 'text/plain',
        },
    });
}

export {GET};
