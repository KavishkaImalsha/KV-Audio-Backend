import Order from "../model/Order.js"
import Product from "../model/Product.js"
import { UserAuth } from "../validations/UserAuth.js"

export const createOrder = async(request,response) => {
    const orderDetails = {products : []}
    let totalCost = 0
        
    UserAuth(request,response)
    const data = request.body
    const userData = request.user
    orderDetails.email = userData.email

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
        
        orderDetails.products.push({
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
        response.json({
            message: "Order place successfully"
        })
    }catch(error){
        response.json({
            error: "Error occured, Order not placed"
        })
    }
}