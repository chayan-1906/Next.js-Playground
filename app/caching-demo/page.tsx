import {getProducts, revalidateProducts} from "@/lib/actions/products.actions";

async function CachingDemo() {
    const {products, cachedAt} = await getProducts();

    return (
        <div className={'max-w-7xl mx-auto flex flex-col p-6 gap-3 font-sans'}>
            <div className={'flex justify-between items-center'}>
                <h2 className={'text-2xl font-semibold mb-6'}>Products</h2>

                <form action={revalidateProducts}>
                    <button className={'bg-emerald-800 px-4 py-2 rounded-md cursor-pointer'}>Revalidate Products</button>
                </form>
            </div>

            <div className={'grid gap-6 sm:grid-cols-2 lg:grid-cols-3'}>
                <p className={'text-sm text-gray-500'}>Cached at: {cachedAt}</p>
                {products.map(({id, title, description, thumbnail, images, brand, price, stock, availabilityStatus, rating}) => {
                    return (
                        <div key={id} className={'rounded-2xl bg-white shadow-md hover:shadow-xl transition overflow-hidden'}>
                            <img src={images[0]} className={'h-48 w-full object-cover'}/>
                            <div className={'p-4'}>
                                <span className={'text-xs font-semibold text-purple-600'}>{brand}</span>
                                <h3 className={'mt-1 text-lg font-semibold text-gray-800'}>{title}</h3>
                                <p className={'mt-2 text-sm text-gray-600 line-clamp-2'}>{description}</p>

                                <div className={'mt-4 flex items-center justify-between'}>
                                    <span className={'text-xl font-bold text-gray-900'}>${price}</span>
                                    <span className={'text-sm text-green-600'}>{availabilityStatus}</span>
                                </div>

                                <div className={'mt-3 flex items-center justify-between text-sm text-gray-500'}>
                                    <span>⭐ {rating}</span>
                                    <span>{stock} left</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default CachingDemo;
