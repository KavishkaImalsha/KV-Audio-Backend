import Review from "../model/Review.js"

export const addReview = (request, response) => {
    if(request.user == null){
        response.status(401).json({
            message : "Unauthorize user please login again"
        })
        return
    }

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
    if(request.user == null){
        response.status(401).json({
            message : "Unauthorize user please login again"
        })
        return
    }

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