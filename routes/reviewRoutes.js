import express from "express"
import { addReview } from "../controller/ReviewController.js"

const reviewRoutes = express.Router()

reviewRoutes.post('/', addReview)

export default reviewRoutes