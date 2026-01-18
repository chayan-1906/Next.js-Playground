import Link from 'next/link';
import {FiGitMerge, FiLink} from 'react-icons/fi';
import {routes} from "@/lib/routes";

const catchAllLinks = [
    {
        href: routes.catchAllDemo1Segment,
        title: 'One Slug Segment',
        description: 'Navigates to the route with a single parameter: "/firstSegment"',
    },
    {
        href: routes.catchAllDemo2Segments,
        title: 'Two Slug Segments',
        description: 'Navigates to the route with multiple parameters: "/firstSegment/secondSegment"',
    },
];

const optionalCatchAllLinks = [
    {
        href: routes.optionalCatchAllDemo,
        title: 'No Slug',
        description: 'Navigates to the base page for the optional catch-all route',
    },
    {
        href: routes.optionalCatchAllDemo1Segment,
        title: 'One Slug Segment',
        description: 'Navigates to the route with a single parameter: "/firstSegment"',
    },
    {
        href: routes.optionalCatchAllDemo2Segments,
        title: 'Two Slug Segments',
        description: 'Navigates to the route with multiple parameters: "/firstSegment/secondSegment"',
    },
];

function LinkCard({href, title, description}: { href: string, title: string, description: string }) {
    return (
        <Link href={href} className={'block'}>
            <div
                className={'group relative p-6 bg-gray-50 dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-500'}>
                <div className={'flex items-center space-x-4'}>
                    <FiLink className={'text-blue-500 w-8 h-8 transition-transform duration-300 group-hover:scale-110'}/>
                    <div>
                        <h2 className={'text-xl font-bold text-gray-900 dark:text-white mb-1'}>
                            {title}
                        </h2>
                        <p className={'text-gray-600 dark:text-gray-400'}>
                            {description}
                        </p>
                        <p className={'text-sm text-blue-500 font-mono mt-1'}>
                            {href}
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    );
}

function CatchOptionalAllDemo() {
    return (
        <div className={'min-h-screen bg-white dark:bg-gray-950 p-8 transition-colors duration-200'}>
            <div className={'max-w-4xl mx-auto'}>
                <header className={'mb-12 text-center'}>
                    <h1 className={'text-4xl font-extrabold text-gray-900 dark:text-white mb-4'}>
                        Catch-all vs Optional Catch-all Routes
                    </h1>
                    <p className={'text-lg text-gray-600 dark:text-gray-400'}>
                        Explore the differences between <code>[...slug]</code> and <code>[[...slug]]</code> routing in Next.js
                    </p>
                </header>

                <div className={'space-y-12'}>
                    {/* Catch-all Section */}
                    <section>
                        <div className={'flex items-center mb-4'}>
                            <FiGitMerge className={'size-8 text-green-500 mr-3'}/>
                            <div>
                                <h2 className={'text-2xl font-bold text-gray-900 dark:text-white'}>
                                    Catch-all Routes:
                                    <code>[...slug]</code>
                                </h2>
                                <p className={'text-gray-600 dark:text-gray-400'}>Matches one or more route segments. Will 404 on zero segments</p>
                            </div>
                        </div>
                        <div className={'flex flex-col space-y-6'}>
                            {catchAllLinks.map((link) => (
                                <LinkCard key={link.href} {...link}/>
                            ))}
                        </div>
                    </section>

                    {/* Optional Catch-all Section */}
                    <section>
                        <div className={'flex items-center mb-4'}>
                            <FiGitMerge className={'size-8 text-purple-500 mr-3'}/>
                            <div>
                                <h2 className={'text-2xl font-bold text-gray-900 dark:text-white'}>
                                    Optional Catch-all Routes:
                                    <code>[[...slug]]</code>
                                </h2>
                                <p className={'text-gray-600 dark:text-gray-400'}>Matches zero or more route segments</p>
                            </div>
                        </div>
                        <div className={'flex flex-col space-y-6'}>
                            {optionalCatchAllLinks.map((link) => (
                                <LinkCard key={link.href} {...link}/>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default CatchOptionalAllDemo;
