import {Collection, MongoClient, ReadPreference} from 'mongodb';
import {MONGO_URL} from '../config'

export class MongoDB {
    public static client: MongoClient;

    public static async connect(): Promise<MongoClient> {
        return new Promise((resolve) => {
            MongoClient.connect(MONGO_URL, {
                ignoreUndefined: true,
                readPreference: ReadPreference.PRIMARY,
            }, (err: Error, client: MongoClient) => {
                if (err) throw new Error("unable to connect to MongoDB");
                this.client = client
                resolve(client)
            })
        })
    };

    public static disconnect(): void {
        if (this.client)
            this.client.close();
    }

    public static async getCollection(db: string, collection: string): Promise<Collection> {
        if (!this.client) await this.connect()
        return this.client.db(db).collection(collection)
    }

}