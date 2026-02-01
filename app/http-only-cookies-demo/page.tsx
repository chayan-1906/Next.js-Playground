import {Suspense} from "react";
import {cookies} from "next/headers";
import {setHttpOnlyCookies} from "@/lib/actions/cookie-actions";
import {ClientReadCookies} from "@/app/http-only-cookies-demo/ClientReadCookies";

async function HttpOnlyCookiesDemo() {
    return (
        <Suspense fallback={
            <div className={'min-h-screen flex items-center justify-center'}>
                <div className={'text-gray-500'}>Loading...</div>
            </div>
        }>
            <HttpOnlyCookiesWrapper/>
        </Suspense>
    );
}

async function HttpOnlyCookiesWrapper() {
    const cookieStore = await cookies();
    const allCookies = cookieStore.getAll();
    const sessionToken = allCookies.find(c => c.name === 'session-token');

    return (
        <div className={'min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8'}>
            <div className={'max-w-6xl mx-auto space-y-8'}>
                {/* Header */}
                <div className={'text-center space-y-4'}>
                    <h1 className={'text-4xl font-bold text-slate-900'}>
                        🔒 HTTP-only Cookies Demo
                    </h1>
                    <p className={'text-lg text-slate-600 max-w-2xl mx-auto'}>
                        Explore how HttpOnly cookies prevent client-side JavaScript access while remaining accessible to the server
                    </p>
                </div>

                {/* Set Cookie Section */}
                <div className={'bg-white rounded-xl shadow-lg p-8 border border-slate-200'}>
                    <div className={'flex items-start justify-between gap-6'}>
                        <div className={'flex-1 space-y-3'}>
                            <h2 className={'text-2xl font-semibold text-slate-900'}>
                                Step 1: Set HttpOnly Cookie
                            </h2>
                            <p className={'text-slate-600'}>
                                Click the button to create a secure session cookie with the <code className={'bg-slate-100 px-2 py-1 rounded text-sm'}>httpOnly</code> flag
                            </p>
                            <div className={'bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm'}>
                                <p className={'text-blue-900 font-medium mb-2'}>Security Attributes:</p>
                                <ul className={'text-blue-800 space-y-1 ml-4'}>
                                    <li>✓ <code>httpOnly: true</code> - Blocks JavaScript access</li>
                                    <li>✓ <code>secure: true</code> - HTTPS only</li>
                                    <li>✓ <code>sameSite: strict</code> - CSRF protection</li>
                                    <li>✓ <code>maxAge: 1 day</code> - Auto-expiration</li>
                                </ul>
                            </div>
                        </div>
                        <form action={setHttpOnlyCookies}>
                            <button
                                type={'submit'}
                                className={'bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-colors duration-200'}
                            >
                                Set Cookie
                            </button>
                        </form>
                    </div>

                    {sessionToken && (
                        <div className={'mt-6 bg-green-50 border border-green-200 rounded-lg p-4'}>
                            <p className={'text-green-900 font-medium mb-2'}>✓ Cookie Created Successfully!</p>
                            <p className={'text-green-800 text-sm font-mono'}>
                                session-token = {sessionToken.value}
                            </p>
                        </div>
                    )}
                </div>

                {/* Server vs Client Comparison */}
                <div className={'grid md:grid-cols-2 gap-6'}>
                    {/* Server Side */}
                    <div className={'bg-white rounded-xl shadow-lg p-6 border border-slate-200'}>
                        <div className={'flex items-center gap-2 mb-4'}>
                            <div className={'w-3 h-3 bg-green-500 rounded-full animate-pulse'}></div>
                            <h2 className={'text-xl font-semibold text-slate-900'}>
                                Server Component
                            </h2>
                        </div>
                        <p className={'text-sm text-slate-600 mb-4'}>
                            Server can read ALL cookies including HttpOnly ones
                        </p>

                        <div className={'space-y-2'}>
                            {allCookies.length === 0 ? (
                                <p className={'text-slate-400 text-sm italic'}>No cookies found</p>
                            ) : (
                                allCookies.map((cookie, idx) => (
                                    <div
                                        key={idx}
                                        className={`p-3 rounded-lg border ${
                                            cookie.name === 'session-token'
                                                ? 'bg-green-50 border-green-300'
                                                : 'bg-slate-50 border-slate-200'
                                        }`}
                                    >
                                        <div className={'flex items-center justify-between mb-1'}>
                                            <span className={'font-medium text-slate-900 text-sm'}>
                                                {cookie.name}
                                            </span>
                                            {cookie.name === 'session-token' && (
                                                <span className={'bg-green-600 text-white text-xs px-2 py-1 rounded'}>
                                                    HttpOnly
                                                </span>
                                            )}
                                        </div>
                                        <p className={'text-xs text-slate-600 font-mono break-all'}>
                                            {cookie.value.substring(0, 50)}{cookie.value.length > 50 ? '...' : ''}
                                        </p>
                                    </div>
                                ))
                            )}
                        </div>

                        <div className={'mt-4 pt-4 border-t border-slate-200'}>
                            <p className={'text-xs text-slate-500'}>
                                Total cookies visible: <span className={'font-semibold'}>{allCookies.length}</span>
                            </p>
                        </div>
                    </div>

                    {/* Client Side */}
                    <ClientReadCookies sessionTokenExists={!!sessionToken} />
                </div>

                {/* Educational Note */}
                <div className={'bg-amber-50 border border-amber-200 rounded-xl p-6'}>
                    <h3 className={'text-lg font-semibold text-amber-900 mb-3'}>
                        🎓 Key Learning
                    </h3>
                    <div className={'space-y-2 text-amber-800'}>
                        <p>
                            <strong>Server Component:</strong> Can read the <code className={'bg-amber-100 px-1 rounded'}>session-token</code> because it runs on the server and accesses cookies from HTTP headers.
                        </p>
                        <p>
                            <strong>Client Component:</strong> Cannot see <code className={'bg-amber-100 px-1 rounded'}>session-token</code> in <code className={'bg-amber-100 px-1 rounded'}>document.cookie</code> because the HttpOnly flag blocks JavaScript access.
                        </p>
                        <p className={'mt-3 text-sm'}>
                            💡 This prevents XSS attacks from stealing session tokens at scale!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HttpOnlyCookiesDemo;
