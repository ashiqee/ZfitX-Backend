import { Schema,model } from "mongoose";
import { TOrder } from "./orders.interface";

const orderItemSchema = new Schema(
    {
        productId:{type:String,require:true},
        quantity:{type:Number,require:true}
    }
)

const OrderSchema = new Schema<TOrder>(
    {
        o_email:{
            type:String,
            required:true,
        },
        o_firstName:{
            type:String,
            required:true,
        },
        o_lastName:{
            type:String,
            
        },
        o_address:{
            type:String,
            required:true,
        },
        o_city:{
            type:String,
            
        },
        o_state:{
            type:String,
           
        },
        o_phone:{
            type:String,
            required:true,
        },
        o_cartItems:[orderItemSchema],
      
    },{
        toJSON:{virtuals:true},
        timestamps:true
    }
)



// virtula Name 
OrderSchema.virtual('fullName').get(function(){
    return  `${this?.o_firstName} ${this?.o_lastName}`;
})

export const Orders = model<TOrder>("Orders",OrderSchema)

