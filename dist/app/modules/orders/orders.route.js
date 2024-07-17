"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersRoutes = void 0;
const express_1 = __importDefault(require("express"));
const orders_controller_1 = require("./orders.controller");
const orders_validation_1 = require("./orders.validation");
const validateRequests_1 = __importDefault(require("../../middlewares/validateRequests"));
const router = express_1.default.Router();
router.get('/', orders_controller_1.orderControllers.getAllOrders);
router.post('/', (0, validateRequests_1.default)(orders_validation_1.OrderValiadation.OrderSchemaValidation), orders_controller_1.orderControllers.createOrder);
exports.OrdersRoutes = router;
