"use client";

import Image from "next/image";
import {useEffect} from "react";
import {FundaEducation, FundaSkill, PersonModalProps} from "@/types/funda";

function PersonModal({person, onClose}: PersonModalProps) {
    const {name, title, about, address, picture, company, summary, education, skills, linkedIn} = person || {};

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
            <div className={'relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden'}>
                {/* Close button */}
                <button onClick={onClose}
                        className={'absolute top-4 right-4 z-10 size-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors cursor-pointer'}>
                    {'✕'}
                </button>

                {/* Scrollable content */}
                <div className={'overflow-y-auto max-h-[90vh] p-6'}>
                    {/* Header */}
                    <div className={'flex items-start gap-4 mb-6'}>
                        <div className={'shrink-0'}>
                            {picture ? (
                                <Image src={picture} alt={name} width={80} height={80} className={'rounded-full object-cover border-2 border-gray-100'}/>
                            ) : (
                                <div className={'size-20 rounded-full bg-linear-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-4xl font-bold'}>
                                    {name.charAt(0)}
                                </div>
                            )}
                        </div>
                        <div className={'flex-1 min-w-0 pr-8'}>
                            <h2 className={'text-2xl font-bold text-gray-900'}>
                                {name}
                            </h2>
                            <p className={'text-indigo-600 font-medium'}>
                                {title}
                            </p>
                            <p className={'text-gray-500'}>
                                {company}
                            </p>
                            <div className={'flex items-center gap-2 mt-1 text-sm text-gray-400'}>
                                <span>{'📍'}</span>
                                <span>{address}</span>
                            </div>
                        </div>
                    </div>

                    {/* About */}
                    {about && (
                        <div className={'mb-6'}>
                            <h3 className={'text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2'}>
                                {'About'}
                            </h3>
                            <p className={'text-sm text-gray-600 leading-relaxed'}>
                                {about}
                            </p>
                        </div>
                    )}

                    {/* Summary */}
                    {summary && (
                        <div className={'mb-6'}>
                            <h3 className={'text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2'}>
                                {'Summary'}
                            </h3>
                            <p className={'text-sm text-gray-600 leading-relaxed'}>
                                {summary}
                            </p>
                        </div>
                    )}

                    {/* Skills */}
                    {skills && skills.length > 0 && (
                        <div className={'mb-6'}>
                            <h3 className={'text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2'}>
                                {'Skills'}
                            </h3>
                            <div className={'flex flex-wrap gap-2'}>
                                {skills.map((skill: FundaSkill, index: number) => (
                                    <span key={index} className={'px-2.5 py-1 bg-indigo-50 text-indigo-600 text-xs rounded-full font-medium'}>
                                        {skill.skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Education */}
                    {education && education.length > 0 && (
                        <div className={'mb-6'}>
                            <h3 className={'text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2'}>
                                {'Education'}
                            </h3>
                            <div className={'space-y-3'}>
                                {education.map((edu: FundaEducation, index: number) => (
                                    <div key={index} className={'flex items-start gap-3'}>
                                        {edu.picture ? (
                                            <Image src={edu.picture} alt={edu.institute} width={40} height={40} className={'rounded object-cover shrink-0'}/>
                                        ) : (
                                            <div className={'size-10 rounded bg-gray-200 flex items-center justify-center shrink-0'}>
                                                <span className={'text-gray-400'}>{'🎓'}</span>
                                            </div>
                                        )}
                                        <div>
                                            <p className={'font-medium text-gray-800'}>
                                                {edu.institute}
                                            </p>
                                            {edu.degree && (
                                                <p className={'text-sm text-gray-500'}>
                                                    {edu.degree}
                                                </p>
                                            )}
                                            {edu.period && (
                                                <p className={'text-xs text-gray-400'}>
                                                    {edu.period}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* LinkedIn Link */}
                    {linkedIn && (
                        <div className={'pt-4 border-t border-gray-100'}>
                            <a href={linkedIn} target={'_blank'} rel={'noopener noreferrer'}
                               className={'inline-flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-800 font-medium transition-colors'}>
                                <span>{'View LinkedIn Profile'}</span>
                                <span>{'→'}</span>
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export {PersonModal};
