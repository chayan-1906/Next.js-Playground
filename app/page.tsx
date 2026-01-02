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
                    <button className={'w-full px-4 py-3 rounded-xl bg-pink-500 hover:bg-pink-600 transition text-white font-medium cursor-pointer'}>Client Action State Demo</button>
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

                <Link href={routes.funda} className={'block'}>
                    <button className={'w-full px-4 py-3 rounded-xl bg-sky-600 hover:bg-sky-800 transition text-white font-medium cursor-pointer'}>FUNDA</button>
                </Link>
            </div>
        </main>
    );
}

export default Home;
