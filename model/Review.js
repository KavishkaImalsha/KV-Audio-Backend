import mongoose from "mongoose"

const reviewSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
    },
    name : {
        type : String,
        required : true
    },
    comment : {
        type : String,
        required : true,
    },
    rating : {
        type : String,
        required : true
    },
    isApproved : {
        type : Boolean,
        required : true,
        default : false
    },
    profilePicture : {
        type : String,
        required : true,
        default : "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.shutterstock.com%2Fsearch%2Fdefault-profile-image&psig=AOvVaw1dWQ_TEyWvcwiZISYXovvJ&ust=1739293557480000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCPi__8fLuYsDFQAAAAAdAAAAABAE"
    }
})

const Review = mongoose.model('reviews', reviewSchema)

export default Review