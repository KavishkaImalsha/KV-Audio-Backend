import Order from "../model/Order.js"
import Product from "../model/Product.js"
import { isRoleAdmin, isRoleCustomer } from "./UserController.js"

export const createOrder = async(request,response) => {
    const orderDetails = {orderList : []}
    let totalCost = 0

    const data = request.body
    const userData = request.user
    orderDetails.email = userData.email
    console.log(data.products);
    

    const lastOrder = await Order.find().sort({orderDate: -1}).limit(1)

    if(lastOrder.length == 0){
        orderDetails.orderId = "ORD0001"
    }else{
        const lastOrderId = lastOrder[0].orderId
        const orderIdNum = lastOrderId.replace("ORD","")
        const newOrderNum = parseInt(orderIdNum) + 1
        const formattedCurrentNumber = String(newOrderNum).padStart(4, '0')
        const currentOrderId = 'ORD' + formattedCurrentNumber
        orderDetails.orderId = currentOrderId
    }

    for(const product of data.products){
        const productDetails = await Product.findOne({_id: product.productId})
        
        if(!productDetails){
            response.status(404).json({
                message: "Invalid product"
            })
            return
        }

        if(!productDetails.availability){
            response.status(400).json({
                message: "Product not available right now"
            })
            return
        }
        
        orderDetails.orderList.push({
            product: {
                productId: productDetails.productId,
                name: productDetails.name,
                image: productDetails.image[0],
                price: productDetails.price
            },
            quantity: product.quantity
        })

        totalCost += productDetails.price * product.quantity * data.days
        
        orderDetails.totalAmount = totalCost
    }

    orderDetails.days =  data.days
    orderDetails.startingDate = data.startingDate
    orderDetails.endingDate = data.endingDate
    
    try{
        const order = new Order(orderDetails)
        await order.save()
        return response.json({
            message: "Order place successfully"
        })
    }catch(error){
        return response.json({
            error: "Error occured, Order not placed"
        })
    }
}

export const getOrders = async(request, response) => {

    const userEmail = request.user.email

    try{
        if(isRoleAdmin(request)){
            const allOrders = await Order.find()

            return response.status(200).json({
                orders: allOrders 
            })
        }else if(isRoleCustomer(request)){
            const userOrders = await Order.find({email: userEmail})
            
            return response.status(200).json({
                orders: userOrders
            })
        }
    }catch(error){
        return response.status(500).json({
            error: "Somthing went wrong" 
        })
    }
} 

export const confirmOrder = async(request, response) => {
    const orderId = request.params.orderId

    try{
        if(isRoleAdmin(request)){
            const order = await Order.findOne({orderId: orderId})
            order.isApproval = true
            order.save()

            return response.status(200).json({
                message: "Order confirmed successful"
            })
        }
        return response.status(400).json({
            message: "You can't perform this action"
        })
    }catch(error){
        return response.status(500).json({
            message: "Something went wrong"
        })
    }
}

export const deleteOrder = async(request,response) => {
    const orderId = request.params.orderId

    try{
        if(isRoleAdmin(request)){
            await Order.deleteOne({orderId: orderId})
            return response.json({
                message: "Order delete successful"
            })
        }
        return response.json({
            message: "You can't perform this action"
        })
    }catch(error){
        return response.status(500).json({
            message: "Something went wrong"
        })
    }
}