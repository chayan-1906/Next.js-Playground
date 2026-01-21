"use server";

import {headers} from "next/headers";
import {revalidatePath} from "next/cache";
import {routes} from "@/lib/routes";

const getCachedTime = async () => {
    "use cache";
    const now = new Date();
    console.log('cached now:', now);

    return now;
}

const getUncachedTime = async () => {
    await headers();
    const now = new Date();
    console.log('uncached now:', now);

    return now;
}

const revalidateTime = async () => {
    revalidatePath(routes.refreshDemo);
}

export {getCachedTime, getUncachedTime, revalidateTime};
