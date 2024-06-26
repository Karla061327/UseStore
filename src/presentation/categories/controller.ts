


import { Request, Response } from 'express';
import { CreateCategoryDto, CustomError, PaginationDto} from '../../domain';
import { CategoryService } from '../services/category.service';


export class CategoryController {

  // DI
  constructor(
    private readonly categoryService: CategoryService,
  ){}

  private handleError = (error: unknown, res: Response ) => {
    if ( error instanceof CustomError ) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.log(`${ error }`);
    return res.status(500).json({ error: 'Internal server error' })
  } 

  createCategories = async(req: Request, res: Response) => {
    console.log(req.body);
    
    const [error, createCategoryDto] = CreateCategoryDto.create(req.body);
    if (error) return res.status(400).json({error});
    
    console.log(createCategoryDto);
     
    this.categoryService.createCategory(createCategoryDto!, req.body.user)
      .then(category => res.status(201).json(category))
      .catch(error => this.handleError(error, res));
  }

  
  getCategories = async(req: Request, res: Response) => {

    //!los query parameter son siempre string, esl + lo trasnforma en number

    const {page = 1, limit = 10} = req.query;
    const [error, paginationDto] = PaginationDto.create(+page, +limit);

    if (paginationDto === undefined) return res.status(400).json('Error aqui')
    if(error) return res.status(400).json ({error}); 

    this.categoryService.getCategories(paginationDto)
      .then(categories => res.json(categories))
      .catch(error => this.handleError(error, res));
      
  }
}  