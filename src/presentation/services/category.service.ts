import { CategoryModel } from "../../data";
import { CreateCategoryDto, CustomError, PaginationDto } from "../../domain";
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
 
    async getCategories(paginationDto: PaginationDto){

        const {page, limit} = paginationDto;
        try {

            // const categories = await CategoryModel.find()
            //     .skip((page -1) * limit)
            //     .limit(limit)

            const [total, categories] = await Promise.all([
                CategoryModel.countDocuments(),
                CategoryModel.find()
                    .skip((page -1) * limit)
                    .limit(limit)
            ]);

            return {
                page: page,
                limit: limit,
                total: total,

                categories: categories.map( category => ({
                    id: category.id,
                    name: category.name,
                    available: category.avaliable,
                }))
        };
            
            
       } catch (error) {
           throw CustomError.internalServer('Otro error?')
         }   
    }
}
        