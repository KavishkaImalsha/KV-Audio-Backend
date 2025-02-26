import Product from "../model/Product.js"
import { UserAuth } from "../validations/UserAuth.js"

export const addProduct = (request, response) => {
    //check there was token
    UserAuth(request, response)

    if(request.user.role != 'admin'){
        response.status(401).json({
             message : "User can't perform this action"
        })
        return
    }

    const productDetails = request.body
    const product = new Product(productDetails)
    product.save().then(() => {
        response.json({
            message : "Product add successfully"
        })
    }).catch((error) => {
        response.status(500).json({
            error : "Product not added"
        })
    })
}

export const getProducts = async (request, response) => {
    let isAdmin = true
    let products
    UserAuth(request, response)

    if(request.user.role != 'admin'){
        isAdmin = false
    }
    try{
        isAdmin ? products = await Product.find() : products = await Product.find({availability : true})
        response.json(products)
    }catch(error){
        response.status(500).json({
            message : "Invernal server error! Please try again."
        })
    }
}

export const updateProduct = async (request, response) => {
    const productId = request.params.productId
    UserAuth(request, response)

    try{
        if(request.user.role != 'admin'){
            response.status(401).json({
                message : "You can't perform this action"
            })
            return
        }
    
        await Product.updateOne({productId : productId}, request.body)

        response.json({
            message : "Product updated successfully"
        })
    }catch(error){
        response.status(500).json({
            message : "Invernal server error! Please try again."
        })
    }


}