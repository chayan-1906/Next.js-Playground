import React from "react";
import Link from "next/link";
import type {MDXComponents} from "mdx/types";
import Image, {ImageProps} from "next/image";

// This file allows you to provide custom React components to be used in MDX files. You can import and use any
// React component you want, including inline styles, components from other libraries, and more.

const components: MDXComponents = {
    // Customize heading elements
    h1: ({children}: { children?: React.ReactNode }) => (
        <h1 className={'text-4xl font-bold mb-4 mt-8'}>{children}</h1>
    ),
    h2: ({children}: { children?: React.ReactNode }) => (
        <h2 className={'text-3xl font-semibold mb-3 mt-6'}>{children}</h2>
    ),
    h3: ({children}: { children?: React.ReactNode }) => (
        <h3 className={'text-2xl font-medium mb-2 mt-4'}>{children}</h3>
    ),

    // Customize paragraph
    p: ({children}: { children?: React.ReactNode }) => (
        <p className={'mb-4 leading-relaxed'}>{children}</p>
    ),

    // Customize links to use Next.js Link component
    a: ({href, children}: { href?: string; children?: React.ReactNode }) => (
        <Link href={href || '#'} className={'text-blue-600 hover:text-blue-800 underline'}>
            {children}
        </Link>
    ),

    // Customize images to use Next.js Image component
    img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
        <Image sizes={'100vw'} style={{width: '100%', height: 'auto'}}{...(props as ImageProps)}/>
    ),

    // Customize code blocks
    code: ({children}: { children?: React.ReactNode }) => (
        <code className={'bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono'}>
            {children}
        </code>
    ),
    pre: ({children}: { children?: React.ReactNode }) => (
        <pre className={'bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto mb-4'}>
      {children}
    </pre>
    ),

    // Customize lists
    ul: ({children}: { children?: React.ReactNode }) => (
        <ul className={'list-disc list-inside mb-4 space-y-1'}>{children}</ul>
    ),
    ol: ({children}: { children?: React.ReactNode }) => (
        <ol className={'list-decimal list-inside mb-4 space-y-1'}>{children}</ol>
    ),

    // Customize blockquote
    blockquote: ({children}: { children?: React.ReactNode }) => (
        <blockquote className={'border-l-4 border-gray-300 pl-4 italic my-4 text-gray-600 dark:text-gray-400'}>
            {children}
        </blockquote>
    ),

    // Customize tables
    table: ({children}: { children?: React.ReactNode }) => (
        <div className={'overflow-x-auto my-4'}>
            <table className={'min-w-full border-collapse border border-gray-300'}>
                {children}
            </table>
        </div>
    ),
    thead: ({children}: { children?: React.ReactNode }) => (
        <thead className={'bg-gray-100 dark:bg-gray-800'}>{children}</thead>
    ),
    tbody: ({children}: { children?: React.ReactNode }) => (
        <tbody>{children}</tbody>
    ),
    tr: ({children}: { children?: React.ReactNode }) => (
        <tr className={'border-b border-gray-300'}>{children}</tr>
    ),
    th: ({children}: { children?: React.ReactNode }) => (
        <th className={'px-4 py-2 text-left font-semibold border border-gray-300'}>
            {children}
        </th>
    ),
    td: ({children}: { children?: React.ReactNode }) => (
        <td className={'px-4 py-2 border border-gray-300'}>{children}</td>
    ),
}

function useMDXComponents(): MDXComponents {
    return components;
}

export {useMDXComponents};

