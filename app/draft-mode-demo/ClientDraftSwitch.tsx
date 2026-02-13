"use client";

import {useRouter} from "next/navigation";
import {useCallback, useState} from "react";

function ClientDraftSwitch({isEnabled}: { isEnabled: boolean; }) {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const onToggle = useCallback(async () => {
        setIsLoading(true);
        await fetch('/api/toggle-draft', {method: 'POST'});
        router.refresh();
        setIsLoading(false);
    }, [router]);

    return (
        <button
            type={'button'}
            role={'switch'}
            aria-checked={isEnabled}
            disabled={isLoading}
            onClick={onToggle}
            className={`relative inline-flex h-8 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50 disabled:cursor-not-allowed ${isEnabled ? 'bg-blue-600' : 'bg-slate-300'}`}
        >
            <span
                className={`pointer-events-none inline-block h-7 w-7 rounded-full bg-white shadow-lg ring-0 transition-transform duration-200 ease-in-out ${isEnabled ? 'translate-x-6' : 'translate-x-0'}`}/>
        </button>
    );
}

export {ClientDraftSwitch};
