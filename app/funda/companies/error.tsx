"use client";

import {useEffect} from "react";
import {FundaErrorProps} from "@/types/funda";

function FundaCompaniesError({error, reset}: FundaErrorProps) {
    useEffect(() => {
        console.error('Funda companies page error:', error);
    }, [error]);

    return (
        <div className={'max-w-7xl mx-auto flex flex-col p-6 gap-6'}>
            <div className={'flex flex-col items-center justify-center min-h-[50vh] text-center'}>
                <div className={'size-16 mx-auto mb-4 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center'}>
                    <span className={'text-4xl'}>{'⚠️'}</span>
                </div>
                <h2 className={'text-2xl font-bold text-gray-900 dark:text-white mb-2'}>
                    {'Failed to load companies'}
                </h2>
                <p className={'text-gray-600 dark:text-gray-400 mb-6 max-w-md'}>
                    {'We encountered an error while loading the companies data. Please try again.'}
                </p>
                {error.digest && (
                    <p className={'text-xs text-gray-400 dark:text-gray-500 mb-4'}>
                        Error ID: {error.digest}
                    </p>
                )}
                <button onClick={reset}
                        className={'px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white rounded-lg font-medium transition-colors cursor-pointer'}>
                    {'Try again'}
                </button>
            </div>
        </div>
    );
}

export default FundaCompaniesError;
