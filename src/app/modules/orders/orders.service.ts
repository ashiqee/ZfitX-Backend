import { startSession } from 'mongoose';
import { TOrder } from './orders.interface';
import { Orders } from './orders.model';
import { Product } from '../products/products.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const createOrderIntoDB = async (payload: TOrder) => {
  const session = await startSession();
  session.startTransaction();

  try {
    for (const cartItem of payload.o_cartItems) {
      const cartProduct = await Product.findById(cartItem.productId).session(
        session,
      );

      if (!cartProduct) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Falied to create order');
      }

      if (cartProduct.p_stock < cartItem.quantity) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          'Insufficient stock for product with id',
        );
      }

      cartProduct.p_stock -= cartItem.quantity;
      await cartProduct.save({ session });

      //create the order
      const result = await Orders.create([payload], { session });

      //commit the transaction
      await session.commitTransaction();
      session.endSession();

      return result;
    }
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const getAllOrderFromDB = async () => {
  const result = await Orders.find().populate("o_cartItems.productId").sort({createdAt:-1});

  return result;
};

export const OrdersServices = {
  createOrderIntoDB,
  getAllOrderFromDB,
};
