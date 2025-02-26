import express from "express"
import { addProduct, getProducts, updateProduct } from "../controller/ProductController.js"

const productRoutes = express.Router()

productRoutes.post('/', addProduct)

productRoutes.get('/', getProducts)

productRoutes.put('/:productId', updateProduct)

export default productRoutes