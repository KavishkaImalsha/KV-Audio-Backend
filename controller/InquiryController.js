import Inquiry from "../model/Inquiry.js"
import User from "../model/User.js"
import { UserAuth } from "../validations/UserAuth.js"
import { isRoleAdmin, isRoleCustomer } from "./UserController.js"

export const addInquiry = async(request, response) => {
    try{
        if(isRoleCustomer(request)){
            const data = request.body
            data.email = request.user.email
            data.phoneNumber = request.user.phoneNumber

            const lastRecord = await Inquiry.find().sort({id : -1}).limit(1)
            
            lastRecord.length == 0 ? data.id = 1 : data.id = lastRecord[0].id + 1
            
            const newInquiry = new Inquiry(data)

            const inquirySaveResp = await newInquiry.save()

            response.json({
                message : "Inquiry successfully added"
            })   
        }else{
            response.status(401).json({
                message : "You can't perform this action"
            })
        }
    }catch(error){
        response.status(500).json({
            message : "Internal server error"
        })
    }
}

export const getInquiries = async (request, response) => {
    try{
        UserAuth(request, response)
        let inquries
        if(isRoleCustomer(request)){
            inquries = await Inquiry.find({email : request.user.email})
        }
        else if(isRoleAdmin(request)){
            inquries = await Inquiry.find()
        }

        response.json({
            inquiries : inquries
        })
    }catch(error){
        response.status(500).json({
            message : error
        })
    }
}

export const deleteInquiry = async (request, response) => {
    try{
        UserAuth(request, response)

        const inquiryId = request.params.id

        if(isRoleAdmin(request)){
            await Inquiry.deleteOne({id : inquiryId})

            response.json({
                message : "Inquiry successfully deleted"
            })
        }else if(isRoleCustomer(request)){
            const inquiry = await Inquiry.find({id : inquiryId})
            
            if(inquiry){
                if(inquiry[0].email == request.user.email){
                    await Inquiry.deleteOne({id : inquiryId})

                    response.json({
                        message : "Inquiry successfully deleted"
                    })
                }else{
                    response.status(403).json({
                        message : "You are not authorize to perform this action"
                    })
                }
            }else{
                response.status(404).json({
                    message : "Inquiry not found"
                })
            }
        }
    }catch(error){
        response.status(500).json({
            message : error
        })
    }
}