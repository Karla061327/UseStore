import mongoose from "mongoose";


interface Options {
    mongoUrl: string;
    dbName: string;
}
 
export class MongoDatabase {
    static async disconnect() {
        await mongoose.disconnect();
    }

    static async connect (options: Options) {
        const {mongoUrl, dbName} = options;

        try {
            await mongoose.connect(mongoUrl, {
                dbName: dbName,
            })
            return true;

             
        } catch (error){
            console.log('Mongo Connection Error');
            throw error;
        }
    }
}