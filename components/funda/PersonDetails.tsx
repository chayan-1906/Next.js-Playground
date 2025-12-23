import {PersonDetailsProps} from "@/types/funda";
import {getFundaRelationships} from "@/lib/queries/funda.queries";

async function PersonDetails({personId}: PersonDetailsProps) {
    const {relationships, cachedAt} = await getFundaRelationships({personId});

    return (
        <div>
            <p className={'text-xs text-gray-400 mb-4'}>
                Cached at: ${cachedAt}
            </p>
            <p>{personId}</p>
            <p>{JSON.stringify(relationships)}</p>
        </div>
    );
}

export {PersonDetails}
