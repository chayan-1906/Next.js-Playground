"use client";

import {useState} from "react";
import Image from "next/image";
import {FaLinkedin} from "react-icons/fa6";
import {CompanyModal} from "./CompanyModal";
import {CompanyCardProps} from "@/types/funda";

function CompanyCard({company}: CompanyCardProps) {
    const {_rmx_id: companyId, name, picture, headquarters, linkedin} = company || {};

    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <div
                className={'rounded-2xl bg-white dark:bg-gray-800 shadow-md dark:shadow-gray-900/50 hover:shadow-lg dark:hover:shadow-gray-900/70 transition-shadow overflow-hidden p-5 relative cursor-pointer'}
                onClick={() => setIsModalOpen(true)}>
                {/* LinkedIn Button */}
                {linkedin && (
                    <a href={linkedin} target={'_blank'} rel={'noopener noreferrer'} onClick={(e) => e.stopPropagation()}
                       className={'absolute top-4 right-4 size-8 rounded-full bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400 transition-colors'}>
                        <FaLinkedin className={'size-4'}/>
                    </a>
                )}

                <div className={'flex items-center gap-4'}>
                    {/* Company Logo */}
                    <div className={'shrink-0'}>
                        {picture ? (
                            <Image src={picture} alt={name} width={56} height={56} className={'rounded-lg object-cover border border-gray-100 dark:border-gray-700'}/>
                        ) : (
                            <div className={'size-16 rounded-xl bg-linear-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white text-3xl font-bold'}>
                                {name.charAt(0)}
                            </div>
                        )}
                    </div>

                    {/* Company Info */}
                    <div className={'flex-1 min-w-0 mr-6'}>
                        <h3 className={'text-lg font-semibold text-gray-900 dark:text-white truncate'}>
                            {name}
                        </h3>
                        {headquarters && (
                            <div className={'flex items-center gap-1.5 mt-1 text-sm text-gray-500 dark:text-gray-400'}>
                                <span>{'📍'}</span>
                                <span className={'truncate'}>{headquarters}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <CompanyModal company={company} onClose={() => setIsModalOpen(false)}/>
            )}
        </>
    );
}

export {CompanyCard};
