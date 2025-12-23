"use client";

import Link from "next/link";
import Image from "next/image";
import {useEffect} from "react";
import {ArrowUpRight} from "lucide-react";
import {FaLinkedin} from "react-icons/fa6";
import {routes} from "@/lib/routes";
import {CompanyModalProps} from "@/types/funda";

function CompanyModal({company, onClose}: CompanyModalProps) {
    const {_rmx_id: companyId, name, picture, headquarters, linkedin} = company || {};

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
            <div className={'relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden'}>
                {/* Close button */}
                <button onClick={onClose}
                        className={'absolute top-4 right-4 z-10 size-8 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors cursor-pointer'}>
                    {'✕'}
                </button>

                {/* Content */}
                <div className={'p-8'}>
                    {/* Header */}
                    <div className={'flex flex-col items-center text-center gap-4 mb-6'}>
                        {/* Company Logo */}
                        <div className={'shrink-0'}>
                            {picture ? (
                                <Image src={picture} alt={name} width={100} height={100} className={'rounded-2xl object-cover border-2 border-gray-100 dark:border-gray-700'}/>
                            ) : (
                                <div className={'size-24 rounded-2xl bg-linear-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white text-5xl font-bold'}>
                                    {name.charAt(0)}
                                </div>
                            )}
                        </div>

                        {/* Company Info */}
                        <div className={'w-full'}>
                            <div className={'flex items-center justify-center gap-2 mb-2'}>
                                <h2 className={'text-3xl font-bold text-gray-900 dark:text-white'}>
                                    {name}
                                </h2>
                                <Link href={routes.fundaCompany(companyId._rmx_value)}
                                      className={'size-7 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors'}>
                                    <ArrowUpRight className={'size-4'}/>
                                </Link>
                                {linkedin && (
                                    <a href={linkedin} target={'_blank'} rel={'noopener noreferrer'}
                                       className={'size-7 rounded-full bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400 transition-colors'}>
                                        <FaLinkedin className={'size-4'}/>
                                    </a>
                                )}
                            </div>

                            {headquarters && (
                                <div className={'flex items-center justify-center gap-2 text-gray-500 dark:text-gray-400'}>
                                    <span>{'📍'}</span>
                                    <span>{headquarters}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export {CompanyModal};
