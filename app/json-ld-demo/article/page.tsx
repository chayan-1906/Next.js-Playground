import Image from "next/image";

const article = {
    author: 'Hashbyt | AI-First Frontend & UI/UX SaaS Partner',
    image: 'https://miro.medium.com/v2/resize:fit:4800/format:webp/0*yAzMDtbjlBmRGK1h.jpg',
    url: 'https://medium.com/@hashbyt/nextjs-advanced-techniques-2026-93e09f1c728d',
    headline: 'How to Master Next.js in 2026: 15+ Advanced Techniques Senior Devs Can’t Ignore',
    description: 'Unlock cutting-edge patterns, performance tricks, and SEO-smart rendering strategies every pro must know before your rivals do',
    datePublished: '2025-12-30T08:00:00+00:00',
};

const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    author: {
        '@type': 'Person',
        name: article.author,
    },
    image: article.image,
    headline: article.headline,
    description: article.description,
    datePublished: article.datePublished,
};

const breadcrumbList = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'http://localhost:3000',
        },
        {
            '@type': 'ListItem',
            position: 2,
            name: 'JSON-LD Demo',
            item: 'http://localhost:3000/json-ld-demo',
        },
        {
            '@type': 'ListItem',
            position: 3,
            name: 'Article',
            item: 'http://localhost:3000/json-ld-demo/article',
        },
    ],
};

function formatDate(isoString: string): string {
    return new Date(isoString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

function JSONLdArticlePage() {
    return (
        <article>
            <script
                type={'application/ld+json'}
                dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd).replace(/</g, '\\u003c')}}
            />
            <script
                type={'application/ld+json'}
                dangerouslySetInnerHTML={{__html: JSON.stringify(breadcrumbList).replace(/</g, '\\u003c')}}
            />

            {/* Breadcrumb */}
            <nav className={'flex items-center gap-2 text-sm text-slate-400 mb-6'}>
                <a href={'/'} className={'hover:text-white transition-colors'}>{'Home'}</a>
                <span>{'/'}</span>
                <a href={'/json-ld-demo'} className={'hover:text-white transition-colors'}>{'JSON-LD Demo'}</a>
                <span>{'/'}</span>
                <span className={'text-slate-200'}>{'Article'}</span>
            </nav>

            {/* Hero Image */}
            <div className={'relative aspect-video rounded-xl overflow-hidden mb-8'}>
                <Image src={article.image} alt={article.headline} fill className={'object-cover'}/>
                <div className={'absolute inset-0 bg-linear-to-t from-slate-900/80 to-transparent'}/>
            </div>

            {/* Article Content */}
            <div className={'space-y-6'}>
                <div>
                    <span className={'inline-block px-3 py-1 bg-orange-500/20 text-orange-400 text-xs font-medium rounded-full mb-4'}>
                        {'Article Schema'}
                    </span>
                    <h1 className={'text-3xl sm:text-4xl font-bold text-white leading-tight mb-4'}>
                        {article.headline}
                    </h1>
                    <p className={'text-lg text-slate-300 leading-relaxed'}>
                        {article.description}
                    </p>
                </div>

                {/* Meta Info */}
                <div className={'flex flex-wrap items-center gap-4 pt-4 border-t border-slate-700'}>
                    <div className={'flex items-center gap-2'}>
                        <div className={'w-8 h-8 bg-linear-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center'}>
                            <span className={'text-white text-xs font-bold'}>{'H'}</span>
                        </div>
                        <span className={'text-slate-300 text-sm'}>{article.author}</span>
                    </div>
                    <span className={'text-slate-600'}>{'•'}</span>
                    <span className={'text-slate-400 text-sm'}>{formatDate(article.datePublished)}</span>
                </div>

                {/* CTA */}
                <a href={article.url} target={'_blank'} rel={'noopener noreferrer'}
                   className={'inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-orange-500 to-red-500 text-white font-medium rounded-lg hover:from-orange-600 hover:to-red-600 transition-all'}>
                    {'Read Full Article'}
                    <span>{'→'}</span>
                </a>
            </div>
        </article>
    );
}

export default JSONLdArticlePage;
