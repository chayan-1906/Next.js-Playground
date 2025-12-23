import Link from "next/link";
import Image from "next/image";
import {FaLinkedin} from "react-icons/fa6";
import {ArrowLeft, Globe} from "lucide-react";
import {routes} from "@/lib/routes";
import {getFundaRelationships} from "@/lib/queries/funda.queries";
import {CompanyDetailsProps, FundaRelationship} from "@/types/funda";

async function CompanyDetails({companyId}: CompanyDetailsProps) {
    const {relationships, cachedAt} = await getFundaRelationships({companyId});

    const company = relationships.length > 0 ? relationships[0].to_obj : null;

    if (!company) {
        throw new Error('Company not found');
    }

    const {name, picture, headquarters, linkedin, company_size, founded, industry, overview, phone, specialties, website} = company;

    return (
        <div className={'flex flex-col max-w-5xl mx-auto p-6 gap-6'}>
            {/* Back button */}
            <Link href={routes.fundaCompanies} className={'flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors w-fit'}>
                <ArrowLeft className={'size-4'}/>
                <span>Back to Companies</span>
            </Link>

            {/* Cache info */}
            <p className={'text-xs text-gray-400 dark:text-gray-500'}>
                Cached at: {cachedAt}
            </p>

            {/* Company Header Card */}
            <div className={'rounded-2xl bg-white dark:bg-gray-800 shadow-md dark:shadow-gray-900/50 p-8'}>
                <div className={'flex items-start gap-6 mb-6'}>
                    {/* Company Logo */}
                    <div className={'shrink-0'}>
                        {picture ? (
                            <Image src={picture} alt={name} width={120} height={120} className={'rounded-lg object-cover border-4 border-gray-100 dark:border-gray-700'}/>
                        ) : (
                            <div className={'size-30 rounded-lg bg-linear-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white text-5xl font-bold'}>
                                {name.charAt(0)}
                            </div>
                        )}
                    </div>

                    {/* Basic Info */}
                    <div className={'flex-1 min-w-0'}>
                        <h1 className={'text-4xl font-bold text-gray-900 dark:text-white mb-2'}>
                            {name}
                        </h1>
                        {industry && (
                            <p className={'text-lg text-gray-700 dark:text-gray-300 mb-1'}>
                                {industry}
                            </p>
                        )}
                        <div className={'flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500 dark:text-gray-400 mb-3'}>
                            {headquarters && (
                                <div className={'flex items-center gap-1.5'}>
                                    <span>{'📍'}</span>
                                    <span>{headquarters}</span>
                                </div>
                            )}
                            {company_size && (
                                <div className={'flex items-center gap-1.5'}>
                                    <span>{'👥'}</span>
                                    <span>{company_size}</span>
                                </div>
                            )}
                            {founded && (
                                <div className={'flex items-center gap-1.5'}>
                                    <span>{'📅'}</span>
                                    <span>Founded {founded}</span>
                                </div>
                            )}
                        </div>

                        {/* Links */}
                        <div className={'flex w-full gap-2'}>
                            {website && (
                                <a href={website} target={'_blank'} rel={'noopener noreferrer'}
                                   className={'inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors'}>
                                    <Globe className={'size-5'}/>
                                    <span>Visit Website</span>
                                </a>
                            )}
                            {linkedin && (
                                <a href={linkedin} target={'_blank'} rel={'noopener noreferrer'}
                                   className={'inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border-2 border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-400 font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors'}>
                                    <FaLinkedin className={'size-5'}/>
                                    <span>View on LinkedIn</span>
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                {/* Overview */}
                {overview && (
                    <div className={'mb-6'}>
                        <h2 className={'text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-3'}>
                            Overview
                        </h2>
                        <p className={'text-gray-600 dark:text-gray-300 leading-relaxed'}>
                            {overview}
                        </p>
                    </div>
                )}

                {/* Specialties */}
                {specialties && (
                    <div>
                        <h2 className={'text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-3'}>
                            Specialties
                        </h2>
                        <p className={'text-gray-600 dark:text-gray-300 leading-relaxed'}>
                            {specialties}
                        </p>
                    </div>
                )}
            </div>

            {/* People */}
            {(relationships && relationships.length > 0) && (
                <div className={'rounded-2xl bg-white dark:bg-gray-800 shadow-md dark:shadow-gray-900/50 p-8'}>
                    <h2 className={'text-xl font-bold text-gray-900 dark:text-white mb-6'}>
                        Colleagues & Alumni
                    </h2>
                    <div className={'space-y-6'}>
                        {relationships.map((relationship: FundaRelationship, index: number) => {
                            const {from_obj: person} = relationship;
                            const {name: personName, picture: personPicture, linkedin: personLinkedin, title: currentTitle, company: currentCompany, address} = person;

                            return (
                                <div key={index} className={'flex items-start gap-4 pb-6 border-b border-gray-100 dark:border-gray-700 last:border-0 last:pb-0'}>
                                    {/* Profile Picture */}
                                    <div className={'shrink-0'}>
                                        {personPicture ? (
                                            <Image src={personPicture} alt={personName} width={56} height={56} className={'rounded-full object-cover border border-gray-100 dark:border-gray-700'}/>
                                        ) : (
                                            <div className={'size-14 rounded-full bg-linear-to-br from-orange-400 to-red-500 flex items-center justify-center text-white text-3xl font-bold'}>
                                                {personName.charAt(0)}
                                            </div>
                                        )}
                                    </div>

                                    {/* Person Details */}
                                    <div className={'flex-1 min-w-0'}>
                                        <div className={'flex items-start justify-between gap-4 mb-1'}>
                                            <div className={'flex-1'}>
                                                <div className={'flex items-center gap-2'}>
                                                    <h3 className={'text-lg font-semibold text-gray-900 dark:text-white'}>
                                                        {personName}
                                                    </h3>
                                                    {personLinkedin && (
                                                        <a href={personLinkedin} target={'_blank'} rel={'noopener noreferrer'}
                                                           className={'size-5 rounded-full bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400 transition-colors'}>
                                                            <FaLinkedin className={'size-3'}/>
                                                        </a>
                                                    )}
                                                </div>
                                                <p className={'text-orange-600 dark:text-orange-400 font-medium'}>
                                                    {currentTitle}
                                                </p>
                                                <p className={'text-sm text-gray-600 dark:text-gray-400'}>
                                                    {currentCompany}
                                                </p>
                                                {address && (
                                                    <div className={'flex items-center gap-1.5 mt-1 text-xs text-gray-400 dark:text-gray-500'}>
                                                        <span>{'📍'}</span>
                                                        <span>{address}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}

export {CompanyDetails};
