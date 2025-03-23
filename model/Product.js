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
        default : ['https://cdn.vectorstock.com/i/500p/33/47/no-photo-available-icon-default-image-symbol-vector-40343347.jpg']
    }
})

const Product = mongoose.model('products', productSchema)

export default Product