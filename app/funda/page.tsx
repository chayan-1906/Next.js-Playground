import Link from "next/link";
import {routes} from "@/lib/routes";

function FundaPage() {
    return (
        <div className={'max-w-4xl mx-auto flex flex-col p-6 gap-8'}>
            <div>
                <h1 className={'text-3xl font-bold text-gray-900'}>{'Funda'}</h1>
                <p className={'mt-1 text-gray-500'}>{'Explore linked profile data'}</p>
            </div>

            <div className={'grid gap-6 sm:grid-cols-2'}>
                <Link href={routes.fundaPeople} className={'group rounded-2xl bg-white shadow-md hover:shadow-xl transition-all p-6 border border-gray-100'}>
                    <div className={'size-12 rounded-xl bg-indigo-100 flex items-center justify-center mb-4 group-hover:bg-indigo-200 transition-colors'}>
                        <span className={'text-2xl'}>{'👤'}</span>
                    </div>
                    <h2 className={'text-xl font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors'}>
                        {'People'}
                    </h2>
                    <p className={'mt-2 text-gray-500 text-sm'}>
                        {'Browse professional profiles with skills, education, and career summaries'}
                    </p>
                    <div className={'mt-4 text-indigo-600 text-sm font-medium flex items-center gap-1'}>
                        <span>{'View profiles'}</span>
                        <span className={'group-hover:translate-x-1 transition-transform'}>{'→'}</span>
                    </div>
                </Link>

                <Link href={routes.fundaCompanies} className={'group rounded-2xl bg-white shadow-md hover:shadow-xl transition-all p-6 border border-gray-100'}>
                    <div className={'size-12 rounded-xl bg-emerald-100 flex items-center justify-center mb-4 group-hover:bg-emerald-200 transition-colors'}>
                        <span className={'text-2xl'}>{'🏢'}</span>
                    </div>
                    <h2 className={'text-xl font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors'}>
                        {'Companies'}
                    </h2>
                    <p className={'mt-2 text-gray-500 text-sm'}>
                        {'Discover organizations and their headquarters locations'}
                    </p>
                    <div className={'mt-4 text-emerald-600 text-sm font-medium flex items-center gap-1'}>
                        <span>{'View companies'}</span>
                        <span className={'group-hover:translate-x-1 transition-transform'}>{'→'}</span>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default FundaPage;
