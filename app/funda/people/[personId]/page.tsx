import {Suspense} from "react";
import {FundaPersonPageProps} from "@/types/funda";
import {PersonDetails} from "@/components/funda/PersonDetails";
import {PersonDetailsSkeleton} from "@/components/funda/PersonDetailsSkeleton";

async function FundaPerson({params}: FundaPersonPageProps) {
    return (
        <Suspense fallback={<PersonDetailsSkeleton/>}>
            <PersonWrapper params={params}/>
        </Suspense>
    );
}

async function PersonWrapper({params}: { params: Promise<{ personId: string }> }) {
    const {personId} = await params;

    return (
        <PersonDetails personId={personId}/>
    );
}

export default FundaPerson;
