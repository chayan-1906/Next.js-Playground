import Link from "next/link";
import Image from "next/image";
import {ArrowLeft} from "lucide-react";
import {FaLinkedin} from "react-icons/fa6";
import {routes} from "@/lib/routes";
import {getFundaRelationships} from "@/lib/queries/funda.queries";
import {FundaEducation, FundaRelationship, FundaSkill, PersonDetailsProps} from "@/types/funda";

async function PersonDetails({personId}: PersonDetailsProps) {
    const {relationships, cachedAt} = await getFundaRelationships({personId});

    const person = relationships.length > 0 ? relationships[0].from_obj : null;

    if (!person) {
        throw new Error('Person not found');
    }

    const {name, title, about, address, picture, company, summary, education, skills, linkedin} = person;

    return (
        <div className={'flex flex-col max-w-5xl mx-auto p-6 gap-6'}>
            {/* Back button */}
            <Link href={routes.fundaPeople} className={'flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors w-fit'}>
                <ArrowLeft className={'size-4'}/>
                <span>Back to People</span>
            </Link>

            {/* Cache info */}
            <p className={'text-xs text-gray-400 dark:text-gray-500'}>
                Cached at: {cachedAt}
            </p>

            {/* Person Header Card */}
            <div className={'rounded-2xl bg-white dark:bg-gray-800 shadow-md dark:shadow-gray-900/50 p-8'}>
                <div className={'flex items-start gap-6 mb-6'}>
                    {/* Profile Picture */}
                    <div className={'shrink-0'}>
                        {picture ? (
                            <Image src={picture} alt={name} width={120} height={120} className={'rounded-full object-cover border-4 border-gray-100 dark:border-gray-700'}/>
                        ) : (
                            <div className={'size-30 rounded-full bg-linear-to-br from-orange-400 to-red-500 flex items-center justify-center text-white text-5xl font-bold'}>
                                {name.charAt(0)}
                            </div>
                        )}
                    </div>

                    {/* Basic Info */}
                    <div className={'flex-1 min-w-0'}>
                        <h1 className={'text-3xl font-bold text-gray-900 dark:text-white mb-2'}>
                            {name}
                        </h1>
                        <p className={'text-xl text-orange-600 dark:text-orange-400 font-medium mb-1'}>
                            {title}
                        </p>
                        <p className={'text-lg text-gray-500 dark:text-gray-400 mb-2'}>
                            {company}
                        </p>
                        <div className={'flex items-center gap-2 text-gray-400 dark:text-gray-500'}>
                            <span>{'📍'}</span>
                            <span>{address}</span>
                        </div>
                    </div>

                    {/* LinkedIn Button */}
                    {linkedin && (
                        <div className={'mb-6'}>
                            <a href={linkedin} target={'_blank'} rel={'noopener noreferrer'}
                               className={'inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border-2 border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-400 font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors'}>
                                <FaLinkedin className={'size-5'}/>
                                <span>View on LinkedIn</span>
                            </a>
                        </div>
                    )}
                </div>

                {/* About */}
                {about && (
                    <div className={'mb-6'}>
                        <h2 className={'text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-3'}>
                            About
                        </h2>
                        <p className={'text-gray-600 dark:text-gray-300 leading-relaxed'}>
                            {about}
                        </p>
                    </div>
                )}

                {/* Summary */}
                {summary && (
                    <div className={'mb-6'}>
                        <h2 className={'text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-3'}>
                            Summary
                        </h2>
                        <p className={'text-gray-600 dark:text-gray-300 leading-relaxed'}>
                            {summary}
                        </p>
                    </div>
                )}

                {/* Skills */}
                {skills && skills.length > 0 && (
                    <div className={'mb-6'}>
                        <h2 className={'text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-3'}>
                            Skills
                        </h2>
                        <div className={'flex flex-wrap gap-2'}>
                            {skills.map((skill: FundaSkill, index: number) => (
                                <span key={index} className={'px-3 py-1.5 bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-300 text-sm rounded-full font-medium'}>
                                    {skill.skill}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Education */}
                {education && education.length > 0 && (
                    <div>
                        <h2 className={'text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-3'}>
                            Education
                        </h2>
                        <div className={'space-y-4'}>
                            {education.map((edu: FundaEducation, index: number) => (
                                <div key={index} className={'flex items-start gap-4'}>
                                    {edu.picture ? (
                                        <Image src={edu.picture} alt={edu.institute} width={48} height={48} className={'rounded object-cover shrink-0'}/>
                                    ) : (
                                        <div className={'size-12 rounded bg-gray-200 dark:bg-gray-700 flex items-center justify-center shrink-0'}>
                                            <span className={'text-gray-400 dark:text-gray-500'}>{'🎓'}</span>
                                        </div>
                                    )}
                                    <div className={'flex-1'}>
                                        <p className={'font-semibold text-gray-800 dark:text-gray-200'}>
                                            {edu.institute}
                                        </p>
                                        {edu.degree && (
                                            <p className={'text-sm text-gray-600 dark:text-gray-400'}>
                                                {edu.degree}
                                            </p>
                                        )}
                                        {edu.period && (
                                            <p className={'text-xs text-gray-400 dark:text-gray-500'}>
                                                {edu.period}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Work History */}
            {relationships && relationships.length > 0 && (
                <div className={'rounded-2xl bg-white dark:bg-gray-800 shadow-md dark:shadow-gray-900/50 p-8'}>
                    <h2 className={'text-xl font-bold text-gray-900 dark:text-white mb-6'}>
                        Work Experience
                    </h2>
                    <div className={'space-y-6'}>
                        {relationships.map((relationship: FundaRelationship, index: number) => {
                            const {to_obj: company, metadata} = relationship;
                            const {name: companyName, picture: companyPicture, linkedin: companyLinkedin} = company;
                            const {title: positionTitle, description, duration} = metadata || {};

                            return (
                                <div key={index} className={'flex items-start gap-4 pb-6 border-b border-gray-100 dark:border-gray-700 last:border-0 last:pb-0'}>
                                    {/* Company Logo */}
                                    <div className={'shrink-0'}>
                                        {companyPicture ? (
                                            <Image src={companyPicture} alt={companyName} width={56} height={56} className={'rounded-lg object-cover border border-gray-100 dark:border-gray-700'}/>
                                        ) : (
                                            <div className={'size-14 rounded-lg bg-linear-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white text-2xl font-bold'}>
                                                {companyName.charAt(0)}
                                            </div>
                                        )}
                                    </div>

                                    {/* Position Details */}
                                    <div className={'flex-1 min-w-0'}>
                                        <div className={'flex items-start justify-between gap-4 mb-1'}>
                                            <div className={'flex-1'}>
                                                <h3 className={'text-lg font-semibold text-gray-900 dark:text-white'}>
                                                    {positionTitle || 'Position'}
                                                </h3>
                                                <div className={'flex items-center gap-2'}>
                                                    <p className={'text-gray-700 dark:text-gray-300 font-medium'}>
                                                        {companyName}
                                                    </p>
                                                    {companyLinkedin && (
                                                        <a href={companyLinkedin} target={'_blank'} rel={'noopener noreferrer'}
                                                           className={'size-5 rounded-full bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400 transition-colors'}>
                                                            <FaLinkedin className={'size-3'}/>
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        {duration && (
                                            <p className={'text-sm text-gray-500 dark:text-gray-400 mb-2'}>
                                                {duration}
                                            </p>
                                        )}
                                        {description && (
                                            <p className={'text-sm text-gray-600 dark:text-gray-300 leading-relaxed'}>
                                                {description}
                                            </p>
                                        )}
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

export {PersonDetails};
