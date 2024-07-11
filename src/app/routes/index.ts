import { Router } from "express";

import { ProductsRoutes } from "../modules/products/products.route";




const router = Router()





const moduleRoutes = [
    {
        path:"/products",
        route: ProductsRoutes,
    },

]


moduleRoutes.forEach((route)=>{
    router.use(route.path,route.route)
})


export default router;