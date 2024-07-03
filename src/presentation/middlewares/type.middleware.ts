
import { NextFunction, Request,Response } from "express";

export class TypeMiddleware {

    static validTypes(validTytes: string[])
    { return (req: Request, res:Response, next:NextFunction) => {


        const type = req.url.split('/').at(2) ?? '';
        console.log(type);
        

        if (!validTytes.includes(type)){
          return res.status(400)
          .json({error: 'Invalid type'});
        }
        next();
    }
    
    }
}