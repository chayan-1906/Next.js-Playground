function Loading() {
    return (
        <div className={'p-8 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-lg mt-8 animate-pulse'}>
            <h2 className={'text-xl font-bold text-gray-900 dark:text-white mb-6'}>
                Recent Activity
            </h2>
            <ul className={'space-y-4'}>
                {[...Array(4)].map((_, i) => (
                    <li key={i} className={'flex items-center'}>
                        <div className={'size-10 rounded-full bg-gray-200 dark:bg-gray-700 mr-4'}/>
                        <div className={'grow h-6 bg-gray-200 dark:bg-gray-700 rounded'}/>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Loading;

