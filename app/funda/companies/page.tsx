import {Suspense} from "react";
import {CompaniesList} from "@/components/funda/CompaniesList";
import {CompaniesListSkeleton} from "@/components/funda/CompaniesListSkeleton";

async function FundaCompaniesPage() {
    return (
        <div className={'max-w-7xl mx-auto flex flex-col p-6 gap-6'}>
            <div className={'flex justify-between items-center'}>
                <div>
                    <h1 className={'text-3xl font-bold text-gray-900 dark:text-white'}>
                        {'Companies'}
                    </h1>
                    <p className={'mt-1 text-gray-500 dark:text-gray-400'}>
                        {'Linked company data'}
                    </p>
                </div>
            </div>

            <Suspense fallback={<CompaniesListSkeleton/>}>
                <CompaniesList/>
            </Suspense>
        </div>
    );
}

export default FundaCompaniesPage;
