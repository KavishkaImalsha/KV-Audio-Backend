import Product from "../model/Product.js"
import { UserAuth } from "../validations/UserAuth.js"
import { isRoleAdmin } from "./UserController.js"

export const addProduct = (request, response) => {
    //check there was token
    UserAuth(request, response)

    //VerifyAdminRole(request, response)

    const productDetails = request.body
    if(isRoleAdmin(request)){
        const product = new Product(productDetails)
        product.save().then(() => {
            return response.json({
                message : "Product add successfully"
            })
        }).catch((error) => {
            return response.status(500).json({
                message : "Product not added"
            })
        })
    }
    return response.status(400).json({
        message: "You can't perform this action"
    })
}

export const getProducts = async (request, response) => {
    let products

    try{
        if(request?.user?.role === 'admin'){
            products = await Product.find()
        }else{
            products = await Product.find({availability : true})
        }
        return response.json(products)
    }catch(error){
        return response.status(500).json({
            message : "Invernal server error! Please try again."
        })
    }
}

export const updateProduct = async (request, response) => {
    const productId = request.params.productId
    UserAuth(request, response)

    try{
        if(isRoleAdmin(request)){
            await Product.updateOne({productId : productId}, request.body)

            return response.json({
                message : "Product updated successfully"
            })
        }
        return response.status(400).json({
            message: "You can't perform this action"
        })
        
    }catch(error){
        return response.status(500).json({
            message : "Invernal server error! Please try again."
        })
    }
}

export const deleteProduct = async(request, response) => {
    const productId = request.params.productId

    UserAuth(request, response)

    try{
        if(isRoleAdmin(request)){
            await Product.deleteOne({_id: productId})

            return response.json({
                message: "Product successfully delete"
            })
        }
        return response.status(400).json({
            message: "You can't perform this action"
        })
    }catch(error){
        response.status(500).json({
            message: "Invernal server error! Please try again."
        })
    }
}

export const getProduct = async(request, response) => {
    try{
        const productId = request.params.productId
        
        const product = await Product.findOne({_id: productId})
        response.json(product)
    }catch(error){
        response.status(500).json({
            error : error
        })
    }
}