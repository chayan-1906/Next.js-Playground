"use client";

import {useState} from "react";

type ClientReadCookiesProps = {
    sessionTokenExists: boolean;
};

type ParsedCookie = {
    name: string;
    value: string;
};

function ClientReadCookies({sessionTokenExists}: ClientReadCookiesProps) {
    const [clientCookies, setClientCookies] = useState<ParsedCookie[] | null>(null);

    const parseCookies = (): ParsedCookie[] => {
        const cookieString = document.cookie;
        if (!cookieString) return [];

        return cookieString.split('; ').map(cookie => {
            const [name, ...valueParts] = cookie.split('=');
            return {
                name: name,
                value: valueParts.join('='),
            };
        });
    };

    const handleReadCookies = () => {
        const cookies = parseCookies();
        setClientCookies(cookies);
    };

    const hasSessionToken = clientCookies?.some(c => c.name === 'session-token');

    return (
        <div className={'bg-white rounded-xl shadow-lg p-6 border border-slate-200'}>
            <div className={'flex items-center gap-2 mb-4'}>
                <div className={'w-3 h-3 bg-orange-500 rounded-full animate-pulse'}></div>
                <h2 className={'text-xl font-semibold text-slate-900'}>
                    Client Component
                </h2>
            </div>
            <p className={'text-sm text-slate-600 mb-4'}>
                Client can only read cookies WITHOUT HttpOnly flag
            </p>

            <button
                onClick={handleReadCookies}
                className={'w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold px-4 py-3 rounded-lg shadow-md transition-colors duration-200 mb-4'}
            >
                Read document.cookie
            </button>

            {clientCookies !== null && (
                <div className={'space-y-2'}>
                    {clientCookies.length === 0 ? (
                        <p className={'text-slate-400 text-sm italic'}>No cookies accessible to JavaScript</p>
                    ) : (
                        clientCookies.map((cookie, idx) => (
                            <div
                                key={idx}
                                className={'p-3 rounded-lg border bg-slate-50 border-slate-200'}
                            >
                                <div className={'flex items-center justify-between mb-1'}>
                                    <span className={'font-medium text-slate-900 text-sm'}>
                                        {cookie.name}
                                    </span>
                                    <span className={'bg-slate-600 text-white text-xs px-2 py-1 rounded'}>
                                        Regular
                                    </span>
                                </div>
                                <p className={'text-xs text-slate-600 font-mono break-all'}>
                                    {cookie.value.substring(0, 50)}{cookie.value.length > 50 ? '...' : ''}
                                </p>
                            </div>
                        ))
                    )}

                    <div className={'mt-4 pt-4 border-t border-slate-200'}>
                        <p className={'text-xs text-slate-500'}>
                            Total cookies visible: <span className={'font-semibold'}>{clientCookies.length}</span>
                        </p>
                    </div>

                    {/* HttpOnly Cookie Warning */}
                    {sessionTokenExists && !hasSessionToken && (
                        <div className={'mt-4 bg-red-50 border border-red-300 rounded-lg p-4'}>
                            <div className={'flex items-start gap-2'}>
                                <span className={'text-red-600 text-xl'}>🚫</span>
                                <div>
                                    <p className={'text-red-900 font-medium text-sm mb-1'}>
                                        HttpOnly Cookie Blocked!
                                    </p>
                                    <p className={'text-red-800 text-xs'}>
                                        <code className={'bg-red-100 px-1 rounded'}>session-token</code> exists but is invisible to JavaScript. This is the security feature working!
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {clientCookies === null && (
                <div className={'text-center py-8 text-slate-400 text-sm'}>
                    Click the button above to read cookies from JavaScript
                </div>
            )}
        </div>
    );
}

export {ClientReadCookies};
