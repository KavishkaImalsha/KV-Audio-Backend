import express from "express"
import { addReview, getReviews } from "../controller/ReviewController.js"

const reviewRoutes = express.Router()

reviewRoutes.post('/', addReview)
reviewRoutes.get('/', getReviews)
//userRoutes.delete('/:reviewId/:email')

export default reviewRoutes