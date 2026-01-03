"use client";

import {useState} from "react";

function ClientErrorButton() {
    const [shouldShowError, setShouldShowError] = useState(false);

    const occurError = () => {
        setShouldShowError(true);
    }

    const handleClick = async () => {
        const response = await fetch('/api/data');
        if (!response.ok) {
            setShouldShowError(true);
        } else {
            const data = await response.json();
        }
    }

    if (shouldShowError) {
        throw new Error('Error occurred!');
    }

    return (
        <div className={'flex flex-col gap-3'}>
            <button onClick={occurError} className={'bg-red-500 hover:bg-red-700 cursor-pointer text-white font-bold py-2 px-4 rounded'}>
                Trigger Client-Side Error
            </button>

            <button onClick={handleClick} className={'bg-blue-500 hover:bg-blue-700 cursor-pointer text-white font-bold py-2 px-4 rounded'}>
                Call Fake API
            </button>
        </div>
    );
}

export {ClientErrorButton};
