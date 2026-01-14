"use server";

import {cache} from "react";
import {BASE_URL} from "@/lib/config";
import {Product} from "@/types/amazon";

const getProducts = cache(async (collection: string) => {
    const url = `${BASE_URL}/api/amazon?collection=${collection}`;
    const res: Response = await fetch(url);

    if (!res.ok) {
        throw new Error('Failed to fetch products');
    }

    const json = await res.json();
    return json.data as Product[];
});

const getProduct = cache(async (collection: string, productId: string) => {
    const url = `${BASE_URL}/api/amazon?collection=${collection}&productId=${productId}`;
    const res: Response = await fetch(url);

    if (!res.ok) {
        throw new Error('Failed to fetch product');
    }

    const json = await res.json();
    return json.data as Product;
});

export {getProducts, getProduct};
