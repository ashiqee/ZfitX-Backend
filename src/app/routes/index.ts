import { Router } from "express";

import { ProductsRoutes } from "../modules/products/products.route";
import { OrdersRoutes } from "../modules/orders/orders.route";




const router = Router()





const moduleRoutes = [
    {
        path:"/products",
        route: ProductsRoutes,
    },
    {
        path:"/orders",
        route: OrdersRoutes,
    },

]


moduleRoutes.forEach((route)=>{
    router.use(route.path,route.route)
})


export default router;