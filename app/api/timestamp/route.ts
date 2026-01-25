import {NextResponse} from "next/server";

export async function GET() {
    const timestamp: string = new Date().toISOString();

    // Log on server side to track how many times this API is actually called
    console.log(`🔥 API CALLED at ${timestamp}`);

    // Simulate some delay to make it more realistic
    await new Promise((resolve) => setTimeout(resolve, 500));

    return NextResponse.json({
        timestamp,
        message: 'Data fetched successfully!',
    });
}
