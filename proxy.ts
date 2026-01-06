import type {NextRequest} from "next/server";
import {NextResponse} from "next/server";
import {routes} from "@/lib/routes";

export function proxy(request: NextRequest) {
    const pathname: string = request.nextUrl.pathname;
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
    ],
};
