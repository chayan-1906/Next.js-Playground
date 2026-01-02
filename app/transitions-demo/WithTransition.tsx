"use client";

import {ChangeEvent, useCallback, useState, useTransition} from "react";
import {items} from "@/app/transitions-demo/data";

function WithTransition() {
    const [filteredList, setFilteredList] = useState(items);
    const [searchTerm, setSearchTerm] = useState('');
    const [isPendingg, startTran] = useTransition();

    const handleSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        console.log('searchTerm:', e.target.value);
        setSearchTerm(e.target.value);
        startTran(() => {
            const start = Date.now();
            while (Date.now() - start < 300) {}
            setFilteredList((prev) => items.filter((item) => item.name.toLowerCase().includes(e.target.value)));
        });
    }, [searchTerm]);

    return (
        <div className={'flex flex-col gap-4 w-1/2'}>
            <h1 className={'text-green-500 font-bold text-center text-xl'}>With Transitions</h1>
            <input value={searchTerm} onChange={handleSearch} className={'border rounded-lg h-10 text-white px-4'}/>
            {isPendingg && (
                <div className={'text-blue-400 text-sm'}>Filtering...</div>
            )}
            <div className={'grid grid-cols-6 gap-4'}>
                {filteredList.map(({id, name}) => (
                    <div key={id} className={'px-4 py-2 rounded-md bg-amber-800'}>
                        <h1>{id}. {name}</h1>
                    </div>
                ))}
            </div>
        </div>
    );
}

export {WithTransition};
