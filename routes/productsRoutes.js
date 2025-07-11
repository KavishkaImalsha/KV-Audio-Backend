import express from "express"
import { addProduct, deleteProduct, getNewArrivals, getProduct, getProducts, updateProduct } from "../controller/ProductController.js"

const productRoutes = express.Router()

productRoutes.post('/', addProduct)

productRoutes.get('/', getProducts)
productRoutes.get('/newArrivals', getNewArrivals)
productRoutes.get('/:productId', getProduct)

productRoutes.put('/:productId', updateProduct)

productRoutes.delete('/:productId', deleteProduct)

export default productRoutes