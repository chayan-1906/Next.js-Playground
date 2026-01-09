function ProxyDemo() {
    return (
        <div className={'min-h-screen bg-white dark:bg-gray-950 text-gray-600 dark:text-gray-100 p-8 font-sans transition-colors duration-200'}>
            <div className={'max-w-2xl mx-auto'}>
                <h1 className={'text-3xl font-bold mb-4 text-gray-600 dark:text-gray-400'}>Next.js Proxy/Middleware Demo</h1>
                <p className={'text-gray-700 dark:text-gray-300 mb-6 text-lg'}>
                    This page is used to demonstrate how <code className={'bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-gray-600 dark:text-gray-300 font-mono text-sm'}>nextUrl</code> works within <code className={'bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-blue-600 dark:text-blue-300 font-mono text-sm'}>proxy.ts</code>.
                    Check your server console to see the logged URL information.
                </p>
                <div className={'bg-gray-50 dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-lg dark:shadow-2xl'}>
                    <h2 className={'text-xl font-semibold mb-4 text-gray-900 dark:text-white'}>Try these URLs:</h2>
                    <ul className={'space-y-3'}>
                        <li>
                            <a href={'/proxy-demo?name=Gemini&mode=teacher'} className={'block p-3 rounded-lg bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-blue-600 dark:text-blue-300 hover:text-blue-700 dark:hover:text-blue-200 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-gray-600'}>
                                <span className={'font-mono text-sm'}>/proxy-demo?name=Gemini&mode=teacher</span>
                            </a>
                        </li>
                        <li>
                            <a href={'/proxy-demo/test-sub-path'} className={'block p-3 rounded-lg bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-blue-600 dark:text-blue-300 hover:text-blue-700 dark:hover:text-blue-200 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-gray-600'}>
                                <span className={'font-mono text-sm'}>/proxy-demo/test-sub-path</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default ProxyDemo;
