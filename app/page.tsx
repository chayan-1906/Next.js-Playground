import Link from "next/link";
import {routes} from "@/lib/routes";

function Home() {
    return (
        <main className={'min-h-screen flex items-center justify-center bg-slate-50'}>
            <div className={'w-full max-w-md space-y-6 rounded-2xl p-8 shadow-lg'}>
                <h1 className={'text-2xl font-semibold text-slate-800 text-center'}>Next.js Playground</h1>

                <Link href={routes.scriptDemo} className={'block'}>
                    <button className={'w-full px-4 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 transition text-white font-medium cursor-pointer'}>Script Demo</button>
                </Link>

                <Link href={routes.cachingDemo} className={'block'}>
                    <button className={'w-full px-4 py-3 rounded-xl bg-green-500 hover:bg-green-600 transition text-white font-medium cursor-pointer'}>Caching Demo</button>
                </Link>

                <Link href={routes.clientActionStateDemo} className={'block'}>
                    <button className={'w-full px-4 py-3 rounded-xl bg-amber-600 hover:bg-amber-800 transition text-white font-medium cursor-pointer'}>Client Action State Demo</button>
                </Link>
                <Link href={routes.serverActionStateDemo} className={'block'}>
                    <button className={'w-full px-4 py-3 rounded-xl bg-amber-600 hover:bg-amber-800 transition text-white font-medium cursor-pointer'}>Server Action State Demo</button>
                </Link>
                <Link href={routes.serverClientHybridActionStateDemo} className={'block'}>
                    <button className={'w-full px-4 py-3 rounded-xl bg-amber-600 hover:bg-amber-800 transition text-white font-medium cursor-pointer'}>Server Client Hybrid Action State Demo</button>
                </Link>

                <Link href={routes.transitionsDemo} className={'block'}>
                    <button className={'w-full px-4 py-3 rounded-xl bg-sky-600 hover:bg-sky-800 transition text-white font-medium cursor-pointer'}>Transitions Demo</button>
                </Link>

                <Link href={routes.errorDemo} className={'block'}>
                    <button className={'w-full px-4 py-3 rounded-xl bg-red-600 hover:bg-red-800 transition text-white font-medium cursor-pointer'}>Error Demo</button>
                </Link>

                <Link href={routes.memoizationDemo} className={'block'}>
                    <button className={'w-full px-4 py-3 rounded-xl bg-slate-600 hover:bg-slate-800 transition text-white font-medium cursor-pointer'}>Memoization Demo</button>
                </Link>

                <Link href={routes.interceptingParallelDemo} className={'block'}>
                    <button className={'w-full px-4 py-3 rounded-xl bg-lime-600 hover:bg-lime-800 transition text-white font-medium cursor-pointer'}>Intercepting & Parallel Routes Demo</button>
                </Link>

                <Link href={routes.refreshDemo} className={'block'}>
                    <button className={'w-full px-4 py-3 rounded-xl bg-rose-600 hover:bg-rose-800 transition text-white font-medium cursor-pointer'}>Refresh Demo</button>
                </Link>

                <Link href={routes.proxyDemo} className={'block'}>
                    <button className={'w-full px-4 py-3 rounded-xl bg-gray-600 hover:bg-gray-800 transition text-white font-medium cursor-pointer'}>Proxy Demo</button>
                </Link>

                <Link href={routes.redirectDemo} className={'block'}>
                    <button className={'w-full px-4 py-3 rounded-xl bg-yellow-600 hover:bg-yellow-800 transition text-white font-medium cursor-pointer'}>Redirect Demo</button>
                </Link>

                <Link href={routes.redirectRewriteDemo} className={'block'}>
                    <button className={'w-full px-4 py-3 rounded-xl bg-pink-600 hover:bg-pink-800 transition text-white font-medium cursor-pointer'}>Redirect-Rewrite Demo</button>
                </Link>

                <Link href={routes.httpOnlyCookiesDemo} className={'block'}>
                    <button className={'w-full px-4 py-3 rounded-xl bg-violet-600 hover:bg-violet-800 transition text-white font-medium cursor-pointer'}>Http-only Cookies Demo</button>
                </Link>

                <Link href={routes.jsonLdDemo} className={'block'}>
                    <button className={'w-full px-4 py-3 rounded-xl bg-green-600 hover:bg-green-800 transition text-white font-medium cursor-pointer'}>JSON-LD Demo</button>
                </Link>

                <Link href={routes.mdxDemo} className={'block'}>
                    <button className={'w-full px-4 py-3 rounded-xl bg-fuchsia-600 hover:bg-fuchsia-800 transition text-white font-medium cursor-pointer'}>MDX Demo</button>
                </Link>

                <Link href={routes.staticParamsDemo} className={'block'}>
                    <button className={'w-full px-4 py-3 rounded-xl bg-orange-600 hover:bg-orange-800 transition text-white font-medium cursor-pointer'}>Static Params Demo</button>
                </Link>

                <Link href={routes.useSWRDemo} className={'block'}>
                    <button className={'w-full px-4 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-800 transition text-white font-medium cursor-pointer'}>Use SWR Demo</button>
                </Link>

                <Link href={routes.catchOptionalAllDemo} className={'block'}>
                    <button className={'w-full px-4 py-3 rounded-xl bg-teal-600 hover:bg-teal-800 transition text-white font-medium cursor-pointer'}>Catch-All/Optional Cahch-All Demo</button>
                </Link>

                <Link href={routes.useDemo} className={'block'}>
                    <button className={'w-full px-4 py-3 rounded-xl bg-stone-600 hover:bg-stone-800 transition text-white font-medium cursor-pointer'}>use Hook</button>
                </Link>

                <Link href={routes.draftModeDemo} className={'block'}>
                    <button className={'w-full px-4 py-3 rounded-xl bg-yellow-600 hover:bg-yellow-800 transition text-white font-medium cursor-pointer'}>Draft Mode</button>
                </Link>

                <Link href={routes.funda} className={'block'}>
                    <button className={'w-full px-4 py-3 rounded-xl bg-sky-600 hover:bg-sky-800 transition text-white font-medium cursor-pointer'}>FUNDA</button>
                </Link>
            </div>
        </main>
    );
}

export default Home;
