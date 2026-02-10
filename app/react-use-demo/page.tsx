import Link from "next/link";
import {routes} from "@/lib/routes";

function ReactUseDemoPage() {
    return (
        <div className={'min-h-screen bg-linear-to-br from-slate-50 to-slate-100 p-8'}>
            <div className={'max-w-4xl mx-auto space-y-8'}>
                {/* Header */}
                <div className={'text-center space-y-4'}>
                    <h1 className={'text-4xl font-bold text-slate-900'}>
                        {'React use() Hook'}
                    </h1>
                    <p className={'text-lg text-slate-600 max-w-2xl mx-auto'}>
                        {'Explore the React 19 use() hook for reading resources like Contexts and Promises inside components — including conditional usage'}
                    </p>
                </div>

                {/* Link Cards */}
                <div className={'grid sm:grid-cols-2 gap-6'}>
                    <Link href={routes.useContextDemo} className={'group block'}>
                        <div className={'bg-white rounded-xl shadow-lg p-6 border border-slate-200 hover:border-purple-500/50 hover:shadow-xl transition-all duration-300'}>
                            <div className={'flex items-center gap-3 mb-3'}>
                                <div className={'w-10 h-10 bg-linear-to-br from-purple-500 to-violet-600 rounded-lg flex items-center justify-center'}>
                                    <span className={'text-white text-lg font-bold'}>{'C'}</span>
                                </div>
                                <h2 className={'text-xl font-semibold text-slate-900 group-hover:text-purple-600 transition-colors'}>
                                    {'Context Demo'}
                                </h2>
                            </div>
                            <p className={'text-slate-600 text-sm'}>
                                {'Read context with use(Context) — works conditionally unlike useContext, enabling dynamic theme toggling'}
                            </p>
                        </div>
                    </Link>

                    <Link href={routes.usePromiseDemo} className={'group block'}>
                        <div className={'bg-white rounded-xl shadow-lg p-6 border border-slate-200 hover:border-blue-500/50 hover:shadow-xl transition-all duration-300'}>
                            <div className={'flex items-center gap-3 mb-3'}>
                                <div className={'w-10 h-10 bg-linear-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center'}>
                                    <span className={'text-white text-lg font-bold'}>{'P'}</span>
                                </div>
                                <h2 className={'text-xl font-semibold text-slate-900 group-hover:text-blue-600 transition-colors'}>
                                    {'Promise Demo'}
                                </h2>
                            </div>
                            <p className={'text-slate-600 text-sm'}>
                                {'Unwrap server-created promises on the client with use(promise) and Suspense for seamless async data flow'}
                            </p>
                        </div>
                    </Link>
                </div>

                {/* Educational Tip */}
                <div className={'bg-amber-50 border border-amber-200 rounded-xl p-6'}>
                    <h3 className={'text-lg font-semibold text-amber-900 mb-3'}>
                        {'use() vs useContext()'}
                    </h3>
                    <div className={'space-y-2 text-amber-800'}>
                        <p>
                            <strong>{'use(Context)'}</strong>{' can be called conditionally inside if-blocks and loops, unlike '}
                            <code className={'bg-amber-100 px-1 rounded'}>{'useContext'}</code>{' which must follow the Rules of Hooks.'}
                        </p>
                        <p>
                            <strong>{'use(promise)'}</strong>{' suspends the component until the promise resolves, integrating naturally with React Suspense boundaries.'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReactUseDemoPage;
