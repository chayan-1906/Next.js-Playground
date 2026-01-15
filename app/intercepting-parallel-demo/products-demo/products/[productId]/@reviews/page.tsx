import {Suspense} from "react";
import {ProductReviewsContent} from "@/components/intercepting-parallel-demo/ProductReviewsContent";

async function ReviewsSlot({params}: { params: Promise<{ productId: string }> }) {
    return (
        <Suspense fallback={<div>Loading reviews...</div>}>
            <ProductReviewsContent params={params}/>
        </Suspense>
    )
}

export default ReviewsSlot;
