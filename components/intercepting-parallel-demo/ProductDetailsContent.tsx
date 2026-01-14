import Image from "next/image";
import {FiPackage, FiTag} from "react-icons/fi";
import {getProduct} from "@/lib/queries/amazon.queries";

async function ProductDetailsContent({params}: { params: Promise<{ productId: string }> }) {
    await new Promise(resolve => setTimeout(resolve, 2000));

    const {productId} = await params;
    const product = await getProduct('general', productId);
    const {asin, image, title, price, category} = product.data;

    return (
        <div className={'p-8 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg'}>
            <h2 className={'text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center'}>
                <FiPackage className={'mr-3 text-blue-600 dark:text-blue-400'}/>
                Product Details
            </h2>

            <div className={'grid md:grid-cols-2 gap-8'}>
                {/* Product Image */}
                <div className={'flex justify-center items-start'}>
                    <Image src={image} alt={title} width={400} height={400} className={'object-contain rounded-xl border border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-900'}/>
                </div>

                {/* Product Info */}
                <div className={'space-y-6'}>
                    {/* Category Badge */}
                    <div className={'flex items-center gap-2'}>
                        <FiTag className={'text-blue-600 dark:text-blue-400'}/>
                        <span className={'inline-block px-4 py-2 text-sm font-semibold rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'}>
                            {category}
                        </span>
                    </div>

                    {/* Product Title */}
                    <h3 className={'text-3xl font-bold text-gray-900 dark:text-white'}>
                        {title}
                    </h3>

                    {/* Price */}
                    <div className={'pt-4 border-t border-gray-200 dark:border-gray-700'}>
                        <p className={'text-sm text-gray-500 dark:text-gray-400 mb-1'}>Price</p>
                        <p className={'text-4xl font-bold text-blue-600 dark:text-blue-400'}>
                            {price}
                        </p>
                    </div>

                    {/* ASIN */}
                    <div className={'pt-4 border-t border-gray-200 dark:border-gray-700'}>
                        <p className={'text-sm text-gray-500 dark:text-gray-400 mb-1'}>Product ID (ASIN)</p>
                        <p className={'text-lg font-mono text-gray-900 dark:text-white'}>
                            {asin}
                        </p>
                    </div>

                    {/* Description */}
                    <div className={'pt-4 border-t border-gray-200 dark:border-gray-700'}>
                        <p className={'text-sm text-gray-500 dark:text-gray-400 mb-2'}>Description</p>
                        <p className={'text-gray-700 dark:text-gray-300 leading-relaxed'}>
                            This is a high-quality {category.toLowerCase()} product that meets all your needs.
                            Perfect for daily use and comes with excellent features and reliability.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export {ProductDetailsContent};
