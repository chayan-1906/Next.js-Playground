"use client";

import Script from "next/script";
import {RestaurantMap} from "@/app/script-demo/RestaurantMap";

function ScriptDemo() {
    return (
        <div className={'p-8 max-w-4xl mx-auto'}>
            <h1 className={'text-3xl font-bold mb-6'}>Next.js Script Component Demo</h1>

            <p className={'mb-4 text-gray-500'}>Open your browser DevTools → Console and Network tab to see the load order of scripts</p>

            {/* afterInteractive: Default strategy - loads after page is interactive */}
            <Script
                src={'/scripts/after-interactive.js'}
                strategy={'afterInteractive'}
                id={'after-interactive-script'}
                onLoad={() => console.log('[CALLBACK] afterInteractive onLoad fired')}
            />

            {/* lazyOnload: Loads during browser idle time */}
            <Script
                src={'/scripts/lazy-onload.js'}
                strategy={'lazyOnload'}
                id={'lazy-onload-script'}
                onLoad={() => console.log('[CALLBACK] lazyOnload onLoad fired')}
            />

            {/* Google Analytics with afterInteractive (recommended by Next.js) */}
            <Script
                src={'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID'}
                strategy={'afterInteractive'}
                id={'google-analytics'}
                onLoad={() => console.log('[CALLBACK] Google Analytics script loaded')}
            />
            <Script id={'google-analytics-init'} strategy={'afterInteractive'}>
                {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'GA_MEASUREMENT_ID');
          console.log('[SCRIPT] Google Analytics initialized');
        `}
            </Script>

            <div className={'space-y-6'}>
                {/* Strategy Documentation */}
                <section className={'bg-pink-50 dark:bg-pink-900 p-6 rounded-lg'}>
                    <h2 className={'text-xl font-semibold mb-3'}>
                        1. beforeInteractive
                    </h2>
                    <p className={'mb-2'}>
                        <strong>When it loads:</strong> Before ANY Next.js code, before page
                        hydration
                    </p>
                    <p className={'mb-2'}>
                        <strong>Where to use:</strong> Only in root <code>layout.tsx</code>
                    </p>
                    <p className={'mb-2'}>
                        <strong>Use cases:</strong>
                    </p>
                    <ul className={'list-disc list-inside ml-4'}>
                        <li>Bot detectors</li>
                        <li>Cookie consent managers</li>
                        <li>Critical polyfills</li>
                        <li>Scripts that MUST run before React hydrates</li>
                    </ul>
                    <p className={'mt-2 text-pink-400 font-bold'}>Warning: Blocks page loading - use sparingly!</p>
                </section>

                <section className={'bg-green-50 dark:bg-green-900 p-6 rounded-lg'}>
                    <h2 className={'text-xl font-semibold mb-3'}>
                        2. afterInteractive (Default)
                    </h2>
                    <p className={'mb-2'}>
                        <strong>When it loads:</strong> After page becomes interactive
                        (hydration complete)
                    </p>
                    <p className={'mb-2'}>
                        <strong>Where to use:</strong> Any page or layout
                    </p>
                    <p className={'mb-2'}>
                        <strong>Use cases:</strong>
                    </p>
                    <ul className={'list-disc list-inside ml-4'}>
                        <li>Analytics (Google Analytics, Mixpanel)</li>
                        <li>Tag managers</li>
                        <li>Social media widgets</li>
                        <li>Chat widgets that should load early</li>
                    </ul>
                    <p className={'mt-2 text-green-600 font-bold'}>
                        Recommended for most third-party scripts
                    </p>
                </section>

                <section className={'bg-yellow-50 dark:bg-yellow-900 p-6 rounded-lg'}>
                    <h2 className={'text-xl font-semibold mb-3'}>3. lazyOnload</h2>
                    <p className={'mb-2'}>
                        <strong>When it loads:</strong> During browser idle time (after
                        everything else)
                    </p>
                    <p className={'mb-2'}>
                        <strong>Where to use:</strong> Any page or layout
                    </p>
                    <p className={'mb-2'}>
                        <strong>Use cases:</strong>
                    </p>
                    <ul className={'list-disc list-inside ml-4'}>
                        <li>Chat support widgets</li>
                        <li>Social media share buttons</li>
                        <li>Non-critical tracking scripts</li>
                        <li>Any script that can wait</li>
                    </ul>
                    <p className={'mt-2 text-yellow-500 font-bold'}>
                        Best for non-critical scripts - improves initial page performance
                    </p>
                </section>

                {/* Testing Instructions */}
                <section className={'bg-gray-100 dark:bg-gray-900 p-6 rounded-lg'}>
                    <h2 className={'text-xl font-semibold mb-3'}>Testing Instructions</h2>
                    <ol className={'list-decimal list-inside space-y-2'}>
                        <li>Open DevTools (F12 or Cmd+Option+I)</li>
                        <li>Go to Console tab - see load order logs</li>
                        <li>Go to Network tab → filter by JS</li>
                        <li>Hard refresh (Cmd+Shift+R) to see fresh load</li>
                        <li>
                            Notice the timing differences:
                            <ul className={'list-disc list-inside ml-6 mt-1'}>
                                <li>
                                    <code>beforeInteractive</code> - earliest timestamp
                                </li>
                                <li>
                                    <code>afterInteractive</code> - after hydration
                                </li>
                                <li>
                                    <code>lazyOnload</code> - latest timestamp
                                </li>
                            </ul>
                        </li>
                    </ol>
                </section>

                {/* Quick Reference */}
                <section className={'bg-purple-50 dark:bg-purple-900 p-6 rounded-lg'}>
                    <h2 className={'text-xl font-semibold mb-3'}>Quick Reference</h2>
                    <table className={'w-full text-sm'}>
                        <thead>
                        <tr className={'border-b'}>
                            <th className={'text-left py-2'}>Strategy</th>
                            <th className={'text-left py-2'}>Priority</th>
                            <th className={'text-left py-2'}>Blocks?</th>
                            <th className={'text-left py-2'}>Location</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr className={'border-b'}>
                            <td className={'py-2'}>beforeInteractive</td>
                            <td>Highest</td>
                            <td>Yes</td>
                            <td>Root layout only</td>
                        </tr>
                        <tr className={'border-b'}>
                            <td className={'py-2'}>afterInteractive</td>
                            <td>Medium</td>
                            <td>No</td>
                            <td>Anywhere</td>
                        </tr>
                        <tr>
                            <td className={'py-2'}>lazyOnload</td>
                            <td>Lowest</td>
                            <td>No</td>
                            <td>Anywhere</td>
                        </tr>
                        </tbody>
                    </table>
                </section>
            </div>

            <RestaurantMap/>
        </div>
    );
}

export default ScriptDemo;
