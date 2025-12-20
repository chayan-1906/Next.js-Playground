"use client";

import {useActionState, useEffect, useRef} from "react";
import {ProductState} from "@/types/products";
import {addProduct} from "@/lib/actions/products.actions";

function ActionStateDemo() {
    const initialState: ProductState = {
        success: false,
    };
    const [state, formAction, pending] = useActionState(addProduct, initialState);

    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (state.success && formRef.current) {
            formRef.current.reset();
        }
    }, [state.success]);

    return (
        <div>
            <form ref={formRef} action={formAction} className={'space-y-6 rounded-2xl border border-gray-800 bg-linear-to-b from-gray-900/60 to-gray-900/30 p-6 shadow-lg backdrop-blur'}>
                {/* Product Name */}
                <div>
                    <label htmlFor={'title'} className={'mb-1 block text-sm font-medium text-gray-300'}>Product Name</label>
                    <input
                        type={'text'}
                        id={'title'}
                        name={'title'}
                        required
                        defaultValue={state.data?.title || ''}
                        placeholder={'e.g. Wireless Headphones'}
                        className={'w-full rounded-xl border border-gray-700 bg-gray-900/40 px-4 py-2.5 text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40 outline-none transition'}
                    />
                    {!state.success && (
                        <p className={'mt-1 text-sm text-red-400'}>{state.error?.title}</p>
                    )}
                </div>

                {/* Price & Image URL */}
                <div className={'grid grid-cols-1 gap-5 md:grid-cols-2'}>
                    <div>
                        <label htmlFor={'price'} className={'mb-1 block text-sm font-medium text-gray-300'}>Price (₹)</label>
                        <input
                            type={'number'}
                            id={'price'}
                            name={'price'}
                            required
                            defaultValue={state.data?.price || ''}
                            min={'0'}
                            step={'0.01'}
                            placeholder={'1'}
                            className={'w-full rounded-xl border border-gray-700 bg-gray-900/40 px-4 py-2.5 text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40 outline-none transition'}
                        />
                        {!state.success && (
                            <p className={'mt-1 text-sm text-red-400'}>{state.error?.price}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor={'imageUrl'} className={'mb-1 block text-sm font-medium text-gray-300'}>Image URL</label>
                        <input
                            type={'url'}
                            id={'imageUrl'}
                            name={'imageUrl'}
                            defaultValue={state.data?.images![0] || ''}
                            placeholder={'https://example.com/image.png'}
                            className={'w-full rounded-xl border border-gray-700 bg-gray-900/40 px-4 py-2.5 text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40 outline-none transition'}
                        />
                    </div>
                </div>

                {/* Description */}
                <div>
                    <label htmlFor={'description'} className={'mb-1 block text-sm font-medium text-gray-300'}>Description</label>
                    <textarea
                        id={'description'}
                        name={'description'}
                        defaultValue={state.data?.description || ''}
                        rows={4}
                        placeholder={'Enter a detailed description of the product...'}
                        className={'w-full resize-none rounded-xl border border-gray-700 bg-gray-900/40 px-4 py-2.5 text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40 outline-none transition'}
                    />
                </div>

                {/* Submit */}
                <button
                    type={'submit'}
                    disabled={pending}
                    className={`w-full rounded-xl py-3 text-lg font-semibold transition-all ${pending ? 'cursor-not-allowed bg-indigo-900/70' : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-indigo-500/30 shadow-lg cursor-pointer'}`}>
                    {pending ? 'Adding Product…' : 'Add Product'}
                </button>

                {state.success && (
                    <p className={'text-center text-sm font-medium text-green-400'}>Product added successfully</p>
                )}
            </form>
        </div>
    );
}

export default ActionStateDemo;
