import {notFound} from "next/navigation";

// This is a mock data fetching function.
async function getProduct(id: string) {
    "use cache";
    console.log(`🔥 getProduct() called for ID: ${id} at ${new Date().toISOString()}`);
    await new Promise(resolve => setTimeout(resolve, 5000));
    console.log(`✅ getProduct() completed for ID: ${id} at ${new Date().toISOString()}`);
    const products = [
        {id: '1', name: 'Smartphone X'},
        {id: '2', name: 'Laptop Pro'},
        {id: '3', name: 'Wireless Earbuds'},
        {id: '4', name: 'Smartwatch 2'},
        {id: '5', name: '4K Monitor'},
        {id: '6', name: 'Mechanical Keyboard'},
        {id: '7', name: 'Gaming Mouse'},
    ];
    return products.find(p => p.id === id);
}

/**
 * This function generates the static paths for the products we want to pre-render at build time.
 */
export async function generateStaticParams() {
    console.log('Running generateStaticParams to pre-build pages...');
    const productIds = ['1', '2', '3', '4', '5', '6'];
    console.log(`Will generate pages for these product IDs:`, productIds);
    return productIds.map(id => ({
        productId: id,
    }));
}

/**
 * The main page component. It sets up the Suspense boundary.
 * The 'params' object here is a Promise in this Next.js version.
 */

/*async function ProductPage({params}: { params: Promise<{ productId: string }> }) {
    return (
        <Suspense fallback={<div className={'container mx-auto p-8'}>Loading product...</div>}>
            <ProductPageContent params={params}/>
        </Suspense>
    );
}*/

/**
 * An async component to handle the actual data fetching and rendering.
 * This is where we can safely use 'await'.
 */
async function ProductPageContent({params}: { params: Promise<{ productId: string; }> }) {
    const {productId} = await params;
    const product = await getProduct(productId);

    if (!product) {
        notFound();
    }

    return (
        <main className={'container mx-auto px-4 py-10 bg-white min-h-screen'}>
            <div className={'p-8 border rounded-lg shadow-lg bg-white'}>
                <h1 className={'text-5xl font-extrabold mb-3 text-gray-900'}>{product.name}</h1>
                <p className={'text-xl text-gray-500 mb-6'}>Product ID: {product.id}</p>

                <div className={'mt-8 p-6 border-t border-gray-200'}>
                    <h3 className={'text-2xl font-semibold mb-4 text-gray-700'}>Rendering Details</h3>
                    <ul className={'list-disc list-inside space-y-2 text-gray-700'}>
                        <li>
                            This page was rendered for product ID: <code className={'bg-gray-100 text-red-500 font-mono p-1 rounded'}>{productId}</code>
                        </li>
                        <li>
                            The <code className={'bg-gray-100 font-mono p-1 rounded'}>generateStaticParams</code> function was configured to pre-build products 1-6.
                        </li>
                        <li>
                            The <code className={'bg-gray-100 font-mono p-1 rounded'}>dynamicParams</code> flag is not set, so it defaults to <code
                            className={'bg-gray-100 text-red-500 font-mono p-1 rounded'}>true</code>.
                        </li>
                    </ul>
                </div>
            </div>
        </main>
    );
}

export default ProductPageContent;
