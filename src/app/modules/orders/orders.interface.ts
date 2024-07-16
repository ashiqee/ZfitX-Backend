import { Types } from "mongoose";

interface TCartItem{
    productId:Types.ObjectId,
    quantity:number,
}

export interface TOrder{
    o_firstName :string;
    o_lastName:string;
    o_email:string;
    o_phone:string;
    o_address:string;
    o_state:string;
    o_city:string;
    o_cartItems:TCartItem[]
}
