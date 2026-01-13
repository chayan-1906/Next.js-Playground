import Link from 'next/link';
import {FiCamera, FiLayout, FiSettings} from 'react-icons/fi';
import {routes} from '@/lib/routes';

function InterceptingParallelDemo() {
    return (
        <div className={'min-h-screen bg-white dark:bg-gray-950 p-8 transition-colors duration-200'}>
            <div className={'max-w-4xl mx-auto'}>
                <header className={'mb-12 text-center'}>
                    <h1 className={'text-4xl font-extrabold text-gray-900 dark:text-white mb-4'}>
                        Advanced Routing Demos
                    </h1>
                    <p className={'text-lg text-gray-600 dark:text-gray-400'}>
                        Explore Intercepting and Parallel Routes in Next.js.
                    </p>
                </header>

                <div className={'grid grid-cols-1 md:grid-cols-2 gap-8'}>
                    {/* Intercepting Routes Card */}
                    <Link href={routes.interceptingDemo} className={'block'}>
                        <div
                            className={'group relative p-8 bg-gray-50 dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-500'}>
                            <FiCamera className={'text-blue-500 w-12 h-12 mb-4 transition-transform duration-300 group-hover:scale-110'}/>
                            <h2 className={'text-2xl font-bold text-gray-900 dark:text-white mb-2'}>
                                Intercepting Routes
                            </h2>
                            <p className={'text-gray-600 dark:text-gray-400'}>
                                Click a photo to open it in a modal without leaving the page. Refreshing the modal URL loads the dedicated page.
                            </p>
                        </div>
                    </Link>

                    {/* Parallel Routes Card */}
                    <Link href={routes.parallelDemo} className={'block'}>
                        <div
                            className={'group relative p-8 bg-gray-50 dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-800 hover:border-green-500 dark:hover:border-green-500'}>
                            <FiLayout className={'text-green-500 w-12 h-12 mb-4 transition-transform duration-300 group-hover:scale-110'}/>
                            <h2 className={'text-2xl font-bold text-gray-900 dark:text-white mb-2'}>
                                Parallel Routes
                            </h2>
                            <p className={'text-gray-600 dark:text-gray-400'}>
                                Load independent sections of the page in parallel, like a dashboard with separate stats and activity feeds.
                            </p>
                        </div>
                    </Link>

                    {/* Settings Page Card */}
                    <Link href={routes.settingsDemo} className={'block'}>
                        <div
                            className={'group relative p-8 bg-gray-50 dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-800 hover:border-purple-500 dark:hover:border-purple-500'}>
                            <FiSettings className={'text-purple-500 w-12 h-12 mb-4 transition-transform duration-300 group-hover:scale-110'}/>
                            <h2 className={'text-2xl font-bold text-gray-900 dark:text-white mb-2'}>
                                Settings Page
                            </h2>
                            <p className={'text-gray-600 dark:text-gray-400'}>
                                Manage your account, billing, and notification preferences
                            </p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default InterceptingParallelDemo;
