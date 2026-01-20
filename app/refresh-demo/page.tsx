import {Suspense} from "react";
import {ClientRefreshButton} from "@/app/refresh-demo/ClientRefreshButton";
import {getCachedTime, getUncachedTime, revalidateTime} from "@/lib/queries/time.queries";

async function RefreshDemoPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <RefreshWrapper/>
        </Suspense>
    );
}

async function RefreshWrapper() {
    const cachedNow: Date = await getCachedTime();
    const uncachedNow: Date = await getUncachedTime();

    return (
        <div className={'flex flex-col min-h-screen items-center justify-center gap-8 bg-gray-50 p-4'}>
            <h1 className={'text-4xl font-bold text-gray-800'}>Refresh Demo</h1>

            <div className={'grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl'}>
                <div className={'bg-white rounded-lg shadow-md p-6 flex flex-col items-center gap-2'}>
                    <h2 className={'text-lg font-semibold text-gray-600'}>Cached Time</h2>
                    <p className={'text-2xl font-mono bg-gray-100 text-gray-900 p-2 rounded'}>{cachedNow.toISOString()}</p>
                </div>
                <div className={'bg-white rounded-lg shadow-md p-6 flex flex-col items-center gap-2'}>
                    <h2 className={'text-lg font-semibold text-gray-600'}>Uncached Time</h2>
                    <p className={'text-2xl font-mono bg-gray-100 text-gray-900 p-2 rounded'}>{uncachedNow.toISOString()}</p>
                </div>
            </div>

            <div className={'flex flex-col md:flex-row gap-4 items-center'}>
                <div className={'flex flex-col items-center gap-2'}>
                    <form action={revalidateTime}>
                        <button className={'bg-orange-500 text-white px-6 py-3 rounded-lg font-bold cursor-pointer hover:bg-orange-600 transition-colors shadow-lg'}>
                            Server Refresh (revalidatePath)
                        </button>
                    </form>
                    <p className={'text-sm text-gray-500'}>Refetches data on the server</p>
                </div>

                <div className={'flex flex-col items-center gap-2'}>
                    <ClientRefreshButton/>
                    <p className={'text-sm text-gray-500'}>Refreshes client-side state</p>
                </div>
            </div>
        </div>
    );
}

export default RefreshDemoPage;
