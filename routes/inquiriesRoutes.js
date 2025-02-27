import express from 'express'
import { addInquiry, getInquiries } from '../controller/InquiryController.js'

const inquiriesRoutes = express.Router()

inquiriesRoutes.post('/', addInquiry)
inquiriesRoutes.get('/', getInquiries)

export default inquiriesRoutes