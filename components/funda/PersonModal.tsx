"use client";

import Link from "next/link";
import Image from "next/image";
import {useEffect} from "react";
import {ArrowUpRight} from "lucide-react";
import {FaLinkedin} from "react-icons/fa6";
import {routes} from "@/lib/routes";
import {FundaEducation, FundaSkill, PersonModalProps} from "@/types/funda";

function PersonModal({person, onClose}: PersonModalProps) {
    const {_rmx_id: personId, name, title, about, address, picture, company, summary, education, skills, linkedin} = person || {};

    // Close on escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        }
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [onClose]);

    // Prevent body scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        }
    }, []);

    return (
        <div className={'fixed inset-0 z-50 flex items-center justify-center p-4'}>
            {/* Backdrop */}
            <div className={'absolute inset-0 bg-black/50 backdrop-blur-sm'} onClick={onClose}/>

            {/* Modal */}
            <div className={'relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden'}>
                {/* Close button */}
                <button onClick={onClose}
                        className={'absolute top-4 right-4 z-10 size-8 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors cursor-pointer'}>
                    {'✕'}
                </button>

                {/* Scrollable content */}
                <div className={'overflow-y-auto max-h-[90vh] p-6'}>
                    {/* Header */}
                    <div className={'flex items-start gap-4 mb-6'}>
                        <div className={'shrink-0'}>
                            {picture ? (
                                <Image src={picture} alt={name} width={80} height={80} className={'rounded-full object-cover border-2 border-gray-100 dark:border-gray-700'}/>
                            ) : (
                                <div className={'size-20 rounded-full bg-linear-to-br from-orange-400 to-red-500 flex items-center justify-center text-white text-5xl font-bold'}>
                                    {name.charAt(0)}
                                </div>
                            )}
                        </div>
                        <div className={'flex-1 min-w-0 pr-8'}>
                            <div className={'flex items-center gap-2'}>
                                <h2 className={'text-2xl font-bold text-gray-900 dark:text-white'}>
                                    {name}
                                </h2>
                                <Link
                                    href={routes.fundaPerson(personId._rmx_value)}
                                    className={'size-6 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors'}>
                                    <ArrowUpRight className={'size-4'}/>
                                </Link>
                                {linkedin && (
                                    <a href={linkedin} target={'_blank'} rel={'noopener noreferrer'}
                                       className={'size-6 rounded-full bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400 transition-colors'}>
                                        <FaLinkedin className={'size-3.5'}/>
                                    </a>
                                )}
                            </div>
                            <p className={'text-orange-600 dark:text-orange-400 font-medium'}>
                                {title}
                            </p>
                            <p className={'text-gray-500 dark:text-gray-400'}>
                                {company}
                            </p>
                            <div className={'flex items-center gap-2 mt-1 text-sm text-gray-400 dark:text-gray-500'}>
                                <span>{'📍'}</span>
                                <span>{address}</span>
                            </div>
                        </div>
                    </div>

                    {/* About */}
                    {about && (
                        <div className={'mb-6'}>
                            <h3 className={'text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-2'}>
                                {'About'}
                            </h3>
                            <p className={'text-sm text-gray-600 dark:text-gray-300 leading-relaxed'}>
                                {about}
                            </p>
                        </div>
                    )}

                    {/* Summary */}
                    {summary && (
                        <div className={'mb-6'}>
                            <h3 className={'text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-2'}>
                                {'Summary'}
                            </h3>
                            <p className={'text-sm text-gray-600 dark:text-gray-300 leading-relaxed'}>
                                {summary}
                            </p>
                        </div>
                    )}

                    {/* Skills */}
                    {skills && skills.length > 0 && (
                        <div className={'mb-6'}>
                            <h3 className={'text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-2'}>
                                {'Skills'}
                            </h3>
                            <div className={'flex flex-wrap gap-2'}>
                                {skills.map((skill: FundaSkill, index: number) => (
                                    <span key={index} className={'px-2.5 py-1 bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-300 text-xs rounded-full font-medium'}>
                                        {skill.skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Education */}
                    {education && education.length > 0 && (
                        <div className={'mb-6'}>
                            <h3 className={'text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-2'}>
                                {'Education'}
                            </h3>
                            <div className={'space-y-3'}>
                                {education.map((edu: FundaEducation, index: number) => (
                                    <div key={index} className={'flex items-start gap-3'}>
                                        {edu.picture ? (
                                            <Image src={edu.picture} alt={edu.institute} width={40} height={40} className={'rounded object-cover shrink-0'}/>
                                        ) : (
                                            <div className={'size-10 rounded bg-gray-200 dark:bg-gray-700 flex items-center justify-center shrink-0'}>
                                                <span className={'text-gray-400 dark:text-gray-500'}>{'🎓'}</span>
                                            </div>
                                        )}
                                        <div>
                                            <p className={'font-medium text-gray-800 dark:text-gray-200'}>
                                                {edu.institute}
                                            </p>
                                            {edu.degree && (
                                                <p className={'text-sm text-gray-500 dark:text-gray-400'}>
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
            </div>
        </div>
    );
}

export {PersonModal};
