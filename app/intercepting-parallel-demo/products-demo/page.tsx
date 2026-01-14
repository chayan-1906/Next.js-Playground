import Link from 'next/link';
import {Suspense} from "react";
import Image from "next/image";
import {FiShoppingBag} from 'react-icons/fi';
import {BASE_URL} from "@/lib/config";
import {Product} from "@/types/amazon";

async function getProducts(): Promise<Product[]> {
    const url = `${BASE_URL}/api/amazon?collection=general`;
    console.log('Fetching from:', url);
    const res: Response = await fetch(url);

    if (!res.ok) {
        throw new Error('Failed to fetch products');
    }

    const json = await res.json();
    return json.data as Product[];
}

async function ProductsDemo() {
    return (
        <Suspense fallback={<div>Loading products...</div>}>
            <ProductsWrapper/>
        </Suspense>
    )
}

async function ProductsWrapper() {
    const products: Product[] = await getProducts();

    return (
        <div className={'min-h-screen p-8 bg-linear-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900'}>
            <div className={'max-w-7xl mx-auto'}>
                {/* Header */}
                <div className={'mb-12 text-center'}>
                    <div className={'flex items-center justify-center mb-4'}>
                        <FiShoppingBag className={'size-12 text-blue-600 dark:text-blue-400'}/>
                    </div>
                    <h1 className={'text-4xl font-bold text-gray-900 dark:text-white mb-4'}>
                        Product Store
                    </h1>
                    <p className={'text-gray-600 dark:text-gray-400 max-w-2xl mx-auto'}>
                        Click any product to see modal with <strong>parallel slots</strong> (@details, @reviews, @related).
                        Refresh or visit URL directly to see full page view with same slots!
                    </p>
                </div>

                {/* Product Grid */}
                <div className={'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'}>
                    {products.map(({_id, data: {asin, image, title, price, category}}) => (
                        <Link key={_id} href={`/intercepting-parallel-demo/products-demo/products/${_id}`} className={'group'}>
                            <div
                                className={'h-full p-6 bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300 hover:-translate-y-1'}>
                                {/* Product Image */}
                                <div className={'flex justify-center mb-4 h-60'}>
                                    <Image src={image} alt={asin} height={200} width={200} className={'object-contain'}/>
                                </div>

                                <div>
                                    {/* Category Badge */}
                                    <div className={'mb-3'}>
                                    <span className={'inline-block px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'}>
                                        {category}
                                    </span>
                                    </div>

                                    {/* Product Info */}
                                    <h3 className={'text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2'}>
                                        {title}
                                    </h3>
                                    <p className={'text-2xl font-bold text-blue-600 dark:text-blue-400'}>
                                        {price}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Instructions */}
                <div className={'mt-12 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800'}>
                    <h3 className={'text-lg font-bold text-blue-900 dark:text-blue-100 mb-3'}>
                        🎯 What to observe:
                    </h3>
                    <ul className={'space-y-2 text-blue-800 dark:text-blue-200'}>
                        <li className={'flex items-start'}>
                            <span className={'mr-2'}>•</span>
                            <span><strong>Click a product:</strong> Opens modal with @details, @reviews, @related slots</span>
                        </li>
                        <li className={'flex items-start'}>
                            <span className={'mr-2'}>•</span>
                            <span><strong>Direct visit/refresh:</strong> Shows full page with same 3 slots (different layout)</span>
                        </li>
                        <li className={'flex items-start'}>
                            <span className={'mr-2'}>•</span>
                            <span><strong>Each slot loads independently</strong> with its own loading state</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default ProductsDemo;
