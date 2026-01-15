import Link from "next/link";
import Image from "next/image";
import {FiShoppingBag} from "react-icons/fi";
import {routes} from "@/lib/routes";
import {Product} from "@/types/amazon";
import {getProducts} from "@/lib/queries/amazon.queries";

async function ProductRelatedContent({params}: { params: Promise<{ productId: string }> }) {
    // Simulate 4s delay for independent loading
    await new Promise(resolve => setTimeout(resolve, 4000));

    const {productId} = await params;
    const products: Product[] = await getProducts('general');

    // Filter out current product and get 3 random related products
    const relatedProducts: Product[] = products
        .filter((p: Product) => p._id !== productId)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);

    return (
        <div className={'p-8 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg'}>
            <h2 className={'text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center'}>
                <FiShoppingBag className={'mr-3 text-purple-600 dark:text-purple-400'}/>
                Related Products
            </h2>

            <div className={'grid grid-cols-1 sm:grid-cols-3 gap-6'}>
                {relatedProducts.map((product: Product) => {
                    const {_id, data: {asin, image, title, price, category}} = product;

                    return (
                        <Link key={_id} href={routes.productDemo(_id)} className={'group'}>
                            <div
                                className={'h-full p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-400 transition-all hover:shadow-lg'}>
                                {/* Product Image */}
                                <div className={'flex justify-center mb-3 h-32'}>
                                    <Image src={image} alt={title} width={120} height={120} className={'object-contain'}/>
                                </div>

                                {/* Category Badge */}
                                <div className={'mb-2'}>
                                    <span className={'inline-block px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200'}>
                                        {category}
                                    </span>
                                </div>

                                {/* Product Title */}
                                <h3 className={'text-sm font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors'}>
                                    {title}
                                </h3>

                                {/* Price */}
                                <p className={'text-lg font-bold text-purple-600 dark:text-purple-400'}>
                                    {price}
                                </p>
                            </div>
                        </Link>
                    );
                })}
            </div>

            {relatedProducts.length === 0 && (
                <div className={'text-center py-12'}>
                    <p className={'text-gray-500 dark:text-gray-400'}>No related products available</p>
                </div>
            )}
        </div>
    );
}

export {ProductRelatedContent};
