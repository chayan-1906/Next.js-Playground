import {Suspense} from "react";
import {FundaCompanyPageProps} from "@/types/funda";
import {CompanyDetails} from "@/components/funda/CompanyDetails";
import {CompanyDetailsSkeleton} from "@/components/funda/CompanyDetailsSkeleton";

async function FundaCompany({params}: FundaCompanyPageProps) {
    return (
        <Suspense fallback={<CompanyDetailsSkeleton/>}>
            <CompanyWrapper params={params}/>
        </Suspense>
    );
}

async function CompanyWrapper({params}: { params: Promise<{ companyId: string }> }) {
    const {companyId} = await params;

    return (
        <CompanyDetails companyId={companyId}/>
    );
}

export default FundaCompany;
