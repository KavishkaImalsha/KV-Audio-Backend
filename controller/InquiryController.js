import Inquiry from "../model/Inquiry.js"
import { isRoleAdmin, isRoleCustomer } from "./UserController.js"

export const addInquiry = async(request, response) => {
    try{
        if(isRoleCustomer(request)){
            const data = request.body
            data.email = request.user.email
            data.name = request.user.firstName + " " + request.user.lastName
            data.phoneNumber = request.user.phoneNumber

            const lastRecord = await Inquiry.find().sort({id : -1}).limit(1)
            
            lastRecord.length == 0 ? data.id = 1 : data.id = lastRecord[0].id + 1
            
            const newInquiry = new Inquiry(data)

            const inquirySaveResp = await newInquiry.save()

            return response.json({
                message : "Inquiry successfully added"
            })   
        }else{
            return response.status(401).json({
                message : "You can't perform this action"
            })
        }
    }catch(error){
        console.error("❌ BACKEND ERROR:", error);
        return response.status(500).json({
            message : "Internal server error"
        })
    }
}

export const getInquiries = async (request, response) => {
    try{
        let inquries
        if(isRoleCustomer(request)){
            inquries = await Inquiry.find({email : request.user.email})
        }
        else if(isRoleAdmin(request)){
            inquries = await Inquiry.find()
        }

        return response.json({
            inquiries : inquries
        })
    }catch(error){
        return response.status(500).json({
            message : "Internal server error"
        })
    }
}

export const deleteInquiry = async (request, response) => {
    try{
        const inquiryId = request.params.id

        if(isRoleAdmin(request)){
            await Inquiry.deleteOne({id : inquiryId})

            return response.json({
                message : "Inquiry successfully deleted"
            })
        }else if(isRoleCustomer(request)){
            const inquiry = await Inquiry.find({id : inquiryId})
            
            if(inquiry.length != 0){
                if(inquiry[0].email == request.user.email){
                    await Inquiry.deleteOne({id : inquiryId})

                    return response.json({
                        message : "Inquiry successfully deleted"
                    })
                }else{
                    return response.status(403).json({
                        message : "You are not authorize to perform this action"
                    })
                }
            }else{
                return response.status(404).json({
                    message : "Inquiry not found"
                })
            }
        }
    }catch(error){
        return response.status(500).json({
            message : "Internal server error"
        })
    }
}

export const updateInquiry = async(request, response) => {
    try{
        const inquiryId = request.params.id
        const data = request.body

        if(isRoleAdmin(request)){
            await Inquiry.updateOne({id : inquiryId}, data)

            return response.json({
                message : "Inquiry successfully updated"
            })
        }else if(isRoleCustomer(request)){
            const inquiry = await Inquiry.find({id : inquiryId})
            
            if(inquiry.length != 0){
                if(inquiry[0].email == request.user.email){
                    await Inquiry.updateOne({id : inquiryId}, {message : data.message})

                    return response.json({
                        message : "Inquiry successfully updated"
                    })
                }else{
                    return response.status(403).json({
                        message : "You are not authorize to perform this action"
                    })
                }
            }else{
                return response.status(404).json({
                    message : "Inquiry is not found"
                })
            }
        }
    }catch(error){
        return response.status(500).json({
            message : "Internal server error"
        })
    }
}