"use client";

import {use} from "react";
import Image from 'next/image';
import {useRouter} from 'next/navigation';

type PhotoModalProps = {
    params: Promise<{
        id: string;
    }>;
};

function PhotoModal({params}: PhotoModalProps) {
    const router = useRouter();
    // const {id} = params;
    const {id} = use(params);

    const photo = {
        id,
        title: `Photo ${id}`,
        url: `https://picsum.photos/id/${id}/1200/800`,
    };

    const handleClose = () => router.back();

    return (
        <div className={'fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 sm:p-8'} onClick={handleClose}>
            {/* Modal Content */}
            <div className={'relative w-full max-w-5xl h-[90vh] bg-gray-900/50 rounded-2xl overflow-hidden shadow-2xl p-4 border border-gray-800'} onClick={(e) => e.stopPropagation()}>
                <button onClick={handleClose} className={'absolute top-4 right-4 text-white/70 hover:text-white transition-colors text-4xl leading-none font-light z-10'}>
                    &times;
                </button>

                <div className={'relative w-full h-full flex items-center justify-center'}>
                    <Image src={photo.url} alt={photo.title} fill className={'object-contain'}/>
                </div>
            </div>
        </div>
    );
}

export default PhotoModal;
