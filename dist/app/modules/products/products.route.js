"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequests_1 = __importDefault(require("../../middlewares/validateRequests"));
const products_validation_1 = require("./products.validation");
const products_controller_1 = require("./products.controller");
const router = express_1.default.Router();
router.post('/', (0, validateRequests_1.default)(products_validation_1.ProductValidation.createProductValidationSchema), products_controller_1.ProductsController.CreateProduct);
router.get('/', products_controller_1.ProductsController.getAllProducts);
router.get('/carts', products_controller_1.ProductsController.getAllCartProducts);
router.get('/:id', products_controller_1.ProductsController.getSingleProduct);
router.delete('/:id', products_controller_1.ProductsController.deleteProduct);
router.put('/:id', (0, validateRequests_1.default)(products_validation_1.ProductValidation.updateProductValidationSchema), products_controller_1.ProductsController.updateProduct);
exports.ProductsRoutes = router;
