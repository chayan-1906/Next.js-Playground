import {FiStar, FiUser} from "react-icons/fi";
import {Product} from "@/types/amazon";
import {getProduct} from "@/lib/queries/amazon.queries";

async function ProductReviewsContent({params}: { params: Promise<{ productId: string }> }) {
    // Simulate 3s delay for independent loading
    await new Promise(resolve => setTimeout(resolve, 3000));

    const {productId} = await params;
    const product: Product = await getProduct('general', productId);

    // Mock reviews data
    const reviews = [
        {
            id: 1,
            author: 'Sarah M.',
            rating: 5,
            date: '2 weeks ago',
            comment: 'Absolutely love this product! Exceeded my expectations',
            verified: true,
        },
        {
            id: 2,
            author: 'John D.',
            rating: 4,
            date: '1 month ago',
            comment: 'Great quality and fast shipping. Would recommend!',
            verified: true,
        },
        {
            id: 3,
            author: 'Emily R.',
            rating: 5,
            date: '2 months ago',
            comment: 'Perfect for my needs. Very satisfied with the purchase',
            verified: false
        },
    ];

    const averageRating: number = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

    return (
        <div className={'p-8 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg'}>
            <h2 className={'text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center justify-between'}>
                <span className={'flex items-center'}>
                    <FiStar className={'mr-3 text-yellow-500'}/>
                    Customer Reviews
                </span>
                <div className={'flex items-center gap-2'}>
                    <span className={'text-3xl font-bold text-yellow-500'}>{averageRating.toFixed(1)}</span>
                    <div className={'flex'}>
                        {[...Array(5)].map((_, i) => (
                            <FiStar key={i} className={`size-5 ${i < Math.round(averageRating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300 dark:text-gray-600'}`}/>
                        ))}
                    </div>
                </div>
            </h2>

            <div className={'space-y-6'}>
                {reviews.map(review => (
                    <div key={review.id} className={'p-6 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700'}>
                        {/* Review Header */}
                        <div className={'flex items-start justify-between mb-3'}>
                            <div className={'flex items-center gap-3'}>
                                <div className={'size-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center'}>
                                    <FiUser className={'text-blue-600 dark:text-blue-400'}/>
                                </div>
                                <div>
                                    <div className={'flex items-center gap-2'}>
                                        <p className={'font-bold text-gray-900 dark:text-white'}>{review.author}</p>
                                        {review.verified && (
                                            <span className={'text-xs px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full'}>
                                                Verified
                                            </span>
                                        )}
                                    </div>
                                    <p className={'text-sm text-gray-500 dark:text-gray-400'}>{review.date}</p>
                                </div>
                            </div>
                            {/* Rating Stars */}
                            <div className={'flex'}>
                                {[...Array(5)].map((_, i) => (
                                    <FiStar key={i} className={`size-4 ${i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300 dark:text-gray-600'}`}/>
                                ))}
                            </div>
                        </div>

                        {/* Review Comment */}
                        <p className={'text-gray-700 dark:text-gray-300 leading-relaxed'}>
                            {review.comment}
                        </p>
                    </div>
                ))}
            </div>

            {/* Review Summary */}
            <div className={'mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800'}>
                <p className={'text-sm text-blue-800 dark:text-blue-200'}>
                    <strong>{reviews.length} reviews</strong> for {product.data.title}
                </p>
            </div>
        </div>
    );
}

export {ProductReviewsContent};
