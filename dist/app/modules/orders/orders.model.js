"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Orders = void 0;
const mongoose_1 = require("mongoose");
const orderItemSchema = new mongoose_1.Schema({
    productId: { type: String, require: true, ref: "Product" },
    quantity: { type: Number, require: true }
});
const OrderSchema = new mongoose_1.Schema({
    o_email: {
        type: String,
        required: true,
    },
    o_firstName: {
        type: String,
        required: true,
    },
    o_lastName: {
        type: String,
    },
    o_address: {
        type: String,
        required: true,
    },
    o_city: {
        type: String,
    },
    o_state: {
        type: String,
    },
    o_transcationId: {
        type: String,
    },
    o_status: {
        type: String,
        enum: ['processing', 'hold', 'completed', 'pending'],
        default: 'pending',
    },
    o_payment_status: {
        type: String,
        enum: ['paid', 'due', 'refund'],
        default: 'due',
    },
    o_phone: {
        type: String,
        required: true,
    },
    o_cartItems: [orderItemSchema],
}, {
    toJSON: { virtuals: true },
    timestamps: true
});
// virtula Name 
OrderSchema.virtual('fullName').get(function () {
    return `${this === null || this === void 0 ? void 0 : this.o_firstName} ${this === null || this === void 0 ? void 0 : this.o_lastName}`;
});
exports.Orders = (0, mongoose_1.model)("Orders", OrderSchema);
