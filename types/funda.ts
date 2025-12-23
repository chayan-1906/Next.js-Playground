export interface RMX_ID {
    _rmx_type: string;
    _rmx_value: string;
}

// Sub-types for Person
export interface FundaEducation {
    degree?: string;
    description?: string;
    institute: string;
    linkedin?: string;
    period?: string;
    picture?: string;
}

export interface FundaSkill {
    skill: string;
    skill_link: string;
}

// Main entity types
export interface FundaPerson {
    _rmx_id: RMX_ID;
    about: string;
    address: string;
    ai_model: string;
    company: string;
    education: FundaEducation[];
    email: string;
    entity: 'person';
    isTestMode: boolean;
    linkedin: string;
    name: string;
    person_identifier: string;
    phone: string;
    picture: string;
    skills: FundaSkill[];
    summary: string;
    title: string;
}

export interface FundaCompany {
    _rmx_id: RMX_ID;
    company_identifier: string;
    entity: 'company';
    headquarters: string;
    isTestMode: boolean;
    name: string;
    picture: string;
    linkedin: string;
    company_size?: string;
    founded?: string;
    industry?: string;
    overview?: string;
    phone?: string;
    specialties?: string;
    website?: string;
}

export interface FundaRelationshipMetadata {
    title?: string;
    description?: string;
    duration?: string;
    name?: string;
    relationship_type?: string;
}

export interface FundaRelationship {
    _rmx_id: RMX_ID;
    entity: 'relationship';
    from: RMX_ID;
    from_entity: string;
    from_obj: FundaPerson;
    metadata: FundaRelationshipMetadata;
    to_entity: string;
    to: RMX_ID;
    to_obj: FundaCompany;
}

// API params
export interface FundaRelationshipProps {
    personId?: string;
    companyId?: string;
}

// API Response wrapper
export interface FundaApiResponse<T> {
    _rmx_type: string;
    _rmx_value: {
        filtered_data: T[];
    };
    filtered_data: T[];
}

export interface PersonCardProps {
    person: FundaPerson;
}

export interface CompanyCardProps {
    company: FundaCompany;
}

export interface PersonModalProps {
    person: FundaPerson;
    onClose: () => void;
}

export interface CompanyModalProps {
    company: FundaCompany;
    onClose: () => void;
}

export interface FundaPersonPageProps {
    params: Promise<{ personId: string }>;
}

export interface PersonDetailsProps {
    personId: string;
}

export interface CompanyDetailsProps {
    companyId: string;
}

export interface FundaCompanyPageProps {
    params: Promise<{ companyId: string }>;
}

export interface FundaErrorProps {
    error: Error & { digest?: string };
    reset: () => void;
}
