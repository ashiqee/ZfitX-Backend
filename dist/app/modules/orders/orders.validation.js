"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderValiadation = void 0;
const zod_1 = require("zod");
const TCartItemSchema = zod_1.z.object({
    productId: zod_1.z.string().nonempty("ID is required"),
    quantity: zod_1.z.number().int().min(1, "Quantity must be at least 1")
});
// Define the TOrder schema
const OrderSchemaValidation = zod_1.z.object({
    body: zod_1.z.object({
        o_firstName: zod_1.z.string().nonempty("First name is required"),
        o_lastName: zod_1.z.string(),
        o_email: zod_1.z.string().email("Invalid email address"),
        o_phone: zod_1.z.string().nonempty("Phone number is required"),
        o_address: zod_1.z.string().nonempty("Address is required"),
        o_state: zod_1.z.string(),
        o_city: zod_1.z.string(),
        o_cartItems: zod_1.z.array(TCartItemSchema).nonempty("Cart items cannot be empty")
    })
});
exports.OrderValiadation = {
    OrderSchemaValidation,
};
