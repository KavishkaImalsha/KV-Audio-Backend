import express from "express"
import { createOrder, getOrders } from "../controller/OrderController.js"

const orderRoutes = express.Router()

orderRoutes.post('/', createOrder)

orderRoutes.get('/',getOrders)
export default orderRoutes