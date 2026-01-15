import Link from "next/link";
import Image from "next/image";
import {routes} from "@/lib/routes";

const PHOTOS = Array.from({length: 16}, (_, i) => ({
    id: (10 + i).toString(),
    title: `Photo ${10 + i}`,
    url: `https://picsum.photos/id/${10 + i}/900/900`,
}));

function InterceptingParallelDemo() {
    return (
        <div className={'min-h-screen bg-white dark:bg-gray-950 p-8 transition-colors duration-200'}>
            <div className={'max-w-6xl mx-auto'}>
                <header className={'mb-12 text-center'}>
                    <h1 className={'text-4xl font-extrabold text-gray-900 dark:text-white mb-4'}>
                        Photo Gallery
                    </h1>
                    <p className={'text-lg text-gray-600 dark:text-gray-400'}>
                        Exploring Intercepting and Parallel Routes in Next.js
                    </p>
                </header>

                <div className={'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'}>
                    {PHOTOS.map((photo) => (
                        <Link key={photo.id} href={routes.photoDetailsDemo(photo.id)}
                              className={'group relative aspect-square overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-900 shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer border border-gray-200 dark:border-gray-800'}>
                            <Image src={photo.url} alt={photo.title} fill className={'h-full w-full object-cover transition-transform duration-700 group-hover:scale-110'}/>

                            {/* Overlay */}
                            <div className={'absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500'}/>

                            {/* Content */}
                            <div
                                className={'absolute bottom-0 left-0 right-0 p-6 bg-linear-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0'}>
                                <p className={'text-white font-bold text-lg'}>
                                    {photo.title}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default InterceptingParallelDemo;
