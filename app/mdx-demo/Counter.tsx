"use client";

import React, {useState} from "react";

type CounterProps = {
    initialCount?: number;
}

function Counter({initialCount = 0}: CounterProps): React.ReactNode {
    const [count, setCount] = useState<number>(initialCount);

    return (
        <div className={'flex items-center gap-4 my-4'}>
            <button onClick={() => setCount((prev: number) => prev - 1)} className={'px-4 py-2 bg-red-500 text-white text-3xl rounded-md hover:bg-red-600 cursor-pointer'}>
                {'-'}
            </button>
            <span className={'text-2xl font-bold min-w-[3ch] text-center'}>{count}</span>
            <button onClick={() => setCount((prev: number) => prev + 1)} className={'px-4 py-2 bg-green-500 text-white text-3xl rounded-md hover:bg-green-600 cursor-pointer'}>
                {'+'}
            </button>
        </div>
    );
}

export default Counter;
