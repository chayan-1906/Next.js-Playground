"use server";

import {ProductState} from "@/types/products";

function validateProduct(formData: FormData) {
    const title = formData.get('title') as string || '';
    const price = formData.get('price') || 0;
    const imageUrl = formData.get('imageUrl') as string || '';
    const description = formData.get('description') as string || '';

    const errors: Record<string, string> = {};
    if (!title) errors.title = 'Title is required';
    if (!price || Number(price) <= 0) errors.price = 'Price must be greater than 0';

    return {title, price, imageUrl, description, errors};
}

async function addProduct(prevState: ProductState, formData: FormData): Promise<ProductState> {
    const {title, price, imageUrl, description, errors} = validateProduct(formData);

    console.log('product data from form:', {title, price, imageUrl, description});

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

async function addProductServerForm(formData: FormData): Promise<void> {
    const {title, price, imageUrl, description, errors} = validateProduct(formData);

    console.log('📦 Server Form - Product data:', {title, price, imageUrl, description});

    if (Object.keys(errors).length > 0) {
        console.log('❌ Validation failed:', errors);
        // In Server Component forms, you can't easily show these errors
        // You'd need to use redirect() or revalidatePath() patterns
        // redirect('/error?message=' + JSON.stringify(errors));
        return;
    }

    // Simulate async work
    await new Promise(resolve => setTimeout(resolve, 5000));

    console.log('✅ Product added successfully!');
    // Optionally: redirect to a success page
    // redirect('/success');
}

export {addProduct, addProductServerForm};
