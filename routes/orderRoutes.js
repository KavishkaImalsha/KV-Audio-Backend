import express from "express"
import { createOrder } from "../controller/OrderController.js"

const orderRoutes = express.Router()

orderRoutes.post('/', createOrder)

export default orderRoutes