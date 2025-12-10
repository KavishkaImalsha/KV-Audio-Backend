import Review from "../model/Review.js"
import VerifyAdminRole from "../validations/VerifyAdminRole.js"

export const addReview = (request, response) => {
    const data = request.body

    data.email = request.user.email
    data.name = request.user.firstName + " " + request.user.lastName
    data.profilePicture = request.user.profilePicture

    const review = new Review(data)
    review.save().then(() => {
        response.json({
            message : "Review added successfully"
        })
    }
    ).catch((error) => {
        response.json({
            error : error
        })
    })

}

export const getReviews = async(request, response) => {
    try{
        if(request.user){
            if(request.user.role === "admin"){
                const allReviews = await Review.find()
                return response.status(200).json(allReviews)
            }   
        }

        const approvedReviews = await Review.find({isApproved : true})
        return response.status(200).json(approvedReviews)

    }catch(error){
        return response.status(500).json({
            message: "Reviews fetching fails"
        })
    }
}

export const deleteReview = (request, response) => {
    const reviewId = request.params.reviewId
    const email = request.params.email
    
    if(request.user.role == "admin"){
        Review.deleteOne({
            email : email,
            _id : reviewId
        }).then(() => {
            response.json({
                message : "Review deleted successfully"
            })
        }).catch((error) => {
            response.json({
                error : error
            })
        })
    }

    if(request.user.role == "customer"){
        if(request.user.email != email){
            response.status(401).json({
                message : "You can't perform this action"
            })
            return
        }

        Review.deleteOne({
            _id : reviewId,
            email : email
        }).then(() => {
            response.json({
                message : "Review deleted successfully"
            })
        }).catch((error) => {
            response.json({
                error : error
            })
        })
    }
    
}

export const approveReview = (request, response) => {
    const reviewId = request.params.reviewId

    VerifyAdminRole(request, response)

    Review.updateOne({
        _id : reviewId
    },{
        isApproved : true
    }).then(() => {
        response.json({
            message : "Review is approved successfully"
        })
    }).catch((error) => {
        response.json({
            error : error
        })
    })
}

// "_id": "67ab06753e2b81eb510261a0",
//         "email": "exampleuser@gmail.com",