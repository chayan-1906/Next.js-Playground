"use client";

import useSWR from "swr";
import type {TimeData} from "@/types/swr-time";

const fetcher = (url: string): Promise<TimeData> => fetch(url).then((res) => res.json());

function CurrentTime() {
    const {data, error} = useSWR<TimeData>('/api/timestamp', fetcher, {
        refreshInterval: 5000,
    });

    if (error) {
        return (
            <div className={'rounded-lg bg-red-50 border border-red-200 p-4'}>
                <p className={'text-red-700 font-medium'}>{'Error fetching time'}</p>
            </div>
        );
    }

    return (
        <div className={'space-y-3'}>
            <div className={'flex items-center gap-3'}>
                <span className={'text-2xl font-mono font-bold text-slate-900'}>
                    {data?.timestamp}
                </span>
            </div>
            <p className={'text-sm text-slate-500'}>
                {data?.message}
            </p>
        </div>
    );
}

export {CurrentTime};
