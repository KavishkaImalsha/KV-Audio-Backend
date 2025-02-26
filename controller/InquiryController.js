import Inquiry from "../model/Inquiry.js"
import { isRoleCustomer } from "./UserController.js"

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