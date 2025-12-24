import {CompaniesList} from "./CompaniesList";
import {FundaCompaniesPageSearchParams} from "@/types/funda";

async function CompaniesListWrapper({searchParams}: FundaCompaniesPageSearchParams) {
    const {q: searchTerm = ''} = await searchParams;

    return (
        <CompaniesList searchTerm={searchTerm}/>
    );
}

export {CompaniesListWrapper};
