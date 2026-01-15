import {Suspense} from "react";
import {ProductRelatedContent} from "@/components/intercepting-parallel-demo/ProductRelatedContent";

async function RelatedSlot({params}: { params: Promise<{ productId: string }> }) {
    return (
        <Suspense fallback={<div>Loading related products...</div>}>
            <ProductRelatedContent params={params}/>
        </Suspense>
    )
}

export default RelatedSlot;
