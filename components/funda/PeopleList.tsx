import {PersonCard} from "./PersonCard";
import {FundaPerson, PeopleListProps} from "@/types/funda";
import {getFundaPeople} from "@/lib/queries/funda.queries";

async function PeopleList({searchTerm = ''}: PeopleListProps) {
    const {people, cachedAt} = await getFundaPeople(searchTerm);

    return (
        <div>
            <p className={'text-xs text-gray-400 dark:text-gray-500 mb-4'}>
                Cached at: {cachedAt}
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
