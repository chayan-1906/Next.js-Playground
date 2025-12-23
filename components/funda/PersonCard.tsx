"use client";

import {useState} from "react";
import Image from "next/image";
import {PersonModal} from "./PersonModal";
import {PersonCardProps} from "@/types/funda";

function PersonCard({person}: PersonCardProps) {
    const {name, title, address, picture, company, linkedIn} = person || {};

    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <div className={'rounded-2xl bg-white shadow-md hover:shadow-lg transition-shadow cursor-pointer p-5'} onClick={() => setIsModalOpen(true)}>
                <div className={'flex items-start gap-4'}>
                    {/* Profile Picture */}
                    <div className={'shrink-0'}>
                        {picture ? (
                            <Image src={picture} alt={name} width={64} height={64} className={'rounded-full object-cover border-2 border-gray-100'}/>
                        ) : (
                            <div className={'size-16 rounded-full bg-linear-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-3xl font-bold'}>
                                {name.charAt(0)}
                            </div>
                        )}
                    </div>

                    {/* Basic Info */}
                    <div className={'flex-1 min-w-0 max-w-md'}>
                        <h3 className={'text-lg font-semibold text-gray-900'}>
                            {name}
                        </h3>
                        <p className={'text-sm text-indigo-600 font-medium line-clamp-2'}>
                            {title}
                        </p>
                        <p className={'text-sm text-gray-500 truncate'}>
                            {company}
                        </p>
                        <div className={'flex items-center gap-2 mt-1 text-xs text-gray-400'}>
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
