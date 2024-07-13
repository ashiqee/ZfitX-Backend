/* eslint-disable no-unused-vars */
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Product } from './products.model';
import { TProduct } from './products.interface';
import { ProductFilters } from './products.controller';



const createProductIntoDB = async (payload: TProduct) => {

  
  const isProductExists = await Product.findOne({ name: payload.p_name });
  if (isProductExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Same Product Name already exist');
  }

  const result = await Product.create(payload);

  return result;
};

// get all Products

const getAllProductsFromDB = async (filterQuery:ProductFilters) => {

let query:Record<string,unknown> = {}

// searchTerm filter
if(filterQuery.searchTerm){
  query.p_name ={$regex:filterQuery.searchTerm,$options:'i'}
}



// stockStatus filter
if(filterQuery.stockStatus){
  query.p_stock = filterQuery.stockStatus
}


// categories filter
if(filterQuery.categories?.length > 0){
  query.p_category = {$in:filterQuery.categories}
 
  
}

  let result = await Product.find(query);

// sortByPrice price asc or desc
if (filterQuery.sortByPrice) {
  const sortByPriceProduct = filterQuery.sortByPrice === 'asc' ? 1 : -1;
  result = result.sort((a, b) => {
    return sortByPriceProduct * (a.p_price - b.p_price);
  });
}

  return result;
};

//get all carts products =

const getAllCartsProductDetailsFromDB  = async(productIds)=>{

  const result = await Product.find({
    _id:{$in:productIds}
  }).select('-createdAt -p_description -p_isDeleted -updatedAt -__v')

  return result;
}

// get a Product

const getSingleProductFromDB = async (id: string) => {
  const result = await Product.findById(id);

  return result;
};

// update Products

const updateProductIntoDB = async (id: string, payload: Partial<TProduct>) => {
  const isProductExists = await Product.findById(id);
  if (!isProductExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This Product is not found');
  }

  const { ...remainingProductData } = payload;
  const modifiedUpdateData: Record<string, unknown> = {
    ...remainingProductData,
  };

  const result = await Product.findByIdAndUpdate(id, modifiedUpdateData, {
    new: true,
    runValidators: true,
  });

  return result;
};

// delete Product
const deleteProductFromDB = async (id: string) => {
  const isProductExists = await Product.findById(id);

  if (!isProductExists) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Product does not exist');
  }

  const result = await Product.findByIdAndUpdate(
    id,
    {
      p_isDeleted: true,
    },
    { new: true },
  );
  return result;
};


export const Products = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateProductIntoDB,
  deleteProductFromDB,
  getAllCartsProductDetailsFromDB
  
};
