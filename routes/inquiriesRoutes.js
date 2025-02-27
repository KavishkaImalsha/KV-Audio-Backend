import express from 'express'
import { addInquiry, deleteInquiry, getInquiries, updateInquiry } from '../controller/InquiryController.js'

const inquiriesRoutes = express.Router()

inquiriesRoutes.post('/', addInquiry)
inquiriesRoutes.get('/', getInquiries)
inquiriesRoutes.delete('/:id', deleteInquiry)
inquiriesRoutes.put('/:id', updateInquiry)
export default inquiriesRoutes