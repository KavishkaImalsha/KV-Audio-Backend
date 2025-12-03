import express from "express"
import { confirmOrder, createOrder, deleteOrder, getOrders } from "../controller/OrderController.js"
import {UserAuthMiddleware} from "../middlewares/UserAuthMiddleware.js"

const orderRoutes = express.Router()

orderRoutes.post('/', UserAuthMiddleware, createOrder)

orderRoutes.get('/', UserAuthMiddleware, getOrders)

orderRoutes.put('/:orderId',confirmOrder)

orderRoutes.delete('/:orderId', deleteOrder)
export default orderRoutes