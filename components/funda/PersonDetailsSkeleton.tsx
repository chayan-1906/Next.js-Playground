function PersonDetailsSkeleton() {
    return (
        <div className={'flex flex-col max-w-5xl mx-auto p-6 gap-6 animate-pulse'}>
            {/* Back button skeleton */}
            <div className={'h-5 w-32 bg-gray-200 dark:bg-gray-700 rounded'}/>

            {/* Cache info skeleton */}
            <div className={'h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded'}/>

            {/* Person header card skeleton */}
            <div className={'rounded-2xl bg-white dark:bg-gray-800 shadow-md dark:shadow-gray-900/50 p-8'}>
                <div className={'flex items-start gap-6 mb-6'}>
                    {/* Profile picture skeleton */}
                    <div className={'size-30 rounded-full bg-gray-200 dark:bg-gray-700 shrink-0'}/>

                    <div className={'flex-1 space-y-3'}>
                        <div className={'h-8 w-64 bg-gray-200 dark:bg-gray-700 rounded'}/>
                        <div className={'h-6 w-80 bg-gray-200 dark:bg-gray-700 rounded'}/>
                        <div className={'h-5 w-48 bg-gray-200 dark:bg-gray-700 rounded'}/>
                        <div className={'h-4 w-56 bg-gray-200 dark:bg-gray-700 rounded'}/>
                    </div>
                </div>

                {/* About section skeleton */}
                <div className={'mb-6'}>
                    <div className={'h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded mb-3'}/>
                    <div className={'space-y-2'}>
                        <div className={'h-4 w-full bg-gray-200 dark:bg-gray-700 rounded'}/>
                        <div className={'h-4 w-5/6 bg-gray-200 dark:bg-gray-700 rounded'}/>
                    </div>
                </div>

                {/* Skills section skeleton */}
                <div className={'mb-6'}>
                    <div className={'h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded mb-3'}/>
                    <div className={'flex flex-wrap gap-2'}>
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className={'h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded-full'}/>
                        ))}
                    </div>
                </div>
            </div>

            {/* Work history skeleton */}
            <div className={'rounded-2xl bg-white dark:bg-gray-800 shadow-md dark:shadow-gray-900/50 p-8'}>
                <div className={'h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-6'}/>
                <div className={'space-y-6'}>
                    {[1, 2, 3].map((i) => (
                        <div key={i} className={'flex items-start gap-4'}>
                            <div className={'size-14 rounded-lg bg-gray-200 dark:bg-gray-700 shrink-0'}/>
                            <div className={'flex-1 space-y-2'}>
                                <div className={'h-5 w-48 bg-gray-200 dark:bg-gray-700 rounded'}/>
                                <div className={'h-4 w-64 bg-gray-200 dark:bg-gray-700 rounded'}/>
                                <div className={'h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded'}/>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export {PersonDetailsSkeleton};
