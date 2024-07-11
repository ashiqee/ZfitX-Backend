import httpStatus from "http-status";

import { Products,  } from "./products.services";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";



const CreateProduct = catchAsync(async (req,res)=>{
    const productData=req.body;


    const result =  await Products.createProductIntoDB(productData);

    sendResponse(res,{
        statusCode: httpStatus.OK,
        success:true,
        message: "Product created successfully",
        data:result,
    })
})

const getAllProducts = catchAsync(async(req,res)=>{
   
    const result = await Products.getAllProductsFromDB();
    if(!result){
        return sendResponse(res,{
             statusCode: httpStatus.NOT_FOUND,
             success:false,
             message: "No Data Found",
             data:[],
         })
     }
    sendResponse(res,{
        statusCode: httpStatus.OK,
        success:true,
        message: "Products retrieved successfully",
        data:result,
    })
})



const getSingleProduct = catchAsync(async(req,res)=>{
    const {id} = req.params
    const result = await Products.getSingleProductFromDB(id);
    if(!result){
        return sendResponse(res,{
             statusCode: httpStatus.NOT_FOUND,
             success:false,
             message: "No Data Found",
             data:[],
         })
     }
    sendResponse(res,{
        statusCode: httpStatus.OK,
        success:true,
        message: "Product retrieved successfully",
        data:result,
    })
})

const updateProduct = catchAsync(async(req,res)=>{
    const {id}=req.params;
    const updateData = req.body;
    const result = await Products.updateProductIntoDB(id,updateData)
    if(!result){
       return sendResponse(res,{
            statusCode: httpStatus.NOT_FOUND,
            success:false,
            message: "No Data Found",
            data:[],
        })
    }
    sendResponse(res,{
        statusCode: httpStatus.OK,
        success:true,
        message: "Product updated successfully",
        data:result,
    })
})


//delete Product 
const deleteProduct = catchAsync(async(req,res)=>{
    const {id}=req.params;
    const result = await Products.deleteProductFromDB(id);

    if(!result){
        return sendResponse(res,{
             statusCode: httpStatus.NOT_FOUND,
             success:false,
             message: "No Data Found",
             data:[],
         })
     }
    sendResponse(res,{
        statusCode: httpStatus.OK,
        success:true,
        message: "Product deleted successfully",
        data:result,
    })
})


export const ProductsController = {
    CreateProduct,
    getAllProducts,
    updateProduct,
    deleteProduct,
    getSingleProduct,
    
}