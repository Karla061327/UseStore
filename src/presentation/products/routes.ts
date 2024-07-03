
import { Router } from 'express';
import { ProductController } from './controller';
import { ProductService } from '../services/product.service';
import { AuthMiddleware } from '../middlewares/auth.middleware';


export class ProductRoutes {


  static get routes(): Router {

    const router = Router();
    
    const product = new ProductService();
    const controller = new ProductController(product);
    
    router.get('/', controller.getProduct);
    router.post('/',[AuthMiddleware.validateJWT],controller.createProduct);
    
    //,[AuthMiddleware.validateJWT] ,
    
    return router; 
  }


}

