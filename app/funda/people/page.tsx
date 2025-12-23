import {Suspense} from "react";
import {PeopleList} from "@/components/funda/PeopleList";
import {PeopleListSkeleton} from "@/components/funda/PeopleListSkeleton";

async function FundaPeoplePage() {
    return (
        <div className={'flex flex-col max-w-7xl mx-auto p-6 gap-6'}>
            <div className={'flex justify-between items-center'}>
                <div>
                    <h1 className={'text-3xl font-bold text-gray-900'}>
                        People
                    </h1>
                    <p className={'mt-1 text-gray-500'}>
                        Linked profile data
                    </p>
                </div>
            </div>

            <Suspense fallback={<PeopleListSkeleton/>}>
                <PeopleList/>
            </Suspense>
        </div>
    );
}

export default FundaPeoplePage;
