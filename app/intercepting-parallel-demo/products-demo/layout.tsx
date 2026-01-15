import React from "react";

function ProductsDemoLayout({children, modal}: { children: React.ReactNode; modal: React.ReactNode; }) {
    return (
        <>
            {children}
            {modal}
        </>
    );
}

export default ProductsDemoLayout;
