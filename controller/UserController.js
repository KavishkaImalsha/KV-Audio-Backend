import bycrypt from "bcrypt"
import User from "../model/User.js"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()
export const registerUser = (request, response) => {
    const userData = request.body

    userData.password = bycrypt.hashSync(userData.password, 10)
    const user = new User(userData)

    user.save().then(() => {
        return response.status(200).json({
            message : "User registration successfully"
        })
    }).catch((error) => {
        return response.status(500).json({
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
            return response.status(404).json({
                message : "User not found"
            })
        }
        
        const isPasswordCorrect = bycrypt.compareSync(credentials.password, user.password)
        if(isPasswordCorrect){
            const token = jwt.sign({
                firstName : user.firstName,
                lastName : user.lastName,
                email : user.email,
                role : user.role,
                profilePicture : user.profilePicture,
                phoneNumber : user.phoneNumber
            }, process.env.ENC_PASS)
            return response.json({
                message : "User login successfully",
                token : token,
                user: user
            })
        }else{
            return response.status(401).json({
                message : "Login failed"
            })
        }
    }).catch((error) => {
        return response.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    })
}

export const getUserDetails = async(request, response) => {
    try{
        const user = await User.findOne({email: request.user.email})

        return response.status(200).json(user)
    }catch(error){
        return response.json({
            message: "User data fetch faild"
        })
    }
    
}

export const updateUser = async(request,response) => {
    try{
        const filter = {email: request.user.email}
        const updateUserData = request.body

        const user = await User.findOneAndUpdate(filter, updateUserData, {
            new: true,
            runValidators: true
        })

        return response.status(200).json({
            message: "User update succesfully"
        })
    }catch(error){
        return response.json({
            message: "User update faild"
        })
    }
    
}

export const getAllUsers = async(request, response) => {
    try{
        const users = await User.find()

        return response.status(200).json(users)
    }catch(error){
        return response.status(500).json({
            message : "Faild to fetch user data"
        })
    }
}

export const deleteUser = async(request, response) => {
    const userId = request.params.userId

    try{
        await User.deleteOne({_id: userId})

        return response.status(200).json({
            message: "User delete succesfully"
        })
    }catch(error){
        return response.status(500).json({
            message: "Operation is faild, User not deleted"
        })
    }

}

export const isRoleAdmin = (request) => {
    let isAdmin = false

    if(request.user.role == 'admin'){
        isAdmin = true
    }

    return isAdmin
}

export const isRoleCustomer = (request) => {
    let isCustomer = false

    if(request.user.role == 'customer'){
        isCustomer = true
    }

    return isCustomer
}