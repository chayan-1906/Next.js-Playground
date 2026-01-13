"use client";

import React from "react";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {routes} from "@/lib/routes";

type SettingsLayoutProps = {
    children: React.ReactNode;
    account: React.ReactNode;
    billing: React.ReactNode;
    notifications: React.ReactNode;
};

const TABS = [
    {name: 'Profile', href: routes.settingsProfileDemo, slot: 'account'},
    {name: 'Security', href: routes.settingsSecurityDemo, slot: 'account'},
    {name: 'Payment', href: routes.settingsPaymentDemo, slot: 'billing'},
    {name: 'Invoices', href: routes.settingsInvoicesDemo, slot: 'billing'},
    {name: 'Notifications', href: routes.settingsPreferencesDemo, slot: 'notifications'},
];

function SettingsLayout({children, account, billing, notifications}: SettingsLayoutProps) {
    const pathname = usePathname();

    return (
        <div className={'min-h-screen bg-gray-50 dark:bg-gray-950 p-8'}>
            <div className={'max-w-7xl mx-auto'}>
                {/* Header */}
                <header className={'mb-8'}>
                    <h1 className={'text-3xl font-bold text-gray-900 dark:text-white mb-2'}>
                        Settings
                    </h1>
                    <p className={'text-gray-600 dark:text-gray-400'}>
                        Manage your account, billing, and notification preferences
                    </p>
                </header>

                {/* Tab Navigation */}
                <div className={'mb-8 border-b border-gray-200 dark:border-gray-800'}>
                    <nav className={'flex space-x-8 overflow-x-auto'}>
                        {TABS.map((tab) => {
                            const isActive = pathname === tab.href;
                            return (
                                <Link
                                    key={tab.href}
                                    href={tab.href}
                                    className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors duration-200 ${
                                        isActive
                                            ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                                    }`}>
                                    {tab.name}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* Main Content */}
                {children && (
                    <div className={'mb-8'}>
                        {children}
                    </div>
                )}

                {/* Slots Grid */}
                <div className={'grid grid-cols-1 lg:grid-cols-3 gap-6'}>
                    {/* Account Slot */}
                    <div className={'lg:col-span-1'}>
                        <div className={'mb-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider'}>
                            Account Slot
                        </div>
                        {account}
                    </div>

                    {/* Billing Slot */}
                    <div className={'lg:col-span-1'}>
                        <div className={'mb-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider'}>
                            Billing Slot
                        </div>
                        {billing}
                    </div>

                    {/* Notifications Slot */}
                    <div className={'lg:col-span-1'}>
                        <div className={'mb-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider'}>
                            Notifications Slot
                        </div>
                        {notifications}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SettingsLayout;
