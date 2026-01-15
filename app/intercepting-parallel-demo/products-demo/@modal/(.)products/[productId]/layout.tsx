"use client";

import {X} from "lucide-react";
import React, {useEffect} from "react";
import {useRouter} from "next/navigation";

function ProductDetailsLayout({children, details, related, reviews}: { children: React.ReactNode; details: React.ReactNode; related: React.ReactNode; reviews: React.ReactNode; }) {
    const router = useRouter();

    // Lock body scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        // Only close if clicking the backdrop itself, not the modal content
        if (e.target === e.currentTarget) {
            router.back();
        }
    }

    return (
        <div className={'fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4'} onClick={handleBackdropClick}>
            {/* Modal Container */}
            <div className={'relative w-full max-w-6xl bg-gray-50 dark:bg-gray-900 rounded-2xl shadow-2xl'}>
                {/* Close Button */}
                <button onClick={() => router.back()}
                        className={'absolute top-4 right-4 z-10 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border-2 border-gray-200 dark:border-gray-700 cursor-pointer'}
                        aria-label={'Close modal'}>
                    <X className={'size-6 text-gray-700 dark:text-gray-300'}/>
                </button>

                {/* Scrolling Content Area */}
                <div className={'max-h-[90vh] overflow-y-auto rounded-2xl'}>
                    <div className={'p-6 flex flex-col gap-6'}>
                        {children}
                        {details}
                        {reviews}
                        {related}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetailsLayout;
