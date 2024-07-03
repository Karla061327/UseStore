import { ProductModel } from "../../data";
import { CreateCategoryDto, CustomError, PaginationDto } from "../../domain";

export class ProductService{
    
    constructor(){}

    async createProduct(createCProductDto: CreateCategoryDto){

        const productExists = await ProductModel.findOne({name: createCProductDto.name});
        if (productExists) throw CustomError.badRequest('Product already exists');

        try {
            const product = new ProductModel(createCProductDto);
           
            await product.save();

            return product;
             
        } catch (error) {
            throw CustomError.internalServer('Internal sserver')
        }
    }
 
    async getProduct(paginationDto: PaginationDto){

        const {page, limit} = paginationDto;
        try {
            const [total, products] = await Promise.all([
                ProductModel.countDocuments(),
                ProductModel.find()
                    .skip((page -1) * limit)
                    .limit(limit)
                    .populate('user', 'category')
            ]);

            return {
                page: page,
                limit: limit,
                total: total,
                products: products,
                };

       } catch (error) {
           throw CustomError.internalServer('Internal Server Error')
         }   
    }
}
