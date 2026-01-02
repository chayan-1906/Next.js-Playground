"use client";

function Error({error, reset}: { error: Error; reset: () => void; }) {
    console.log('error:', error);

    return (
        <div className={'flex flex-col items-center justify-center min-h-screen bg-gray-100'}>
            <div className={'bg-white p-8 rounded-lg shadow-md max-w-md w-full'}>
                <h2 className={'text-2xl font-bold text-red-600 mb-4'}>Something went wrong!</h2>
                <p className={'text-gray-700 mb-6'}>{error.message}</p>
                <button onClick={reset} className={'bg-blue-500 hover:bg-blue-700 cursor-pointer text-white font-bold py-2 px-4 rounded'}>
                    Try Again
                </button>
            </div>
        </div>
    );
}

export default Error;
