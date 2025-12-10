import User from "../model/User.js"
import Product from "../model/Product.js"
import Order from "../model/Order.js"

export const getAdminStat = async(request, response) => {
    try{
        const [totalCustomers, totalProducts, totalPendingOrders, revenueData, lowstockProducts, recentOrders] = await Promise.all([
            User.countDocuments({role: "customer"}),

            Product.countDocuments(),

            Order.countDocuments({isApproval: false}),

            Order.aggregate([
                {$match: {isApproval: true}},
                {$group: {_id: null, totalRevenue: {$sum: "$totalAmount"}}}
            ]),

            Product.find({quantity: {$lt: 3}})
            .select("name image quantity")
            .limit(5),

            Order.find()
            .limit(5)
        ])

        const totalRevenue = revenueData.length > 0 ? revenueData[0].totalRevenue : 0

        return response.status(200).json({
            totalCustomers,
            totalProducts,
            totalPendingOrders,
            totalRevenue,
            lowstockProducts,
            recentOrders
        })

    }catch(error){
        console.log(error);
        
        return response.status(500).json({
            message: "Faild to fetch admin stat data."
        })
    }
}