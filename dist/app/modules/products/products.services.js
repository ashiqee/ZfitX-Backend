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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Products = void 0;
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const products_model_1 = require("./products.model");
const createProductIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isProductExists = yield products_model_1.Product.findOne({ name: payload.p_name });
    if (isProductExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Same Product Name already exist');
    }
    const result = yield products_model_1.Product.create(payload);
    return result;
});
// get all Products
const getAllProductsFromDB = (filterQuery) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let query = {};
    // searchTerm filter
    if (filterQuery.searchTerm) {
        query.p_name = { $regex: filterQuery.searchTerm, $options: 'i' };
    }
    // stockStatus filter
    if (filterQuery.stockStatus) {
        query.p_stock = filterQuery.stockStatus;
    }
    // categories filter
    if (((_a = filterQuery.categories) !== null && _a !== void 0 ? _a : []).length > 0) {
        query.p_category = { $in: filterQuery.categories };
    }
    let result = yield products_model_1.Product.find(query).sort({ createdAt: -1 });
    // sortByPrice price asc or desc
    if (filterQuery.sortByPrice) {
        const sortByPriceProduct = filterQuery.sortByPrice === 'asc' ? 1 : -1;
        result = result.sort((a, b) => {
            return sortByPriceProduct * (a.p_price - b.p_price);
        });
    }
    return result;
});
//get all carts products =
const getAllCartsProductDetailsFromDB = (productIds) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield products_model_1.Product.find({
        _id: { $in: productIds }
    }).select('-createdAt -p_description -p_isDeleted -updatedAt -__v');
    return result;
});
// get a Product
const getSingleProductFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield products_model_1.Product.findById(id);
    return result;
});
// update Products
const updateProductIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isProductExists = yield products_model_1.Product.findById(id);
    if (!isProductExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'This Product is not found');
    }
    const remainingProductData = __rest(payload, []);
    const modifiedUpdateData = Object.assign({}, remainingProductData);
    const result = yield products_model_1.Product.findByIdAndUpdate(id, modifiedUpdateData, {
        new: true,
        runValidators: true,
    });
    return result;
});
// delete Product
const deleteProductFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isProductExists = yield products_model_1.Product.findById(id);
    if (!isProductExists) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Product does not exist');
    }
    const result = yield products_model_1.Product.findByIdAndUpdate(id, {
        p_isDeleted: true,
    }, { new: true });
    return result;
});
exports.Products = {
    createProductIntoDB,
    getAllProductsFromDB,
    getSingleProductFromDB,
    updateProductIntoDB,
    deleteProductFromDB,
    getAllCartsProductDetailsFromDB
};
