"use client";

import React from "react";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {routes} from "@/lib/routes";

function MDXDemoLayout({children}: {children: React.ReactNode}) {
    const pathname: string = usePathname();
    const navLinks = [
        {href: routes.mdxDemo, label: 'Main Demo'},
        {href: routes.mdxWelcomeDemo, label: 'Blog: Welcome'},
        {href: routes.mdxAboutDemo, label: 'Blog: About'},
        {href: routes.mdxFeaturesDemo, label: 'Blog: Features'},
        {href: routes.mdxRemoteDemo, label: 'Remote MDX'},
    ];

    return (
        <div className={'min-h-screen bg-gray-50 dark:bg-gray-900'}>
            <nav className={'bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700'}>
                <div className={'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'}>
                    <div className={'flex items-center justify-between h-16'}>
                        <div className={'flex items-center gap-8'}>
                            <Link href={'/'} className={'text-lg font-semibold text-gray-900 dark:text-white'}>
                                ← Home
                            </Link>
                            <span className={'text-gray-400'}>|</span>
                            <span className={'text-sm font-medium text-gray-600 dark:text-gray-300'}>
                                MDX Playground
                            </span>
                        </div>
                    </div>
                </div>
            </nav>

            <div className={'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'}>
                <div className={'flex gap-8'}>
                    {/* Sidebar Navigation */}
                    <aside className={'w-64 shrink-0'}>
                        <div className={'sticky top-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4'}>
                            <h2 className={'text-sm font-semibold text-gray-900 dark:text-white mb-3'}>
                                Navigation
                            </h2>
                            <nav className={'space-y-1'}>
                                {navLinks.map((link) => {
                                    const isActive = pathname === link.href;
                                    
                                    return (
                                        <Link key={link.href} href={link.href} className={isActive ? 'block px-3 py-2 text-sm rounded-md bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 font-semibold transition-colors' : 'block px-3 py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors'}>
                                            {link.label}
                                        </Link>
                                    );
                                })}
                            </nav>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className={'flex-1 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8'}>
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}

export default MDXDemoLayout;
