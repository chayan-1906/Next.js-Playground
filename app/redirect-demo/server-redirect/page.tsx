import {Suspense} from "react";
import {permanentRedirect} from "next/navigation";
import {routes} from "@/lib/routes";

async function ServerRedirectDemo() {
    return (
        <Suspense>
            <ServerRedirectDemoWrapper/>
        </Suspense>
    );
}

async function ServerRedirectDemoWrapper() {
    await new Promise(resolve => setTimeout(resolve, 3000));
    // redirect(routes.funda);
    permanentRedirect(routes.funda);

    return (
        <div className={'px-4'}>
            <h1 className={'text-yellow-300 text-2xl font-bold my-4 text-center'}>Server Redirect</h1>
            <p className={'text-center text-lg'}>Redirecting you in 3 seconds...</p>
        </div>
    );
}

export default ServerRedirectDemo;
