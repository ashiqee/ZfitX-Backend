"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
const ProductSchema = new mongoose_1.Schema({
    // p_ means Product 
    p_name: {
        type: String,
        required: true,
        unique: true
    },
    p_description: {
        type: String,
        required: true,
    },
    p_category: {
        type: String,
        required: true,
    },
    p_images: {
        type: [String],
        required: true,
    },
    p_price: {
        type: Number,
        required: true,
    },
    p_stock: {
        type: Number,
        required: true,
    },
    p_isDeleted: {
        type: Boolean,
        required: true,
        default: false,
    },
}, {
    timestamps: true,
});
ProductSchema.pre("find", function (next) {
    this.find({ p_isDeleted: { $ne: true } });
    next();
});
ProductSchema.pre("findOne", function (next) {
    this.find({ p_isDeleted: { $ne: true } });
    next();
});
exports.Product = (0, mongoose_1.model)('Product', ProductSchema);
