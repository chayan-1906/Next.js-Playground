import {Suspense} from "react";
import {getProducts} from "@/lib/queries/products.queries";
import {ClientErrorButton} from "@/app/error-demo/ClientErrorButton";

async function ErrorDemoPage({searchParams}: { searchParams?: { [key: string]: string | string[] | undefined }; }) {
    return (
        <Suspense>
            <ErrorDemoPageWrapper searchParams={searchParams}/>
        </Suspense>
    );
}

async function ErrorDemoPageWrapper({searchParams}: { searchParams?: { [key: string]: string | string[] | undefined }; }) {
    const {error} = await searchParams || {};
    const data = await getProducts();

    const throwError = async () => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        throw new Error('Error occurred in ErrorDemoPage');
    }

    if (error) await throwError();
    else return (
        <div className={'flex flex-col items-center justify-center min-h-screen gap-6 bg-gray-100'}>
            <div className={'bg-white p-8 rounded-lg shadow-md max-w-md w-full max-h-60 overflow-auto'}>
                <p className={'text-indigo-400'}>{JSON.stringify(data)}</p>
            </div>

            <div className={'bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center'}>
                <h1 className={'text-2xl text-red-600 font-bold mb-4'}>Error Handling Demo</h1>
                <p className={'text-gray-700 mb-6'}>
                    Click the button below to trigger a client-side error.
                </p>
                <ClientErrorButton/>
            </div>
        </div>
    );
}

export default ErrorDemoPage;
