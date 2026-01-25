import {Suspense} from "react";
import {BASE_URL} from "@/lib/config";

async function DataFetcher2() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <DataFetcher2Wrapper/>
        </Suspense>
    );
}

async function DataFetcher2Wrapper() {
    const getTimestamp = async () => {
        console.log('Component 2 fetching...');
        const response: Response = await fetch(`${BASE_URL}/api/timestamp`);
        const res = await response.json();
        console.log(res);
        return res;
    }

    const response = await getTimestamp();

    return (
        <div className={'text-black'}>
            DataFetcher2 - {response?.timestamp}
        </div>
    );
}

export default DataFetcher2;
