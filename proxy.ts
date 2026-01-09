import type {NextRequest} from "next/server";
import {NextResponse} from "next/server";
import {routes} from "@/lib/routes";

export function proxy(request: NextRequest) {
    const pathname: string = request.nextUrl.pathname;
    if (pathname.startsWith(routes.proxyDemo)) {
        console.log('--- nextUrl Inspection ---');
        console.log('Pathname:', request.nextUrl.pathname);
        console.log('Search Params:', request.nextUrl.searchParams.toString());
        console.log('Base Path:', request.nextUrl.basePath);
        console.log('Locale:', request.nextUrl.locale);
        console.log('--------------------------');


        const nativeUrl = new URL(request.url);
        console.log('--- URL Comparison ---');
        console.log('NextUrl Pathname:', request.nextUrl.pathname);
        console.log('Native Pathname:', nativeUrl.pathname);

        // This is where it gets interesting if you have a basePath or locales
        console.log('NextUrl Host:', request.nextUrl.host);
        console.log('Native Host:', nativeUrl.host);
        console.log('--------------------------');
    }

    if (pathname === routes.testRedirect) {
        return NextResponse.redirect(new URL(routes.funda, request.url));
    }

    if (pathname === routes.testRewrite) {
        return NextResponse.rewrite(new URL(routes.funda, request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/redirect-rewrite-demo/test-redirect',
        '/redirect-rewrite-demo/test-rewrite',
        '/proxy-demo/:path*',
    ],
};
