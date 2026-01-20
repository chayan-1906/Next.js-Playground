"use client";

import {useRouter} from "next/navigation";

function ClientRefreshButton() {
    const router = useRouter();

    return (
        <button className={'bg-indigo-500 text-white px-6 py-3 rounded-lg font-bold cursor-pointer hover:bg-indigo-600 transition-colors shadow-lg'} onClick={() => router.refresh()}>
            Client Refresh (router.refresh)
        </button>
    )
}

export {ClientRefreshButton};
