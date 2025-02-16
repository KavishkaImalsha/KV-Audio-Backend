import express from "express"
import { addReview, deleteReview, getReviews } from "../controller/ReviewController.js"

const reviewRoutes = express.Router()

reviewRoutes.post('/', addReview)
reviewRoutes.get('/', getReviews)
reviewRoutes.delete('/:reviewId/:email', deleteReview)

export default reviewRoutes