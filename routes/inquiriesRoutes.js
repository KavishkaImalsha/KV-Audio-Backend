import express from 'express'
import { addInquiry } from '../controller/InquiryController.js'

const inquiriesRoutes = express.Router()

inquiriesRoutes.post('/', addInquiry)

export default inquiriesRoutes