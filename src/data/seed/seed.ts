import { envs } from "../../config"
import { ProductModel, UserModel, CategoryModel } from "../mongo";
import { MongoDatabase } from "../mongo/mongo-database"
import { seedData } from "./data";


(async()=>{
    await MongoDatabase.connect({
        dbName: envs.MONGO_DB_NAME,
        mongoUrl: envs.MONGO_URL
    })
    await main();

    await MongoDatabase.disconnect();
})();

async function main(){

    const randomBetween0AndX = (x: number) => {
        return Math.floor(Math.random() * x);
    }   
     //1. borrar todo
    await Promise.all([
        UserModel.deleteMany(),
        CategoryModel.deleteMany(),
        ProductModel.deleteMany(),
    ])

    //2. insertar usuario
    const users = await UserModel.insertMany(seedData.users);

    //3. crear categoria
    const categories = await CategoryModel.insertMany(
        seedData.categories.map(category => {
            
            return{
                ...category,
                user: users[0]._id
            }
        })
    )

    const products = await ProductModel.insertMany(
        seedData.products.map(product => {
            
            return{
                ...product,
                user: categories[randomBetween0AndX(seedData.users.length-1)]._id,
                category: categories[randomBetween0AndX(seedData.categories.length -1)]._id
            }
        })
    )
    console.log('SEEDED');
    
}

function Mathrandom() {
    throw new Error("Function not implemented.");
}
