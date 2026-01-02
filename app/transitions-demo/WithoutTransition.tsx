"use client";

import {ChangeEvent, useCallback, useState} from "react";
import {items} from "@/app/transitions-demo/data";

function WithoutTransition() {
    const [filteredList, setFilteredList] = useState(items);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        console.log('searchTerm:', e.target.value);
        setSearchTerm(e.target.value);
        setFilteredList((prev) => items.filter((item) => item.name.toLowerCase().includes(e.target.value)));
    }, [searchTerm]);

    return (
        <div className={'flex flex-col gap-4 w-1/2'}>
            <h1 className={'text-pink-500 font-bold text-center text-xl'}>Without Transitions</h1>
            <input value={searchTerm} onChange={handleSearch} className={'border rounded-lg h-10 text-white px-4'}/>
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

export {WithoutTransition};
