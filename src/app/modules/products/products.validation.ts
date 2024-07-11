import { z } from "zod";


// p_ means Product 

const createProductValidationSchema = z.object({
    body: z.object({
        p_name: z.string().nonempty({message:'Product name is required'}),
        p_description: z.string().nonempty({message:'Product description is required'}),
        p_category: z.string().nonempty({message:'Category is required'}),
        p_images: z.array(z.string()).nonempty({message:'Images is required'}),
        p_price:z.number().min(0,{message:"price must be 0 to start"}),
        p_stock:z.number().min(0,{message:'Minimum 1 product is required'})

    })
})
const updateProductValidationSchema = z.object({
    body: z.object({
        p_name: z.string().optional(),
        p_description: z.string().optional(),
        p_category: z.string().optional(),
        p_images: z.array(z.string()).optional(),
        p_price:z.number().min(0,{message:"price must be 0 to start"}).optional(),
        p_stock:z.number().optional()

    })
})




export const  ProductValidation = {
    createProductValidationSchema,
    updateProductValidationSchema
}