import {addProductServerForm} from "@/lib/actions/products.actions";

function ServerActionStateDemo() {
    return (
        <div>
            <form action={addProductServerForm} className={'space-y-6 rounded-2xl border border-gray-800 bg-linear-to-b from-gray-900/60 to-gray-900/30 p-6 shadow-lg backdrop-blur'}>
                {/* Product Name */}
                <div>
                    <label htmlFor={'title'} className={'mb-1 block text-sm font-medium text-gray-300'}>Product Name</label>
                    <input
                        type={'text'}
                        id={'title'}
                        name={'title'}
                        required
                        placeholder={'e.g. Wireless Headphones'}
                        className={'w-full rounded-xl border border-gray-700 bg-gray-900/40 px-4 py-2.5 text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40 outline-none transition'}
                    />
                    {/* ❌ No error display - we don't have access to state! */}
                </div>

                <div className={'grid grid-cols-1 gap-5 md:grid-cols-2'}>
                    {/* Price */}
                    <div>
                        <label htmlFor={'price'} className={'mb-1 block text-sm font-medium text-gray-300'}>Price (₹)</label>
                        <input
                            type={'number'}
                            id={'price'}
                            name={'price'}
                            required
                            min={'0'}
                            step={'0.01'}
                            placeholder={'1'}
                            className={'w-full rounded-xl border border-gray-700 bg-gray-900/40 px-4 py-2.5 text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40 outline-none transition'}
                        />
                    </div>

                    {/* Image URL */}
                    <div>
                        <label htmlFor={'imageUrl'} className={'mb-1 block text-sm font-medium text-gray-300'}>Image URL</label>
                        <input
                            type={'url'}
                            id={'imageUrl'}
                            name={'imageUrl'}
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
                        rows={4}
                        placeholder={'Enter a detailed description of the product...'}
                        className={'w-full resize-none rounded-xl border border-gray-700 bg-gray-900/40 px-4 py-2.5 text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40 outline-none transition'}
                    />
                </div>

                {/* Submit Button - No pending state! */}
                <button
                    type={'submit'}
                    className={'w-full rounded-xl bg-indigo-600 py-3 text-lg font-semibold hover:bg-indigo-700 hover:shadow-indigo-500/30 shadow-lg cursor-pointer transition-all'}>
                    Add Product
                </button>

                {/* ❌ No success message - we don't have access to state! */}
            </form>
        </div>
    );
}

export default ServerActionStateDemo;
