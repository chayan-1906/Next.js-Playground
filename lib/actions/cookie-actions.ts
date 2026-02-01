"use server";

import {cookies} from "next/headers";

async function setHttpOnlyCookies() {
    const cookieStore = await cookies();
    cookieStore.set('session-token', 'demo-session-' + Date.now().toString(), {
        httpOnly: true,
        secure: true,
        maxAge: 24 * 60 * 60,   // 1d
        sameSite: 'strict',
        path: '/',
    });
}

async function getHttpOnlyCookies() {

}

export {setHttpOnlyCookies, getHttpOnlyCookies};
