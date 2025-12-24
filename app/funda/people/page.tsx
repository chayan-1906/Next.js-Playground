import {Suspense} from "react";
import {PeopleListWrapper} from "@/components/funda/PeopleListWrapper";
import {FundaPeoplePageSearchParams} from "@/types/funda";
import {SearchInput} from "@/components/funda/SearchInput";
import {PeopleListSkeleton} from "@/components/funda/PeopleListSkeleton";

function FundaPeoplePage({searchParams}: FundaPeoplePageSearchParams) {
    return (
        <div className={'flex flex-col max-w-7xl mx-auto p-6 gap-6'}>
            <div className={'flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'}>
                <div>
                    <h1 className={'text-3xl font-bold text-gray-900 dark:text-white'}>
                        People
                    </h1>
                    <p className={'mt-1 text-gray-500 dark:text-gray-400'}>
                        Linked profile data
                    </p>
                </div>
                <div className={'w-full sm:w-72'}>
                    <Suspense fallback={<div className={'h-10 bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse'}/>}>
                        <SearchInput placeholder={'Search people...'}/>
                    </Suspense>
                </div>
            </div>

            <Suspense fallback={<PeopleListSkeleton/>}>
                <PeopleListWrapper searchParams={searchParams}/>
            </Suspense>
        </div>
    );
}

export default FundaPeoplePage;
