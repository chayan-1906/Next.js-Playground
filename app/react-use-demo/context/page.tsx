"use client";

import {use, useCallback, useState} from "react";
import {ThemeContext, ThemeProvider} from "@/contexts/ThemeContext";

function UseContextPage() {
    return (
        <ThemeProvider>
            <UseContextWrapper/>
        </ThemeProvider>
    );
}

function UseContextWrapper() {
    const {theme, setTheme} = use(ThemeContext);
    const [show, setShow] = useState<boolean>(true);

    const toggleTheme = useCallback(() => {
        if (theme === 'light') setTheme('dark');
        else setTheme('light');
    }, [theme, setTheme]);

    const toggleShow = useCallback(() => {
        setShow((prev: boolean) => !prev);
    }, []);

    return (
        <div className={'min-h-screen bg-linear-to-br from-slate-50 to-slate-100 p-8'}>
            <div className={'max-w-4xl mx-auto space-y-8'}>
                {/* Header */}
                <div className={'text-center space-y-4'}>
                    <h1 className={'text-4xl font-bold text-slate-900'}>
                        {'use(Context) Demo'}
                    </h1>
                    <p className={'text-lg text-slate-600 max-w-2xl mx-auto'}>
                        {'Read context conditionally with use() — unlike useContext, it can be called inside if-blocks'}
                    </p>
                </div>

                {/* Info Box */}
                <div className={'bg-blue-50 border border-blue-200 rounded-xl p-6'}>
                    <p className={'text-blue-900 font-medium mb-2'}>{'What this demo shows'}</p>
                    <p className={'text-blue-800 text-sm'}>
                        {'The ThemedBox component calls use(ThemeContext) inside an if-block — something impossible with useContext. Toggle the "show" prop to see how use() handles conditional context reading.'}
                    </p>
                </div>

                {/* Main Demo Card */}
                <div className={'bg-white rounded-xl shadow-lg p-8 border border-slate-200'}>
                    <h2 className={'text-2xl font-semibold text-slate-900 mb-6'}>
                        {'Interactive Demo'}
                    </h2>

                    {/* Themed Box Display */}
                    <div className={'mb-6'}>
                        <ThemedBox show={show}/>
                    </div>

                    {/* Controls */}
                    <div className={'flex flex-wrap gap-4'}>
                        <button
                            onClick={toggleTheme}
                            className={'px-6 py-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold shadow-md transition-colors duration-200'}
                        >
                            {'Toggle Theme'}
                        </button>
                        <button
                            onClick={toggleShow}
                            className={'px-6 py-3 rounded-lg bg-slate-600 hover:bg-slate-700 text-white font-semibold shadow-md transition-colors duration-200'}
                        >
                            {show ? 'Hide ThemedBox' : 'Show ThemedBox'}
                        </button>
                    </div>
                </div>

                {/* Key Learning */}
                <div className={'bg-amber-50 border border-amber-200 rounded-xl p-6'}>
                    <h3 className={'text-lg font-semibold text-amber-900 mb-3'}>
                        {'Key Learning'}
                    </h3>
                    <div className={'space-y-2 text-amber-800'}>
                        <p>
                            <strong>{'Conditional context:'}</strong>{' use(ThemeContext) is called inside an if-block in ThemedBox. This is valid because use() is not bound by the Rules of Hooks.'}
                        </p>
                        <p>
                            <strong>{'With useContext:'}</strong>{' The same pattern would cause a React error — hooks cannot be called conditionally.'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ThemedBox({show}: { show: boolean; }) {
    if (show) {
        const {theme} = use(ThemeContext);

        return (
            <div className={`rounded-xl p-6 border-2 transition-all duration-300 ${
                theme === 'dark'
                    ? 'bg-slate-800 border-slate-600 text-white'
                    : 'bg-white border-slate-200 text-slate-900'
            }`}>
                <div className={'flex items-center gap-3'}>
                    <div className={`w-4 h-4 rounded-full ${
                        theme === 'dark' ? 'bg-indigo-400' : 'bg-amber-400'
                    }`}/>
                    <span className={'text-lg font-medium'}>
                        {'Current theme: '}<code className={`px-2 py-1 rounded text-sm font-mono ${
                            theme === 'dark' ? 'bg-slate-700' : 'bg-slate-100'
                        }`}>{theme}</code>
                    </span>
                </div>
            </div>
        );
    }

    return (
        <div className={'rounded-xl p-6 border-2 border-dashed border-slate-300 bg-slate-50 text-slate-400 text-center'}>
            {'ThemedBox is hidden — use() is not called'}
        </div>
    );
}

export default UseContextPage;
