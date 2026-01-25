import DataFetcher1 from "@/app/memoization-demo/DataFetcher1";
import DataFetcher2 from "@/app/memoization-demo/DataFetcher2";
import DataFetcher3 from "@/app/memoization-demo/DataFetcher3";

function MemoizationDemoPage() {
    return (
        <div className={'min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 p-8'}>
            <div className={'max-w-4xl mx-auto'}>
                <h1 className={'text-4xl font-bold text-gray-800 mb-4'}>
                    Request Memoization Demo
                </h1>
                <p className={'text-gray-600 mb-8'}>
                    Three components fetching identical data. Watch the server logs to see how many actual fetch calls are made!
                </p>

                <div className={'space-y-6'}>
                    <div className={'bg-white p-6 rounded-lg shadow-md'}>
                        <DataFetcher1/>
                    </div>

                    <div className={'bg-white p-6 rounded-lg shadow-md'}>
                        <DataFetcher2/>
                    </div>

                    <div className={'bg-white p-6 rounded-lg shadow-md'}>
                        <DataFetcher3/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MemoizationDemoPage;
