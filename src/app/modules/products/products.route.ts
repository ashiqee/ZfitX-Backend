
import  express  from 'express';
import validateRequest from '../../middlewares/validateRequests';
import { ProductValidation } from './products.validation';
import { ProductsController } from './products.controller';




const router = express.Router()



router.post('/',validateRequest(ProductValidation.createProductValidationSchema), ProductsController.CreateProduct)
router.get('/', ProductsController.getAllProducts)
router.get('/carts', ProductsController.getAllCartProducts)
router.get('/:id', ProductsController.getSingleProduct)
router.delete('/:id', ProductsController.deleteProduct)
router.put('/:id',validateRequest(ProductValidation.updateProductValidationSchema), ProductsController.updateProduct)

export const ProductsRoutes = router;