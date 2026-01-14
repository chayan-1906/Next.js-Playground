import {Db, MongoClient, ObjectId} from "mongodb";
import {NextResponse} from "next/server";
import {connectDB, getClient} from "@/lib/connectDB";

const DATABASE = 'amazon';

// GET /api/amazon?collection=${collection}
export async function GET(request: Request) {
    console.info('/api/amazon is called');

    try {
        await connectDB();

        const url = new URL(request.url);
        const collection: string | null = url.searchParams.get('collection');
        if (!collection) {
            console.error('collection missing');
            return NextResponse.json({success: false, errorMsg: 'Missing collection', status: 400});
        }

        const client: MongoClient = getClient();
        const db: Db = client.db(DATABASE);
        const dbCollection = db.collection(collection);

        const productId: string | null = url.searchParams.get('productId');

        if (productId) {
            if (!ObjectId.isValid(productId)) {
                return NextResponse.json({success: false, errorMsg: 'Invalid productId format'}, {status: 400});
            }

            const document = await dbCollection.findOne({_id: new ObjectId(productId)});

            if (!document) {
                return NextResponse.json({success: false, errorMsg: `Product with id ${productId} not found`}, {status: 404});
            }
            return NextResponse.json({success: true, data: document});
        } else {
            const documents = await dbCollection.find({}).toArray();
            return NextResponse.json({success: true, data: documents});
        }
    } catch (error: any) {
        console.error('Error fetching amazon data:', error);
        return NextResponse.json({success: false, errorMsg: 'Error fetching data', status: 500});
    }
}
