import Link from "next/link";
import {routes} from "@/lib/routes";

function JSONLdPage() {
    return (
        <div>
            <div className={'mb-8'}>
                <h1 className={'text-3xl font-bold text-white mb-2'}>{'JSON-LD Structured Data'}</h1>
                <p className={'text-slate-400'}>{'Explore different schema.org types for SEO-rich structured data'}</p>
            </div>

            <div className={'grid gap-4 sm:grid-cols-2'}>
                <Link href={routes.jsonLdArticleDemo} className={'group block p-6 bg-slate-800/50 border border-slate-700 rounded-xl hover:border-blue-500/50 hover:bg-slate-800 transition-all'}>
                    <div className={'flex items-center gap-3 mb-3'}>
                        <div className={'w-10 h-10 bg-linear-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center'}>
                            <span className={'text-white text-lg'}>{'📄'}</span>
                        </div>
                        <h2 className={'text-xl font-semibold text-white group-hover:text-blue-400 transition-colors'}>{'Article'}</h2>
                    </div>
                    <p className={'text-slate-400 text-sm'}>{'Article + BreadcrumbList schemas for blog posts and news'}</p>
                </Link>

                <Link href={routes.jsonLdProductDemo} className={'group block p-6 bg-slate-800/50 border border-slate-700 rounded-xl hover:border-green-500/50 hover:bg-slate-800 transition-all'}>
                    <div className={'flex items-center gap-3 mb-3'}>
                        <div className={'w-10 h-10 bg-linear-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center'}>
                            <span className={'text-white text-lg'}>{'🛒'}</span>
                        </div>
                        <h2 className={'text-xl font-semibold text-white group-hover:text-green-400 transition-colors'}>{'Product'}</h2>
                    </div>
                    <p className={'text-slate-400 text-sm'}>{'Product schema with Offer pricing for e-commerce'}</p>
                </Link>
            </div>

            <div className={'mt-8 p-4 bg-slate-800/30 border border-slate-700/50 rounded-lg'}>
                <p className={'text-slate-500 text-sm'}>
                    {'💡 Tip: View page source to see the '}
                    <code className={'text-cyan-400 bg-slate-800 px-1.5 py-0.5 rounded'}>{'<script type="application/ld+json">'}</code>
                    {' tags. Validate at '}
                    <a href={'https://search.google.com/test/rich-results'} target={'_blank'} rel={'noopener noreferrer'} className={'text-blue-400 hover:underline'}>
                        {'Google Rich Results Test'}
                    </a>
                </p>
            </div>
        </div>
    );
}

export default JSONLdPage;
