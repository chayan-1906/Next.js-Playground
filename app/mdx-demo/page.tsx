import React from "react";
import ContentMDX, {metadata} from "./content.mdx";

function MDXDemoPage() {
    return (
        <div>
            <ContentMDX components={{h1: CustomH1}}/>
            <p>By {metadata.author} on {metadata.date}</p>
        </div>
    );
}

function CustomH1({children}: { children?: React.ReactNode }) {
    return (
        <h1 className={'text-7xl font-bold text-fuchsia-500'}>{children}</h1>
    );
}

export default MDXDemoPage;
