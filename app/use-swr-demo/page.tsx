import {SWRConfig} from "swr";
import {Suspense} from "react";
import {CurrentTime} from "@/app/use-swr-demo/CurrentTime";
import {getServerTime} from "@/lib/queries/swr-time.queries";

function UseSWRDemoPage() {
    const timePromise: Promise<{ timestamp: string; message: string }> = getServerTime();

    return (
        <SWRConfig value={{fallback: {'/api/timestamp': timePromise}}}>
            <div className={'min-h-screen bg-linear-to-br from-cyan-50 to-sky-100 p-8'}>
                <div className={'max-w-xl mx-auto space-y-8'}>
                    <div className={'text-center space-y-4'}>
                        <h1 className={'text-4xl font-bold text-slate-900'}>
                            {'SWR Demo'}
                        </h1>
                        <p className={'text-lg text-slate-600'}>
                            {'Server-side fallback + client-side revalidation with SWR'}
                        </p>
                    </div>

                    <div className={'bg-white rounded-xl shadow-lg p-8 border border-slate-200'}>
                        <div className={'space-y-4'}>
                            <div className={'flex items-center justify-between'}>
                                <h2 className={'text-xl font-semibold text-slate-900'}>
                                    {'Current Server Time'}
                                </h2>
                                <span className={'inline-block px-3 py-1 text-xs font-semibold rounded-full bg-cyan-100 text-cyan-800'}>
                                    {'Auto-refreshes every 5s'}
                                </span>
                            </div>
                            <Suspense
                                fallback={
                                    <div className={'animate-pulse space-y-3'}>
                                        <div className={'h-6 bg-slate-200 rounded w-3/4'}/>
                                        <div className={'h-4 bg-slate-200 rounded w-1/2'}/>
                                    </div>
                                }
                            >
                                <CurrentTime/>
                            </Suspense>
                        </div>
                    </div>

                    <div className={'bg-sky-50 rounded-xl border border-sky-200 p-6'}>
                        <h3 className={'text-sm font-semibold text-sky-900 mb-2'}>
                            {'How it works'}
                        </h3>
                        <ul className={'text-sm text-sky-800 space-y-1 list-disc list-inside'}>
                            <li>{'Server fetches initial data (no loading flash on first render)'}</li>
                            <li>{'SWR provides it as fallback via SWRConfig'}</li>
                            <li>{'Client-side useSWR revalidates every 5 seconds'}</li>
                            <li>{'Stale data shown while fresh data loads in background'}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </SWRConfig>
    );
}

export default UseSWRDemoPage;
