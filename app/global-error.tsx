"use client";

import {Roboto_Serif} from "next/font/google";
import "./globals.css";

const robotoSerif = Roboto_Serif({
    variable: '--font-roboto-serif',
    subsets: ['latin'],
});

function GlobalError({error, reset}: { error: Error; reset: () => void; }) {
    console.log('error:', error);

    return (
        <html lang={'en'}>
        <body className={`${robotoSerif.variable} antialiased`}>
        <div className={'flex flex-col items-center justify-center min-h-screen bg-gray-100'}>
            <div className={'bg-white p-8 rounded-lg shadow-md max-w-lg w-full text-center'}>
                <h1 className={'text-3xl font-bold text-red-600 mb-4'}>
                    Application Error
                </h1>
                <p className={'text-gray-700 mb-6'}>
                    We're sorry, but something went wrong. Please try again later.
                </p>
                <p className={'text-gray-500 text-sm mb-6'}>
                    <code>{error.message}</code>
                </p>
                <button onClick={reset} className={'bg-blue-500 hover:bg-blue-700 cursor-pointer text-white font-bold py-2 px-4 rounded'}>
                    Try Again
                </button>
            </div>
        </div>
        </body>
        </html>
    );
}

export default GlobalError;
