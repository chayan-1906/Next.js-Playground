function TestRedirectPage() {
    return (
        <main className={'min-h-screen flex items-center justify-center bg-red-50'}>
            <div className={'w-full max-w-md space-y-6 rounded-2xl p-8 shadow-lg text-center'}>
                <h1 className={'text-2xl font-semibold text-red-800'}>⚠️ Proxy Redirect NOT Working</h1>
                <p className={'text-red-600'}>
                    If you see this page, the proxy.ts redirect to /funda failed.
                </p>
                <p className={'text-slate-500 text-sm'}>
                    Expected: URL should change to /funda
                </p>
            </div>
        </main>
    );
}

export default TestRedirectPage;
