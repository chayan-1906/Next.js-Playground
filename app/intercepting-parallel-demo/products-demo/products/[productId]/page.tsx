import {Info} from "lucide-react";

function ProductDetailsPage() {
    return (
        <div className={'p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-dashed border-gray-300 dark:border-gray-700'}>
            <div className={'flex items-center text-gray-500 dark:text-gray-400'}>
                <Info className={'size-5 mr-3'}/>
                <h2 className={'text-lg font-semibold'}>Full Page View</h2>
            </div>
            <p className={'text-sm text-gray-600 dark:text-gray-400 mt-2 ml-8'}>
                This is the main product page layout. The content for product details, reviews, and related items is rendered below in independent slots.
            </p>
        </div>
    );
}

export default ProductDetailsPage;
