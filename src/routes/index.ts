import { Router } from "express";
import usersRoutes from './api/users.routes'
import productRoutes from './api/product.routers'
import ordersRoutes from './api/orders.routes'

const routes = Router();
routes.use('/users', usersRoutes);
routes.use('/product', productRoutes);
routes.use('/orders', ordersRoutes);


export default routes;