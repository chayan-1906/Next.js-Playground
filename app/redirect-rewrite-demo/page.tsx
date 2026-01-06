import Link from "next/link";

function RedirectRewritePage() {
    return (
        <main className={'min-h-screen flex items-center justify-center bg-slate-50'}>
            <div className={'w-full max-w-md space-y-6 rounded-2xl p-8 shadow-lg'}>
                <h1 className={'text-2xl font-semibold text-pink-600 text-center'}>Redirect/Rewrite Demo</h1>

                <Link href={'/redirect-rewrite-demo/test-redirect'} className={'block'}>
                    <button className={'w-full px-4 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 transition text-white font-medium cursor-pointer'}>
                        Test Redirect
                    </button>
                </Link>

                <Link href={'/redirect-rewrite-demo/test-rewrite'} className={'block'}>
                    <button className={'w-full px-4 py-3 rounded-xl bg-green-600 hover:bg-green-700 transition text-white font-medium cursor-pointer'}>
                        Test Rewrite
                    </button>
                </Link>
            </div>
        </main>
    );
}

export default RedirectRewritePage;

