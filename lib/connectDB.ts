import {MongoClient} from "mongodb";
import {MONGO_URI} from "./config";

let client: MongoClient;
let isConnected: boolean = false;

/**
 * Establish MongoDB connection
 * Returns cached connection if already established
 */
async function connectDB() {
    console.log('[ConnectDB] connectDB: Function called');

    if (isConnected && client) {
        console.log('[ConnectDB] connectDB: Using cached MongoDB connection');
        console.log('[ConnectDB] connectDB: Connection already established, skipping reconnection');
        return client;
    }

    console.log('[ConnectDB] connectDB: No cached connection available');
    console.log('[ConnectDB] connectDB: Checking MONGO_URI environment variable');

    if (!MONGO_URI) {
        console.error('[ConnectDB] connectDB: MONGO_URI is not defined in environment variables');
        throw new Error('MONGO_URI is not defined in environment variables');
    }

    console.log('[ConnectDB] connectDB: MONGO_URI found');
    console.log('[ConnectDB] connectDB: Creating new MongoDB client...');

    try {
        client = new MongoClient(MONGO_URI);
        console.log('[ConnectDB] connectDB: MongoDB client created');
        console.log('[ConnectDB] connectDB: Attempting to connect to MongoDB...');

        await client.connect();

        isConnected = true;
        console.log('[ConnectDB] connectDB: ✓ MongoDB connected successfully');
        console.log('[ConnectDB] connectDB: Connection status updated to: connected');

        return client;
    } catch (error: any) {
        console.error('[ConnectDB] connectDB: MongoDB connection failed');
        console.error('[ConnectDB] connectDB: Error details:', error);
        console.error(`[ConnectDB] connectDB: Error message: ${error instanceof Error ? error.message : 'Unknown error'}`);

        isConnected = false;
        console.log('[ConnectDB] connectDB: Connection status updated to: disconnected');

        throw error;
    }
}

/**
 * Get the MongoDB client instance
 */
function getClient(): MongoClient {
    console.log('[ConnectDB] getClient: Function called');

    if (!isConnected || !client) {
        console.error('[ConnectDB] getClient: Database not connected');
        console.error('[ConnectDB] getClient: Connection status:', isConnected ? 'connected' : 'disconnected');
        console.error('[ConnectDB] getClient: Client exists:', !!client);
        throw new Error('Database not connected. Call connectDB() first.');
    }

    console.log('[ConnectDB] getClient: Returning active MongoDB client');
    return client;
}

/**
 * Close MongoDB connection gracefully
 */
async function closeConnection() {
    console.log('[ConnectDB] closeConnection: Function called');

    if (client && isConnected) {
        console.log('[ConnectDB] closeConnection: Active connection found, closing...');

        try {
            await client.close();
            isConnected = false;

            console.log('[ConnectDB] closeConnection: ✓ MongoDB connection closed successfully');
            console.log('[ConnectDB] closeConnection: Connection status updated to: disconnected');
        } catch (error) {
            console.error('[ConnectDB] closeConnection: Error closing MongoDB connection');
            console.error('[ConnectDB] closeConnection: Error details:', error);
            console.error(`[ConnectDB] closeConnection: Error message: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    } else {
        console.log('[ConnectDB] closeConnection: No active connection to close');
        console.log(`[ConnectDB] closeConnection: Client exists: ${!!client}, Is connected: ${isConnected}`);
    }
}

/**
 * Check if MongoDB is currently connected
 */
function isDBConnected(): boolean {
    console.log('[ConnectDB] isDBConnected: Function called');
    console.log(`[ConnectDB] isDBConnected: Current status: ${isConnected ? 'connected' : 'disconnected'}`);

    return isConnected;
}

export {connectDB, getClient, closeConnection, isDBConnected};
