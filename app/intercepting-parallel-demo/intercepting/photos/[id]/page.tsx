import Link from "next/link";
import {Suspense} from "react";
import Image from "next/image";
import {routes} from "@/lib/routes";

type PhotoDetailsProps = {
    params: {
        id: string;
    };
};

async function PhotoDetails({params}: PhotoDetailsProps) {
    return (
        <Suspense fallback={<div className={'min-h-screen bg-gray-950 flex items-center justify-center text-white'}>Loading...</div>}>
            <PhotoDetailsWrapper params={params}/>
        </Suspense>
    );
}

async function PhotoDetailsWrapper({params}: PhotoDetailsProps) {
    const {id} = await params || {};
    const photo = {
        id,
        title: `Photo ${id}`,
        url: `https://picsum.photos/id/${id}/1200/800`,
        author: 'John Doe',
        likes: Math.floor(Math.random() * 1000),
    };

    return (
        <div className={'min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 p-8 flex flex-col items-center justify-center relative'}>
            <Link href={routes.interceptingDemo} className={'absolute top-8 left-8 flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline font-medium'}>
                <span>←</span> Back to Gallery
            </Link>

            <div className={'max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 bg-gray-100 dark:bg-gray-900 rounded-2xl overflow-hidden shadow-2xl mt-12 lg:mt-0'}>

                {/* Image Section */}
                <div className={'relative aspect-square lg:aspect-auto bg-gray-200 dark:bg-gray-800'}>
                    <Image src={photo.url} alt={photo.title} fill className={'object-cover'}/>
                </div>

                {/* Details Section */}
                <div className={'p-8 lg:p-12 flex flex-col justify-center'}>
                    <h1 className={'text-4xl font-black mb-4'}>
                        {photo.title}
                    </h1>
                    <div className={'space-y-4 text-lg text-gray-600 dark:text-gray-300'}>
                        <p>
                            <span className={'font-semibold text-gray-900 dark:text-white'}>ID:</span> {id}
                        </p>
                        <p>
                            <span className={'font-semibold text-gray-900 dark:text-white'}>Author:</span> {photo.author}
                        </p>
                        <p>
                            <span className={'font-semibold text-gray-900 dark:text-white'}>Likes:</span> {photo.likes} ❤️
                        </p>
                    </div>

                    <div className={'mt-8'}>
                        <button className={'px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors'}>
                            Share Photo
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PhotoDetails;
