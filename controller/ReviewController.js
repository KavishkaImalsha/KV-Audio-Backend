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