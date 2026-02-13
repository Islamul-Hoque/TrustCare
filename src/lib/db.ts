import { MongoClient, ServerApiVersion, Collection, Document } from "mongodb";

const uri = process.env.MONGODB_URI as string;
const dbName = process.env.DB_NAME as string;

export const collections = {
    PRODUCTS: "products",
    USERS: "users",
    CART: "cart",
} as const;

let client: MongoClient | null = null;

const getClient = async (): Promise<MongoClient> => {
    if (client) return client;

    client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        },
    });

    await client.connect();
    return client;
};

export const dbConnect = async <T extends Document = Document>(
    cname: (typeof collections)[keyof typeof collections]
): Promise<Collection<T>> => {
    const client = await getClient();
    return client.db(dbName).collection<T>(cname);
};
