"use client";

import Link from "next/link";
import {FaLinkedin} from "react-icons/fa6";
import {routes} from "@/lib/routes";
import {PersonListItemProps} from "@/types/funda";
import {FallbackImage} from "@/components/funda/FallbackImage";

function PersonListItem({person}: PersonListItemProps) {
    const {_rmx_id: personId, name: personName, picture: personPicture, linkedin: personLinkedin, title: currentTitle, company: currentCompany, address} = person;

    return (
        <Link href={routes.fundaPerson(personId._rmx_value)}
              className={'flex items-start gap-4 pb-6 border-b border-gray-100 dark:border-gray-700 last:border-0 last:pb-0 -mx-4 px-4 rounded-lg transition-colors cursor-pointer'}>
            {/* Profile Picture */}
            <div className={'shrink-0'}>
                {personPicture ? (
                    <FallbackImage src={personPicture} alt={personName} width={56} height={56} errorComponent={
                        <div className={'size-14 rounded-full bg-linear-to-br from-orange-400 to-red-500 flex items-center justify-center text-white text-3xl font-bold'}>
                            {personName.charAt(0)}
                        </div>
                    } className={'rounded-full object-cover border border-gray-100 dark:border-gray-700'}/>
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
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        window.open(personLinkedin, '_blank', 'noopener,noreferrer');
                                    }}
                                    className={'flex items-center justify-center size-5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors cursor-pointer'}
                                >
                                    <FaLinkedin className={'size-3'}/>
                                </button>
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
        </Link>
    );
}

export {PersonListItem};
