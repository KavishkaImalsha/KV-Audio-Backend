import Review from "../model/Review.js"
import VerifyAdminRole from "../validations/VerifyAdminRole.js"
import { UserAuth } from "../validations/UserAuth.js"

export const addReview = (request, response) => {
    UserAuth(request, response)

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

export const getReviews = (request, response) => {
    UserAuth(request, response)

    if(request.user.role === "admin"){
        Review.find().then((reviews) => {
            response.json(reviews)
        })
    }else{
        Review.find({isApproved : true}).then((reviews) => {
            response.json(reviews)
        })
    }
}

export const deleteReview = (request, response) => {
    const reviewId = request.params.reviewId
    const email = request.params.email

    UserAuth(request, response)
    
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