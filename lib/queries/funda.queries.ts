import {cache} from "react";
import {cacheTag} from "next/cache";
import {FundaApiResponse, FundaCompany, FundaPerson, FundaRelationship, FundaRelationshipProps} from "@/types/funda";

const FUNDA_API_URL = "https://agt.remixlabs.com/run-agent/sEt2qxPydL/dbp-db/agents";

const getFundaPeople = cache(async (): Promise<{ people: FundaPerson[]; cachedAt: string }> => {
        "use cache";
        cacheTag('funda-people');

        const cachedAt: string = new Date().toISOString();
        console.log('🔥 FETCHING FUNDA PEOPLE at', cachedAt);

        const response: Response = await fetch(`${FUNDA_API_URL}/search_funda`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({n: 500, entity: 'person'}),
        });

        if (!response.ok) {
            throw new Error('Failed to fetch people');
        }

        const data: FundaApiResponse<FundaPerson> = await response.json();
        const people: FundaPerson[] = data._rmx_value.filtered_data;

        return {people, cachedAt};
    }
);

const getFundaCompanies = cache(async (): Promise<{ companies: FundaCompany[]; cachedAt: string }> => {
        "use cache";
        cacheTag('funda-companies');

        const cachedAt: string = new Date().toISOString();
        console.log('🔥 FETCHING FUNDA COMPANIES at', cachedAt);

        const response: Response = await fetch(`${FUNDA_API_URL}/search_funda`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({n: 1000, entity: 'company'}),
        });

        if (!response.ok) {
            throw new Error('Failed to fetch companies');
        }

        const data: FundaApiResponse<FundaCompany> = await response.json();
        const companies: FundaCompany[] = data._rmx_value.filtered_data;

        return {companies, cachedAt};
    }
);

const getFundaRelationships = cache(async ({personId, companyId}: FundaRelationshipProps): Promise<{ relationships: FundaRelationship[]; cachedAt: string }> => {
        "use cache";
        cacheTag('funda-relationships');

        const cachedAt: string = new Date().toISOString();
        console.log('🔥 FETCHING FUNDA RELATIONSHIPS at', cachedAt);

        if ((!personId && !companyId) || (personId && companyId)) {
            throw new Error('Either personId or companyId is required, neither both nor none');
        }

        const response: Response = await fetch(`${FUNDA_API_URL}/cloud_query_filter_funda`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({from: [personId], to: [companyId], entity: 'relationship'}),
        });

        if (!response.ok) {
            throw new Error('Failed to fetch relationships');
        }

        const data: FundaApiResponse<FundaRelationship> = await response.json();
        const relationships: FundaRelationship[] = data.filtered_data;

        return {relationships, cachedAt};
    }
);

export {getFundaPeople, getFundaCompanies, getFundaRelationships};
