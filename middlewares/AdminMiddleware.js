export const AdminMiddelware = (request, response, next) => {
    if(request.user.role != 'admin'){
        return response.status(400).json({
            message : "You can't perform this action"
        })
    }
    next()
}