import express from "express"
import { addProduct } from "../controller/ProductController.js"

const productRoutes = express.Router()

productRoutes.post('/', addProduct)

export default productRoutes