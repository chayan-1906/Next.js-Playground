import React from "react";

const organization = {
    name: 'Microsoft',
    url: 'https://www.microsoft.com',
    logo: 'https://toppng.com/uploads/preview/microsoft-logo-png-2508x800-11735760436lseajmbytd.webp',
    description: 'To empower every person and every organization on the planet to achieve more.',
    sameAs: [
        'https://twitter.com/Microsoft',
        'https://www.linkedin.com/company/microsoft',
        'https://github.com/microsoft',
        'https://www.facebook.com/Microsoft',
    ],
};

const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: organization.name,
    url: organization.url,
    logo: organization.logo,
    description: organization.description,
    sameAs: organization.sameAs,
};

function JSONLdLayout({children}: { children: React.ReactNode; }) {
    return (
        <section className={'min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'}>
            <script
                type={'application/ld+json'}
                dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd).replace(/</g, '\\u003c')}}
            />
            <header className={'border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm'}>
                <div className={'max-w-4xl mx-auto px-6 py-4 flex items-center gap-3'}>
                    <div className={'w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center'}>
                        <span className={'text-white font-bold text-sm'}>{'{'}</span>
                    </div>
                    <span className={'text-slate-200 font-semibold'}>{'JSON-LD Demo'}</span>
                    <span className={'text-slate-500 text-sm'}>{'• Powered by '}{organization.name}</span>
                </div>
            </header>
            <main className={'max-w-4xl mx-auto px-6 py-8'}>
                {children}
            </main>
        </section>
    );
}

export default JSONLdLayout;
