import {PersonCard} from "./PersonCard";
import {getFundaPeople} from "@/lib/queries/funda.queries";
import {FundaPerson} from "@/types/funda";

async function PeopleList() {
    const {people, cachedAt} = await getFundaPeople();

    return (
        <div>
            <p className={'text-xs text-gray-400 mb-4'}>
                Cached at: ${cachedAt}
            </p>
            <div className={'grid gap-4 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3'}>
                {people.map((person: FundaPerson) => (
                    <PersonCard key={person.person_identifier} person={person}/>
                ))}
            </div>
        </div>
    );
}

export {PeopleList};
