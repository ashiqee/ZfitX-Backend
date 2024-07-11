
import  express  from 'express';
import validateRequest from '../../middlewares/validateRequests';
import { ProductValidation } from './products.validation';
import { ProductsController } from './products.controller';




const router = express.Router()



router.post('/',validateRequest(ProductValidation.createProductValidationSchema), ProductsController.CreateProduct)

export const ProductsRoutes = router;