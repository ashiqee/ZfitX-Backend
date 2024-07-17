"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersServices = void 0;
const mongoose_1 = require("mongoose");
const orders_model_1 = require("./orders.model");
const products_model_1 = require("../products/products.model");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const createOrderIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield (0, mongoose_1.startSession)();
    session.startTransaction();
    try {
        for (const cartItem of payload.o_cartItems) {
            const cartProduct = yield products_model_1.Product.findById(cartItem.productId).session(session);
            if (!cartProduct) {
                throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Falied to create order');
            }
            if (cartProduct.p_stock < cartItem.quantity) {
                throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Insufficient stock for product with id');
            }
            cartProduct.p_stock -= cartItem.quantity;
            yield cartProduct.save({ session });
            //create the order
            const result = yield orders_model_1.Orders.create([payload], { session });
            //commit the transaction
            yield session.commitTransaction();
            session.endSession();
            return result;
        }
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        throw error;
    }
});
const getAllOrderFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield orders_model_1.Orders.find().populate("o_cartItems.productId").sort({ createdAt: -1 });
    return result;
});
exports.OrdersServices = {
    createOrderIntoDB,
    getAllOrderFromDB,
};
