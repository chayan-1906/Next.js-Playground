"use client";

import {useState} from "react";
import Image from "next/image";
import {FaLinkedin} from "react-icons/fa6";
import {PersonModal} from "./PersonModal";
import {PersonCardProps} from "@/types/funda";

function PersonCard({person}: PersonCardProps) {
    const {name, title, address, picture, company, linkedin} = person || {};

    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <div className={'rounded-2xl bg-white dark:bg-gray-800 shadow-md dark:shadow-gray-900/50 hover:shadow-lg dark:hover:shadow-gray-900/70 transition-shadow cursor-pointer p-5 relative'}
                 onClick={() => setIsModalOpen(true)}>
                {/* LinkedIn Button */}
                {linkedin && (
                    <a href={linkedin} target={'_blank'} rel={'noopener noreferrer'} onClick={(e) => e.stopPropagation()}
                       className={'absolute top-4 right-4 size-8 rounded-full bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400 transition-colors'}>
                        <FaLinkedin className={'size-4'}/>
                    </a>
                )}

                <div className={'flex items-start gap-4'}>
                    {/* Profile Picture */}
                    <div className={'shrink-0'}>
                        {picture ? (
                            <Image src={picture} alt={name} width={64} height={64} className={'rounded-full object-cover border-2 border-gray-100 dark:border-gray-700'}/>
                        ) : (
                            <div className={'size-16 rounded-full bg-linear-to-br from-orange-400 to-red-500 flex items-center justify-center text-white text-3xl font-bold'}>
                                {name.charAt(0)}
                            </div>
                        )}
                    </div>

                    {/* Basic Info */}
                    <div className={'flex-1 min-w-0 max-w-md'}>
                        <h3 className={'text-lg font-semibold text-gray-900 dark:text-white'}>
                            {name}
                        </h3>
                        <p className={'text-sm text-orange-600 dark:text-orange-400 font-medium line-clamp-2'}>
                            {title}
                        </p>
                        <p className={'text-sm text-gray-500 dark:text-gray-400 truncate'}>
                            {company}
                        </p>
                        <div className={'flex items-center gap-2 mt-1 text-xs text-gray-400 dark:text-gray-500'}>
                            <span>{'📍'}</span>
                            <span className={'truncate'}>{address}</span>
                        </div>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <PersonModal person={person} onClose={() => setIsModalOpen(false)}/>
            )}
        </>
    );
}

export {PersonCard};
