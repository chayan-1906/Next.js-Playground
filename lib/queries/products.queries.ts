import {cache} from "react";
import {cacheTag, updateTag} from "next/cache";
import {Product} from "@/types/products";

/*async function getProducts(): Promise<{ products: Product[], cachedAt: string }> {
    "use cache";
    cacheTag('products');
    const cachedAt = new Date().toISOString();
    console.log('🔥 FETCHING FROM API at', cachedAt);
    const response = await fetch('https://dummyjson.com/products');

    if (!response.ok) {
        throw new Error('Failed to fetch products');
    }

    const data = await response.json();
    const products: Product[] = data.products;

    // console.log('products:', products);
    return {products, cachedAt};
}*/

/**
 * with "use cache" + fetch, cache() is redundant!
 */
const getProducts = cache(async (): Promise<{ products: Product[], cachedAt: string }> => {
    "use cache";
    cacheTag('products');

    await new Promise(resolve => setTimeout(resolve, 2000)); // ← 2s delay

    const cachedAt = new Date().toISOString();  // ← Works with "use cache"
    console.log('🔥 FETCHING FROM API at', cachedAt);
    const response = await fetch('https://dummyjson.com/products');

    if (!response.ok) {
        throw new Error('Failed to fetch products');
    }

    const data = await response.json();
    const products: Product[] = data.products;

    return {products, cachedAt};
});

async function revalidateProducts() {
    "use server";
    console.log('revalidating products...');
    // revalidateTag('products', 'max');    // not enough alone (without revalidatePath, invalidates cache but doesn't refresh page)
    // revalidatePath('/caching-demo');      // this is enough alone (without revalidateTag)
    updateTag('products');
    console.log('revalidated products');
}

export {getProducts, revalidateProducts};
