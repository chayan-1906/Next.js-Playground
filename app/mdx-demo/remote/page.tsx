import {Suspense} from "react";
import {MDXRemote} from "next-mdx-remote-client/rsc";
import {BASE_URL} from "@/lib/config";
import {useMDXComponents} from "@/mdx-components";

async function RemoteMdxPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <RemoteMdxWrapper/>
        </Suspense>
    );
}

async function RemoteMdxWrapper() {
    const response: Response = await fetch(`${BASE_URL}/api/mdx/welcome`);
    const markdown: string = await response.text();

    return (
        <MDXRemote source={markdown} components={useMDXComponents()}/>
    );
}

export default RemoteMdxPage;
