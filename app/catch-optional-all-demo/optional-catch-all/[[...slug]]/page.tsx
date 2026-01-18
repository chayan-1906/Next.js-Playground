import Link from "next/link";
import {Suspense} from "react";
import {FiChevronsLeft, FiHash} from "react-icons/fi";
import {routes} from "@/lib/routes";

async function OptionalCatchAllPage({params}: { params: { slug?: string[] }; }) {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <OptionalCatchAllWrapper params={params}/>
        </Suspense>
    );
}

async function OptionalCatchAllWrapper({params}: { params: { slug?: string[] }; }) {
    const {slug} = await params;
    console.log('[[...slug]]:', slug);

    return (
        <div className={'min-h-screen bg-white dark:bg-gray-950 p-8 transition-colors duration-200'}>
            <div className={'max-w-2xl mx-auto'}>
                <header className={'mb-8'}>
                    <Link href={routes.catchOptionalAllDemo} className={'inline-flex items-center text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 transition-colors'}>
                        <FiChevronsLeft className={'mr-2'}/>
                        Back to Demo Hub
                    </Link>
                </header>

                <div className={'bg-gray-50 dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800'}>
                    <div className={'p-6 border-b border-gray-200 dark:border-gray-800'}>
                        <h1 className={'text-2xl font-bold text-gray-900 dark:text-white'}>
                            Optional Catch-all Route
                            (<code>[[...slug]]</code>)
                        </h1>
                        <p className={'text-gray-600 dark:text-gray-400 mt-1'}>The following route segments were captured:</p>
                    </div>
                    <div className={'p-6'}>
                        {slug ? (
                            <ul className={'space-y-3'}>
                                {slug.map((segment: string, index: number) => (
                                    <li key={index}
                                        className={'flex items-center text-gray-800 dark:text-gray-300'}>
                                        <FiHash className={'size-4 mr-3 text-gray-400 dark:text-gray-500'}/>
                                        <span className={'font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md text-sm'}>
                                            {segment}
                                        </span>
                                        <span className={'ml-auto text-xs text-gray-500 dark:text-gray-400'}>
                                            (segment {index + 1})
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className={'text-gray-500 dark:text-gray-400'}>No slug segments were provided (the route is optional)</p>
                        )}
                    </div>
                    <div className={'p-4 bg-gray-100 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-800 rounded-b-xl'}>
                        <p className={'text-sm text-gray-600 dark:text-gray-400 font-mono text-center'}>
                            Route: <code>{routes.optionalCatchAllDemo}/{slug ? slug.join('/') : ''}</code>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OptionalCatchAllPage;
