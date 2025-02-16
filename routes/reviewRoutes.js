import express from "express"
import { addReview, approveReview, deleteReview, getReviews } from "../controller/ReviewController.js"

const reviewRoutes = express.Router()

reviewRoutes.post('/', addReview)
reviewRoutes.get('/', getReviews)
reviewRoutes.delete('/:reviewId/:email', deleteReview)
reviewRoutes.put('/approve/:reviewId', approveReview)

export default reviewRoutes