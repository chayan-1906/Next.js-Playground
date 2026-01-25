import {Suspense} from "react";
import {BASE_URL} from "@/lib/config";

async function DataFetcher1() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <DataFetcher1Wrapper/>
        </Suspense>
    );
}

async function DataFetcher1Wrapper() {
    const getTimestamp = async () => {
        console.log('Component 1 fetching...');
        const response: Response = await fetch(`${BASE_URL}/api/timestamp`);
        const res = await response.json();
        console.log(res);
        return res;
    }

    const response = await getTimestamp();

    return (
        <div className={'text-black'}>
            DataFetcher1 - {response?.timestamp}
        </div>
    );
}

export default DataFetcher1;
