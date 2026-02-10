"use client";

import {Suspense, use} from "react";
import {User} from "@/app/react-use-demo/promise/page";

function ClientUsePromise({usersPromise}: { usersPromise: Promise<User[]>; }) {
    return (
        <Suspense fallback={
            <div className={'bg-white rounded-xl shadow-lg p-8 border border-slate-200'}>
                <div className={'flex flex-col items-center justify-center py-12 space-y-4'}>
                    <div className={'w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin'}/>
                    <p className={'text-slate-500 font-medium'}>{'Loading users...'}</p>
                </div>
            </div>
        }>
            <ClientUsePromiseWrapper usersPromise={usersPromise}/>
        </Suspense>
    );
}

function ClientUsePromiseWrapper({usersPromise}: { usersPromise: Promise<User[]>; }) {
    const users: User[] = use(usersPromise);

    return (
        <div className={'space-y-6'}>
            {/* User Cards */}
            <div className={'bg-white rounded-xl shadow-lg p-8 border border-slate-200'}>
                <h2 className={'text-2xl font-semibold text-slate-900 mb-6'}>
                    {'Users'}<span className={'text-sm font-normal text-slate-500 ml-2'}>{'('}{users.length}{' loaded)'}</span>
                </h2>
                <div className={'grid sm:grid-cols-2 gap-4'}>
                    {users.map((user: User) => (
                        <div key={user.id} className={'bg-slate-50 rounded-xl shadow-md p-4 border border-slate-200 hover:border-blue-300 transition-colors duration-200'}>
                            <h3 className={'text-lg font-semibold text-slate-900 mb-2'}>
                                {user.name}
                            </h3>
                            <div className={'space-y-1 text-sm text-slate-600'}>
                                <p>
                                    <span className={'font-medium text-slate-700'}>{'Username: '}</span>
                                    <code className={'bg-slate-100 px-1.5 py-0.5 rounded text-slate-800'}>{user.username}</code>
                                </p>
                                <p>
                                    <span className={'font-medium text-slate-700'}>{'Phone: '}</span>
                                    {user.phone}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Educational Note */}
            <div className={'bg-amber-50 border border-amber-200 rounded-xl p-6'}>
                <h3 className={'text-lg font-semibold text-amber-900 mb-3'}>
                    {'Key Learning'}
                </h3>
                <div className={'space-y-2 text-amber-800'}>
                    <p>
                        <strong>{'Suspense integration:'}</strong>{' use(promise) automatically suspends this component until the promise resolves, showing the loading fallback above.'}
                    </p>
                    <p>
                        <strong>{'Server to Client:'}</strong>{' The promise was created in a Server Component and passed as a prop — use() unwraps it on the client without useEffect or useState.'}
                    </p>
                </div>
            </div>
        </div>
    );
}

export {ClientUsePromise};
