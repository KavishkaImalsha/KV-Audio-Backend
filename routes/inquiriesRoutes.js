import express from 'express'
import { addInquiry, deleteInquiry, getInquiries } from '../controller/InquiryController.js'

const inquiriesRoutes = express.Router()

inquiriesRoutes.post('/', addInquiry)
inquiriesRoutes.get('/', getInquiries)
inquiriesRoutes.delete('/:id', deleteInquiry)
export default inquiriesRoutes