import bycrypt from "bcrypt"
import User from "../model/User.js"
import jwt from "jsonwebtoken"

export const registerUser = (request, response) => {
    const userData = request.body

    userData.password = bycrypt.hashSync(userData.password, 10)
    const user = new User(userData)

    user.save().then(() => {
        response.json({
            message : "User registration successfully"
        })
    }).catch((error) => {
        response.status(500).json({
            error : "User not registered"
        })
    })
}

export const userLogin = (request, response) => {
    const credentials = request.body

    User.findOne({
        email : credentials.email
    }).then((user) => {
        if(user === null){
            response.status(404).json({
                message : "User not found"
            })
        }
        
        const isPasswordCorrect = bycrypt.compareSync(credentials.password, user.password)
        if(isPasswordCorrect){
            const token = jwt.sign({
                firstName : user.firstName,
                lastName : user.lastName,
                email : user.email,
                role : user.role
            }, "KV-Screate-20!")
            response.json({
                message : "User login successfully",
                token : token
            })
        }else{
            response.status(401).json({
                message : "Login failed"
            })
        }
    })
}