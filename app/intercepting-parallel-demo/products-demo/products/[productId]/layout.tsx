import React from "react";

function ProductDetatilsLayout({children, details, related, reviews}: { children: React.ReactNode; details: React.ReactNode; related: React.ReactNode; reviews: React.ReactNode; }) {
    return (
        <div className={'p-4 flex flex-col gap-6'}>
            {children}
            {details}
            {related}
            {reviews}
        </div>
    );
}

export default ProductDetatilsLayout;
