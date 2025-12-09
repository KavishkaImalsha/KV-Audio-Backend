import express from "express"
import {getUserDetails, registerUser, updateUser, userLogin} from "../controller/UserController.js"
import { UserAuthMiddleware } from "../middlewares/UserAuthMiddleware.js"

const userRoutes = express.Router()

userRoutes.post('/', registerUser)
userRoutes.post('/login', userLogin)
userRoutes.get('/userDetails', UserAuthMiddleware, getUserDetails)
userRoutes.put('/userUpdate', UserAuthMiddleware, updateUser)

export default userRoutes