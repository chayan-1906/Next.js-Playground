import Link from "next/link";
import {redirect} from 'next/navigation';
import {routes} from "@/lib/routes";

function RedirectDemoPage() {
    async function submitForm(formData: FormData) {
        'use server';

        const name = formData.get('name');
        console.log('Form submitted with name:', name);

        // Simulate processing
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Redirect after processing
        redirect(routes.funda);
    }

    return (
        <div className={'px-4'}>
            <h1 className={'text-yellow-300 text-2xl font-bold my-4 text-center'}>Redirect Demo</h1>

            <div className={'flex justify-center items-center gap-4 mt-8'}>
                <Link href={routes.serverRedirect}>
                    <button className={'w-full px-4 py-3 rounded-xl bg-sky-600 hover:bg-sky-800 transition text-white font-medium cursor-pointer'}>
                        Server Redirect
                    </button>
                </Link>
                <Link href={routes.clientRedirect}>
                    <button className={'w-full px-4 py-3 rounded-xl bg-green-700 hover:bg-green-900 transition text-white font-medium cursor-pointer'}>
                        Client Navigation
                    </button>
                </Link>
            </div>

            <div className={'px-4'}>
                <h1 className={'text-purple-400 text-2xl font-bold my-4 text-center'}>
                    Server Action Redirect (303)
                </h1>
                <form action={submitForm} className={'flex flex-col gap-4 max-w-md mx-auto mt-8'}>
                    <input type={'text'} name={'name'} placeholder={'Enter your name'} className={'px-4 py-2 rounded border'}/>
                    <button type={'submit'} className={'px-4 py-3 rounded-xl bg-purple-600 hover:bg-purple-800 transition text-white font-medium'}>
                        Submit Form (Watch for 303!)
                    </button>
                </form>
            </div>
        </div>
    );
}

export default RedirectDemoPage;
