import express from "express"
import { addReview, approveReview, deleteReview, getReviews } from "../controller/ReviewController.js"
import { UserAuthMiddleware } from "../middlewares/UserAuthMiddleware.js"
import { AdminMiddelware } from "../middlewares/AdminMiddleware.js"

const reviewRoutes = express.Router()

reviewRoutes.post('/', UserAuthMiddleware,addReview)
reviewRoutes.get('/', getReviews)
reviewRoutes.delete('/:reviewId', UserAuthMiddleware, AdminMiddelware, deleteReview)
reviewRoutes.put('/approve/:reviewId', UserAuthMiddleware, AdminMiddelware, approveReview)

export default reviewRoutes