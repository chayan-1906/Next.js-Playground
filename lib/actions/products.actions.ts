"use server";

import {ProductState} from "@/types/products";

async function addProduct(prevState: ProductState, formData: FormData): Promise<ProductState> {
    const title = formData.get('title') as string || '';
    const price = formData.get('price') || 0;
    const imageUrl = formData.get('imageUrl') as string || '';
    const description = formData.get('description') as string || '';

    console.log('product data from form:', {title, price, imageUrl, description});

    const errors: Record<string, string> = {};
    if (!title) errors.title = 'Title is required';
    if (!price || Number(price) <= 0) errors.price = 'Price must be greater than 0';

    if (Object.keys(errors).length > 0) {
        return {
            success: false,
            error: errors,
            data: {title, price: Number(price), images: [imageUrl], description},
        };
    }

    await new Promise(resolve => setTimeout(resolve, 5000));

    return {
        success: true,
        // data: {title, price: Number(price), images: [imageUrl], description},
    };
}

export {addProduct};
