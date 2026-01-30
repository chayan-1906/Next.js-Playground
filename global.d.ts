declare module "*.mdx" {
    import type {ComponentType} from "react";
    import type {MDXComponents} from "mdx/types";

    const MDXComponent: ComponentType<{ components?: MDXComponents }>;

    export const metadata: {
        title?: string;
        author?: string;
        date?: string;
        [key: string]: unknown;
    };

    export default MDXComponent;
}
