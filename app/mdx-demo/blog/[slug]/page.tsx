import {Suspense} from "react";

export function generateStaticParams() {
    return [
        {slug: 'welcome'},
        {slug: 'about'},
        {slug: 'features'},
    ];
}

async function BlogSlugPage({params}: { params: Promise<{ slug: string }>; }) {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <BlogSlugWrapper params={params}/>
        </Suspense>
    );
}

async function BlogSlugWrapper({params}: { params: Promise<{ slug: string }> }) {
    const {slug} = await params;
    const {default: Slug} = await import(`@/content/${slug}.mdx`);

    return (
        <div>
            <Slug/>
        </div>
    );
}

export default BlogSlugPage;
