import {CompanyCard} from "./CompanyCard";
import {FundaCompany} from "@/types/funda";
import {getFundaCompanies} from "@/lib/queries/funda.queries";

async function CompaniesList() {
    const {companies, cachedAt} = await getFundaCompanies();

    return (
        <div>
            <p className={'text-xs text-gray-400 dark:text-gray-500 mb-4'}>
                Cached at: ${cachedAt}
            </p>
            <div className={'grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'}>
                {companies.map((company: FundaCompany) => (
                    <CompanyCard key={company.company_identifier} company={company}/>
                ))}
            </div>
        </div>
    );
}

export {CompaniesList};
