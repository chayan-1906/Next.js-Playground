function Loading() {
    return (
        <div className={'p-8 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-lg'}>
            <h2 className={'text-xl font-bold text-gray-900 dark:text-white mb-4'}>
                Key Metrics
            </h2>
            <div className={'grid grid-cols-1 sm:grid-cols-2 gap-6 animate-pulse'}>
                {/* Active Users Skeleton */}
                <div className={'flex items-center p-4 bg-white dark:bg-gray-800 rounded-xl'}>
                    <div className={'size-8 rounded-full bg-gray-200 dark:bg-gray-700 mr-4'}/>
                    <div className={'grow'}>
                        <div className={'h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2'}/>
                        <div className={'h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/2'}/>
                    </div>
                </div>

                {/* Sales Skeleton */}
                <div className={'flex items-center p-4 bg-white dark:bg-gray-800 rounded-xl'}>
                    <div className={'w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 mr-4'}/>
                    <div className={'grow'}>
                        <div className={'h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2'}/>
                        <div className={'h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/2'}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Loading;

