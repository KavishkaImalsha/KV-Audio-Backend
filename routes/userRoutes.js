import express from "express"
import {registerUser, userLogin} from "../controller/UserController.js"

const userRoutes = express.Router()

userRoutes.post('/', registerUser)
userRoutes.post('/login', userLogin)

export default userRoutes