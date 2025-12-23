function CompaniesListSkeleton() {
    return (
        <div className={'grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'}>
            {Array.from({length: 32}).map((_, index: number) => (
                <div key={index} className={'rounded-2xl bg-white shadow-md p-5 animate-pulse'}>
                    <div className={'flex items-center gap-4'}>
                        <div className={'size-14 rounded-lg bg-gray-200'}/>
                        <div className={'flex-1 space-y-2'}>
                            <div className={'h-5 w-3/4 bg-gray-200 rounded'}/>
                            <div className={'h-4 w-1/2 bg-gray-200 rounded'}/>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export {CompaniesListSkeleton};
