import express from "express"
import { confirmOrder, createOrder, deleteOrder, getOrders } from "../controller/OrderController.js"

const orderRoutes = express.Router()

orderRoutes.post('/', createOrder)

orderRoutes.get('/',getOrders)

orderRoutes.put('/:orderId',confirmOrder)

orderRoutes.delete('/:orderId', deleteOrder)
export default orderRoutes