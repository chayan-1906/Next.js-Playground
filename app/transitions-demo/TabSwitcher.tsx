"use client";

import {useState, useTransition} from "react";

function TabSwitcher() {
    const [selectedTab, setSelectedTab] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [isPending, startTransition] = useTransition();

    const handleTabChange = async (tabId: number) => {
        // startTransition(async () => {
        setSelectedTab(tabId);
        setIsLoading(true);

        const response = await fetch(`https://dummyjson.com/products/${tabId}`);
        const data = await response.json();

        setIsLoading(false);
        // });
    }

    return (
        <div className={'flex flex-col w-full mt-10'}>
            <div className={'flex gap-4'}>
                <button onClick={() => handleTabChange(1)} className={'flex-1 p-6 rounded-l-2xl bg-pink-500 cursor-pointer'}>Without Transitions</button>
                <button onClick={() => handleTabChange(2)} className={'flex-1 p-6 rounded-r-2xl bg-green-500 cursor-pointer'}>With Transitions</button>
            </div>
            <div className={'mt-6 p-4 bg-gray-800 rounded-lg min-h-20'}>
                {isLoading ? (
                    <p className={'text-yellow-400'}>Loading Tab {selectedTab}...</p>
                ) : (
                    <p className={'text-white'}>Tab {selectedTab} Content</p>
                )}
            </div>
        </div>
    );
}

export {TabSwitcher};
