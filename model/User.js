import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
    },
    role : {
        type : String,
        default : "customer"
    },
    firstName : {
        type : String,
        required : true,
    },
    lastName : {
        type : String,
        required : true,
    },
    phoneNumber : {
        type : String,
        required : true,
    },
    profilePicture : {
        type : String,
        required : true,
        default : "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.shutterstock.com%2Fsearch%2Fdefault-profile-image&psig=AOvVaw1dWQ_TEyWvcwiZISYXovvJ&ust=1739293557480000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCPi__8fLuYsDFQAAAAAdAAAAABAE"
    }
},
{
    timestamps : true
})

const User = mongoose.model('users', userSchema)

export default User