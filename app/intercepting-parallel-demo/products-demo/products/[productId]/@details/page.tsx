import {Suspense} from "react";
import {ProductDetailsContent} from "@/components/intercepting-parallel-demo/ProductDetailsContent";

async function DetailsSlot({params}: { params: Promise<{ productId: string }> }) {
    return (
        <Suspense fallback={<div>Loading product...</div>}>
            <ProductDetailsContent params={params}/>
        </Suspense>
    )
}

export default DetailsSlot;
