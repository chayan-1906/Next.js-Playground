import {cache} from "react";
import {Db, MongoClient, ObjectId} from "mongodb";
import {Product} from "@/types/amazon";
import {connectDB, getClient} from "@/lib/connectDB";

const DATABASE = 'amazon';

const getProducts = cache(async (collection: string): Promise<Product[]> => {
    await connectDB();

    const client: MongoClient = getClient();
    const db: Db = client.db(DATABASE);
    const dbCollection = db.collection(collection);

    const documents = await dbCollection.find({}).toArray();

    return JSON.parse(JSON.stringify(documents)) as Product[];
});

const getProduct = cache(async (collection: string, productId: string): Promise<Product> => {
    await connectDB();

    const client: MongoClient = getClient();
    const db: Db = client.db(DATABASE);
    const dbCollection = db.collection(collection);

    if (!ObjectId.isValid(productId)) {
        throw new Error('Invalid productId format');
    }

    const document = await dbCollection.findOne({_id: new ObjectId(productId)});

    if (!document) {
        throw new Error(`Product with id ${productId} not found`);
    }

    return JSON.parse(JSON.stringify(document)) as Product;
});

export {getProducts, getProduct};
