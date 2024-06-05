import { CategoryModel } from "../../data";
import { CreateCategoryDto, CustomError } from "../../domain";
import { UserEntity } from "../../domain/entities/user.entity";


export class CategoryService{
    
    constructor(){}

    async createCategory(createCategoryDto: CreateCategoryDto, user: UserEntity){

        const categoryExists = await CategoryModel.findOne({name: createCategoryDto.name});
        if (categoryExists) throw CustomError.badRequest('Category already exists');

        try {
            console.log(user);
            const category = new CategoryModel({
                ...createCategoryDto,
                user: user.id
            })
           
            
            await category.save();

            return {
                id: category.id,
                name: category.name,
                available: category.avaliable,
            }
             
        } catch (error) {
            throw CustomError.internalServer('Internal sserver')
        }
    }

    async getCategories(){

        // try {
        //     const categories = await CategoryModel.find();
        //     console.log(categories);
            
        //     return categories.map( category => {(
        //         id: category.id,
        //         name: category.name,
        //         available: category.avaliable,
        //     )})
            
        // } catch (error) {
            
        // }
        console.log('aa');
        
        
        
    }
}
        