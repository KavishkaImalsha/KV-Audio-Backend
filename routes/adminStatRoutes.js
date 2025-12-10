import express from "express"
import { getAdminStat } from "../controller/AdminStatController.js"
import { UserAuthMiddleware } from "../middlewares/UserAuthMiddleware.js"
import { AdminMiddelware } from "../middlewares/AdminMiddleware.js"

const adminStatRoutes = express.Router()

adminStatRoutes.get('/', UserAuthMiddleware, AdminMiddelware, getAdminStat)

export default adminStatRoutes