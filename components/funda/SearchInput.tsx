"use client";

import {useRouter, useSearchParams} from "next/navigation";
import {useCallback, useEffect, useRef, useState, useTransition} from "react";
import {SearchInputProps} from "@/types/funda";

function SearchInput({placeholder = 'Search...'}: SearchInputProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const inputRef = useRef<HTMLInputElement>(null);
    const [isPending, startTransition] = useTransition();

    const [value, setValue] = useState(searchParams.get('q') ?? '');

    const updateSearch = useCallback((term: string) => {
        startTransition(() => {
            const params = new URLSearchParams(searchParams.toString());
            if (term) {
                params.set('q', term);
            } else {
                params.delete('q');
            }
            router.push(`?${params.toString()}`);
        });
    }, [router, searchParams]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === '/' && document.activeElement !== inputRef.current) {
                e.preventDefault();
                inputRef.current?.focus();
            }
        }

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    useEffect(() => {
        setValue(searchParams.get('q') ?? '');
    }, [searchParams]);

    useEffect(() => {
        const handler = setTimeout(() => {
            if (value !== (searchParams.get('q') ?? '')) {
                updateSearch(value);
            }
        }, 300);

        return () => clearTimeout(handler);
    }, [value, searchParams, updateSearch]);

    return (
        <div className={'relative'}>
            <input
                ref={inputRef}
                type={'text'}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={placeholder}
                className={'w-full px-4 py-2 pl-10 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 focus:border-transparent transition-all'}
            />
            <svg className={'absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400 dark:text-gray-500'} fill={'none'} stroke={'currentColor'} viewBox={'0 0 24 24'}>
                <path strokeLinecap={'round'} strokeLinejoin={'round'} strokeWidth={2} d={'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'}/>
            </svg>
            {isPending && (
                <div className={'absolute right-3 top-1/2 -translate-y-1/2'}>
                    <div className={'size-4 border-2 border-orange-500 border-t-transparent rounded-full animate-spin'}/>
                </div>
            )}
        </div>
    );
}

export {SearchInput};
