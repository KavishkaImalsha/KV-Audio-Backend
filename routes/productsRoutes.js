import express from "express"
import { addProduct, getProducts } from "../controller/ProductController.js"

const productRoutes = express.Router()

productRoutes.post('/', addProduct)

productRoutes.get('/', getProducts)

export default productRoutes