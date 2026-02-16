"use server";

import {connection} from "next/server";
import type {TimeData} from "@/types/swr-time";

const getServerTime = async (): Promise<TimeData> => {
    await connection();
    const timestamp: string = new Date().toISOString();
    console.log(`[Server] Time fetched at ${timestamp}`);

    // Simulate delay (same as the API route)
    await new Promise((resolve) => setTimeout(resolve, 500));

    return {
        timestamp,
        message: 'Data fetched successfully!',
    };
}

export {getServerTime};
