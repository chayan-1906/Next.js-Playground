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
  about: string;
  address: string;
  ai_model: string;
  company: string;
  education: FundaEducation[];
  email: string;
  entity: 'person';
  isTestMode: boolean;
  linkedIn: string;
  name: string;
  person_identifier: string;
  phone: string;
  picture: string;
  skills: FundaSkill[];
  summary: string;
  title: string;
}

export interface FundaCompany {
  company_identifier: string;
  entity: 'company';
  headquarters: string;
  isTestMode: boolean;
  name: string;
  picture: string;
  linkedIn: string;
}

export interface FundaRelationship {
  // To be defined when relationship entity response is available
}

// API Response wrapper
export interface FundaApiResponse<T> {
  _rmx_type: string;
  _rmx_value: {
    filtered_data: T[];
  };
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
