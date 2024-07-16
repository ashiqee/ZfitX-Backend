import { z } from "zod";

const TCartItemSchema = z.object({
    productId: z.string().nonempty("ID is required"),
    quantity: z.number().int().min(1, "Quantity must be at least 1")
  });
  
  // Define the TOrder schema
  const OrderSchemaValidation = z.object({
    body: z.object({
        o_firstName: z.string().nonempty("First name is required"),
        o_lastName: z.string(),
        o_email: z.string().email("Invalid email address"),
        o_phone: z.string().nonempty("Phone number is required"),
        o_address: z.string().nonempty("Address is required"),
        o_state: z.string(),
        o_city: z.string(),
        o_cartItems: z.array(TCartItemSchema).nonempty("Cart items cannot be empty")
      })
  });

  export const OrderValiadation = {
    OrderSchemaValidation,
  }