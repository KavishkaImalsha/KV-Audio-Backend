import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productId : {
        type : String,
        required : true,
        unique : true
    },
    name : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    category : {
        type : String,
        required : true,
        default : "Uncategorized"
    },
    dimension : {
        type : String,
        required : true
    },
    discription : {
        type : String,
        required : true
    },
    availability : {
        type : Boolean,
        required : true,
    },
    quantity : {
        type : Number,
        required : true
    },
    image : {
        type : [String],
        required : true,
        default : ['https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.shutterstock.com%2Fsearch%2Fdefault-image-icon%3Fimage_type%3Dvector&psig=AOvVaw23yFJQ7K5V0o6jzVDKWy_A&ust=1739815970868000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCJiDsNnlyIsDFQAAAAAdAAAAABAE']
    }
})

const Product = mongoose.model('products', productSchema)

export default Product