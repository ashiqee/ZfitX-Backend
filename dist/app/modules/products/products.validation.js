"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductValidation = void 0;
const zod_1 = require("zod");
// p_ means Product 
const createProductValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        p_name: zod_1.z.string().nonempty({ message: 'Product name is required' }),
        p_description: zod_1.z.string().nonempty({ message: 'Product description is required' }),
        p_category: zod_1.z.string().nonempty({ message: 'Category is required' }),
        p_images: zod_1.z.array(zod_1.z.string()).nonempty({ message: 'Images is required' }),
        p_price: zod_1.z.number().min(0, { message: "price must be 0 to start" }),
        p_stock: zod_1.z.number().min(0, { message: 'Minimum 1 product is required' })
    })
});
const updateProductValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        p_name: zod_1.z.string().optional(),
        p_description: zod_1.z.string().optional(),
        p_category: zod_1.z.string().optional(),
        p_images: zod_1.z.array(zod_1.z.string()).optional(),
        p_price: zod_1.z.number().min(0, { message: "price must be 0 to start" }).optional(),
        p_stock: zod_1.z.number().optional()
    })
});
exports.ProductValidation = {
    createProductValidationSchema,
    updateProductValidationSchema
};
