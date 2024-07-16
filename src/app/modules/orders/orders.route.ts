
import  express  from 'express';
import { orderControllers } from './orders.controller';
import { OrderValiadation } from './orders.validation';
import validateRequest from '../../middlewares/validateRequests';



const router = express.Router();

router.get('/',orderControllers.getAllOrders);
router.post('/', validateRequest(OrderValiadation.OrderSchemaValidation) ,orderControllers.createOrder)


export const OrdersRoutes = router;