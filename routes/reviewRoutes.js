import express from "express"
import { addReview, approveReview, deleteReview, getReviews } from "../controller/ReviewController.js"
import { UserAuthMiddleware } from "../middlewares/UserAuthMiddleware.js"

const reviewRoutes = express.Router()

reviewRoutes.post('/', UserAuthMiddleware,addReview)
reviewRoutes.get('/', UserAuthMiddleware,getReviews)
reviewRoutes.delete('/:reviewId/:email', UserAuthMiddleware,deleteReview)
reviewRoutes.put('/approve/:reviewId', approveReview)

export default reviewRoutes