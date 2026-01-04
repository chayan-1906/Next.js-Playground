"use client";

import {useRouter} from "next/navigation";
import {routes} from "@/lib/routes";

function ClientRedirectDemo() {
    const router = useRouter();

    return (
        <div className={'px-4'}>
            <h1 className={'text-green-700 text-2xl font-bold my-4 text-center'}>Client Navigation</h1>
            <div className={'flex justify-center items-center mt-8'}>
                <button onClick={() => router.push(routes.funda)} className={'px-4 py-3 rounded-xl bg-green-700 hover:bg-green-900 transition text-white font-medium cursor-pointer'}>
                    Navigate to Funda
                </button>
            </div>
        </div>
    );
}

export default ClientRedirectDemo;
