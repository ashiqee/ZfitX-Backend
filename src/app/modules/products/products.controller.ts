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
        message: "New Product Added successfully",
        data:result,
    })
})

export interface ProductFilters{
    searchTerm?:string;
    sortByPrice?:string;
    stockStatus?:'inStock'|'outOfStock';
    categories?:string[]
}

const getAllProducts = catchAsync(async(req,res)=>{
   


    const {searchTerm,sortByPrice,stockStatus,categories}= req.query as Partial<Record<keyof ProductFilters, string>>;
    
    let filterQuery : ProductFilters = {
        searchTerm,
        sortByPrice,
        stockStatus: undefined,
        categories: categories ? categories.split(',') : [],
    };

    
        if(sortByPrice === "asc" || sortByPrice === 'desc'){
            filterQuery.sortByPrice = sortByPrice
        };

      
        if(stockStatus === 'inStock' || stockStatus === 'outOfStock'){
            filterQuery.stockStatus = stockStatus;
        };
  

    const result = await Products.getAllProductsFromDB(filterQuery);
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
// get cart product details 
const getAllCartProducts = catchAsync(async(req,res)=>{
   let productIds = req.query.productIds;
   
   
   if(typeof productIds === 'string'){
    productIds = productIds.split(',').map(id=>id.trim());
   }
 
    const result = await Products.getAllCartsProductDetailsFromDB(productIds);
   
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
        message: "Carts Products retrieved successfully",
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
    getAllCartProducts
    
}