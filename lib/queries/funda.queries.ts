import {cache} from "react";
import {cacheTag} from "next/cache";
import {FundaApiResponse, FundaCompany, FundaPerson} from "@/types/funda";

const FUNDA_API_URL = "https://agt.remixlabs.com/run-agent/sEt2qxPydL/dbp-db/agents/search_funda";

const getFundaPeople = cache(async (): Promise<{ people: FundaPerson[]; cachedAt: string }> => {
        "use cache";
        cacheTag('funda-people');

        const cachedAt = new Date().toISOString();
        console.log('🔥 FETCHING FUNDA PEOPLE at', cachedAt);

        const response = await fetch(FUNDA_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({entity: 'person'}),
        });

        if (!response.ok) {
            throw new Error('Failed to fetch people');
        }

        const data: FundaApiResponse<FundaPerson> = await response.json();
        const people = data._rmx_value.filtered_data;

        return {people, cachedAt};
    }
);

const getFundaCompanies = cache(async (): Promise<{ companies: FundaCompany[]; cachedAt: string }> => {
        "use cache";
        cacheTag('funda-companies');

        const cachedAt = new Date().toISOString();
        console.log('🔥 FETCHING FUNDA COMPANIES at', cachedAt);

        const response = await fetch(FUNDA_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({entity: 'company'}),
        });

        if (!response.ok) {
            throw new Error('Failed to fetch companies');
        }

        const data: FundaApiResponse<FundaCompany> = await response.json();
        const companies = data._rmx_value.filtered_data;

        return {companies, cachedAt};
    }
);

export {getFundaPeople, getFundaCompanies};
