import Link from "next/link";
import {routes} from "@/lib/routes";

function StaticParamsDemoPage() {
    return (
        <div className={'container mx-auto px-4 py-8'}>
            <h1 className={'text-4xl font-bold mb-4'}>generateStaticParams & dynamicParams</h1>
            <p className={'text-lg text-gray-700 mb-6'}>
                This demo illustrates how to statically generate pages with dynamic routes using the{' '}
                <code className={'bg-gray-200 p-1 rounded'}>generateStaticParams</code> function.
                We will also explore how the{' '}
                <code className={'bg-gray-200 p-1 rounded'}>dynamicParams</code> export controls the behavior for routes that are not pre-generated at build time
            </p>

            <div className={'space-y-4'}>
                <h2 className={'text-2xl font-semibold'}>Test Cases</h2>
                <p>
                    In our example, we will pre-generate pages for products with IDs 1 through 5
                </p>
                <ul className={'list-disc list-inside space-y-2'}>
                    <li>
                        <Link href={routes.staticParamsProductDetailsDemo('1')} className={'text-blue-600 hover:underline'}>
                            Product 1 (Statically Generated)
                        </Link>
                    </li>
                    <li>
                        <Link href={routes.staticParamsProductDetailsDemo('2')} className={'text-blue-600 hover:underline'}>
                            Product 2 (Statically Generated)
                        </Link>
                    </li>
                    <li>
                        <Link href={routes.staticParamsProductDetailsDemo('7')} className={'text-red-600 hover:underline'}>
                            Product 7 (Not Statically Generated)
                        </Link>
                    </li>
                </ul>
                <p className={'mt-4 text-gray-600'}>
                    Clicking the links for products 1 or 3 should be instant, as they are pre-built
                    <br/>
                    The behavior of the &quot;Product 100&quot; link will depend on our{' '}
                    <code className={'bg-gray-200 p-1 rounded'}>dynamicParams</code> setting
                </p>
            </div>
        </div>
    );
}

export default StaticParamsDemoPage;