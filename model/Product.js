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
    }
})

const Product = mongoose.model('products', productSchema)

export default Product