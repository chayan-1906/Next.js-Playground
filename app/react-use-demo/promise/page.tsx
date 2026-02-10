import {ClientUsePromise} from "@/app/react-use-demo/promise/ClientUsePromise";

export interface User {
    id: number;
    name: string;
    username: string;
    phone: string;
}

function UsePromisePage() {
    const usersPromise: Promise<User[]> = fetch('https://jsonplaceholder.typicode.com/users').then((response: Response) => response.json());

    return (
        <div className={'min-h-screen bg-linear-to-br from-slate-50 to-slate-100 p-8'}>
            <div className={'max-w-4xl mx-auto space-y-8'}>
                {/* Header */}
                <div className={'text-center space-y-4'}>
                    <h1 className={'text-4xl font-bold text-slate-900'}>
                        {'use(Promise) Demo'}
                    </h1>
                    <p className={'text-lg text-slate-600 max-w-2xl mx-auto'}>
                        {'A Server Component creates a promise and passes it to a Client Component, which unwraps it with use()'}
                    </p>
                </div>

                {/* Info Box */}
                <div className={'bg-blue-50 border border-blue-200 rounded-xl p-6'}>
                    <p className={'text-blue-900 font-medium mb-2'}>{'How this pattern works'}</p>
                    <p className={'text-blue-800 text-sm'}>
                        {'This Server Component initiates a fetch to jsonplaceholder.typicode.com and passes the pending promise as a prop to ClientUsePromise. The client component calls use(promise) inside a Suspense boundary, which suspends rendering until data is ready.'}
                    </p>
                </div>

                {/* Demo Content */}
                <ClientUsePromise usersPromise={usersPromise}/>
            </div>
        </div>
    );
}

export default UsePromisePage;
