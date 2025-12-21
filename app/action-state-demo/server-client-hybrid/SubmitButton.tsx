"use client";

import {useFormStatus} from "react-dom";

function SubmitButton() {
    const {pending} = useFormStatus();

    return (
        <button
            type={'submit'}
            disabled={pending}
            className={`w-full rounded-xl py-3 text-lg font-semibold transition-all ${
                pending
                    ? 'cursor-not-allowed bg-indigo-900/70'
                    : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-indigo-500/30 shadow-lg cursor-pointer'
            }`}>
            {pending ? 'Adding Product…' : 'Add Product'}
        </button>
    );
}

export {SubmitButton};
