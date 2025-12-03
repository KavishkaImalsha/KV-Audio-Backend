import express from "express"
import { addProduct, deleteProduct, getNewArrivals, getProduct, getProducts, updateProduct } from "../controller/ProductController.js"
import { UserAuthMiddleware } from "../middlewares/UserAuthMiddleware.js"

const productRoutes = express.Router()

productRoutes.post('/', UserAuthMiddleware,addProduct)

productRoutes.get('/', getProducts)
productRoutes.get('/newArrivals', getNewArrivals)
productRoutes.get('/:productId', getProduct)

productRoutes.put('/:productId', UserAuthMiddleware,updateProduct)

productRoutes.delete('/:productId', UserAuthMiddleware,deleteProduct)

export default productRoutes