import express from "express"
import {deleteUser, getAllUsers, getUserDetails, registerUser, updateUser, userLogin} from "../controller/UserController.js"
import { UserAuthMiddleware } from "../middlewares/UserAuthMiddleware.js"
import { AdminMiddelware } from "../middlewares/AdminMiddleware.js"

const userRoutes = express.Router()

userRoutes.post('/', registerUser)
userRoutes.post('/login', userLogin)

userRoutes.get('/userDetails', UserAuthMiddleware, getUserDetails)
userRoutes.get('/allUsers', UserAuthMiddleware, AdminMiddelware, getAllUsers)

userRoutes.put('/userUpdate', UserAuthMiddleware, updateUser)

userRoutes.delete('/deleteUser/:userId', UserAuthMiddleware, AdminMiddelware, deleteUser)

export default userRoutes