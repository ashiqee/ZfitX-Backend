"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const products_route_1 = require("../modules/products/products.route");
const orders_route_1 = require("../modules/orders/orders.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/products",
        route: products_route_1.ProductsRoutes,
    },
    {
        path: "/orders",
        route: orders_route_1.OrdersRoutes,
    },
];
moduleRoutes.forEach((route) => {
    router.use(route.path, route.route);
});
exports.default = router;
