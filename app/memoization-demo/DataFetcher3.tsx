import {Suspense} from "react";
import {BASE_URL} from "@/lib/config";

async function DataFetcher3() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <DataFetcher3Wrapper/>
        </Suspense>
    );
}

async function DataFetcher3Wrapper() {
    const getTimestamp = async () => {
        console.log('Component 3 fetching...');
        const response: Response = await fetch(`${BASE_URL}/api/timestamp?id=123`);
        const res = await response.json();
        console.log(res);
        return res;
    }

    const response = await getTimestamp();

    return (
        <div className={'text-black'}>
            DataFetcher3 - {response?.timestamp}
        </div>
    );
}

export default DataFetcher3;
