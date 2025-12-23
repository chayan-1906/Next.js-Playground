import {Suspense} from "react";
import {FundaPersonPageProps} from "@/types/funda";
import {PersonDetails} from "@/components/funda/PersonDetails";

async function FundaPerson({params}:FundaPersonPageProps) {
    return (
        <div>
            <h1>Funda Person</h1>
            <Suspense fallback={<p>PersonDetailsSkeleton...</p>}>
                <PersonWrapper params={params}/>
            </Suspense>
        </div>
    );
}

async function PersonWrapper({params}: { params: Promise<{ personId: string }> }) {
    const {personId} = await params;

    return (
        <PersonDetails personId={personId}/>
    );
}

export default FundaPerson;
