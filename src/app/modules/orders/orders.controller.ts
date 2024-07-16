import httpStatus from "http-status";

import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { OrdersServices } from "./orders.service";



const createOrder = catchAsync(async (req,res)=>{
    const orderData =req.body;

    const result =  await OrdersServices.createOrderIntoDB(orderData);

    sendResponse(res,{
        statusCode: httpStatus.OK,
        success:true,
        message: "Your Order Place successfully",
        data:result,
    })
})



const getAllOrders =  catchAsync(async(req,res)=>{
    
    const result = await OrdersServices.getAllOrderFromDB();
    sendResponse(res,{
        statusCode:httpStatus.OK,
        success:true,
        message:"Get All Orders",
        data: result,
    })
})


export const orderControllers = {
    createOrder,
    getAllOrders
}