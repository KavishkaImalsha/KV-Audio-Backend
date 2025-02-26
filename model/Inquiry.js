import mongoose from "mongoose";

const inquirySchema = new mongoose.Schema({
    id : {
        type : Number,
        required : true,
        unique : true
    },
    email : {
        type : String,
        required : true
    },
    phoneNumber : {
        type : String,
        required : true
    },
    message : {
        type : String,
        required : true
    },
    reply : {
        type : String,
        default : ""
    },
    isReply : {
        type : Boolean,
        required : true,
        default : false
    },
    date : {
        type : Date,
        required : true,
        default : Date.now
    }
})

const Inquiry = mongoose.model('inquries', inquirySchema)

export default Inquiry