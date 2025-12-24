"use client";

import Link from "next/link";
import Image from "next/image";
import {FaLinkedin} from "react-icons/fa6";
import {routes} from "@/lib/routes";
import {CompanyListItemProps} from "@/types/funda";

function CompanyListItem({company, metadata}: CompanyListItemProps) {
    const {_rmx_id: companyId, name: companyName, picture: companyPicture, linkedin: companyLinkedin} = company;
    const {title: positionTitle, description, duration} = metadata || {};

    return (
        <Link href={routes.fundaCompany(companyId._rmx_value)}
              className={'flex items-start gap-4 pb-6 border-b border-gray-100 dark:border-gray-700 last:border-0 last:pb-0 -mx-4 px-4 rounded-lg transition-colors cursor-pointer'}>
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
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        window.open(companyLinkedin, '_blank', 'noopener,noreferrer');
                                    }}
                                    className={'flex items-center justify-center size-5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors cursor-pointer'}
                                >
                                    <FaLinkedin className={'size-3'}/>
                                </button>
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
        </Link>
    );
}

export {CompanyListItem};
