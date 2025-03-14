import express from "express"
import { addProduct, deleteProduct, getProducts, updateProduct } from "../controller/ProductController.js"

const productRoutes = express.Router()

productRoutes.post('/', addProduct)

productRoutes.get('/', getProducts)

productRoutes.put('/:productId', updateProduct)

productRoutes.delete('/:productId', deleteProduct)

export default productRoutes