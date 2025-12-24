import {PeopleList} from "./PeopleList";
import {FundaPeoplePageSearchParams} from "@/types/funda";

async function PeopleListWrapper({searchParams}: FundaPeoplePageSearchParams) {
    const {q: searchTerm = ''} = await searchParams;

    return (
        <PeopleList searchTerm={searchTerm}/>
    );
}

export {PeopleListWrapper};
