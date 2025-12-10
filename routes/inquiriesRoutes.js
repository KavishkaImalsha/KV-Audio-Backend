import express from 'express'
import { addInquiry, deleteInquiry, getInquiries, updateInquiry } from '../controller/InquiryController.js'
import { UserAuthMiddleware } from '../middlewares/UserAuthMiddleware.js'

const inquiriesRoutes = express.Router()

inquiriesRoutes.post('/', addInquiry)
inquiriesRoutes.get('/', UserAuthMiddleware, getInquiries)
inquiriesRoutes.delete('/:id', UserAuthMiddleware, deleteInquiry)
inquiriesRoutes.put('/:id', UserAuthMiddleware, updateInquiry)
export default inquiriesRoutes