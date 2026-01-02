import {Suspense} from "react";
import {SearchInput} from "@/components/funda/SearchInput";
import {FundaCompaniesPageSearchParams} from "@/types/funda";
import {CompaniesListWrapper} from "@/components/funda/CompaniesListWrapper";
import {CompaniesListSkeleton} from "@/components/funda/CompaniesListSkeleton";

function FundaCompaniesPage({searchParams}: FundaCompaniesPageSearchParams) {
    return (
        <div className={'max-w-7xl mx-auto flex flex-col p-6 gap-6'}>
            <div className={'flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'}>
                <div>
                    <h1 className={'text-3xl font-bold text-gray-900 dark:text-white'}>
                        {'Companies'}
                    </h1>
                    <p className={'mt-1 text-gray-500 dark:text-gray-400'}>
                        {'Linked company data'}
                    </p>
                </div>
                <div className={'w-full sm:w-72'}>
                    <Suspense fallback={<div className={'h-10 bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse'}/>}>
                        <SearchInput placeholder={'Search companies...'}/>
                    </Suspense>
                </div>
            </div>

            <Suspense fallback={<CompaniesListSkeleton/>}>
                <CompaniesListWrapper searchParams={searchParams}/>
            </Suspense>
        </div>
    );
}

export default FundaCompaniesPage;
