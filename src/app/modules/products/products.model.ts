import { Schema, model } from "mongoose";
import { TProduct } from "./products.interface";




const ProductSchema = new Schema<TProduct>(
    {
        // p_ means Product 
        p_name:{
            type: String,
            required: true,
            unique:true
        },
        p_description:{
            type: String,
            required: true,
        },
        p_category:{
            type: String,
            required: true,
        },
        p_images:{
            type: [String],
            required: true,
        },
        p_price:{
            type: Number,
            required: true,
        },
        p_stock:{
            type: Number,
            required: true,
        },
        p_isDeleted:{
            type: Boolean,
            required: true,
            default:false,
        },
    },{
        timestamps:true,
    }
)

ProductSchema.pre("find",function(next){
    this.find({p_isDeleted:{$ne:true}});
    next()
});

ProductSchema.pre("findOne",function(next){
    this.find({p_isDeleted:{$ne:true}});
    next()
})

export const Product =  model<TProduct>('Product',ProductSchema)

