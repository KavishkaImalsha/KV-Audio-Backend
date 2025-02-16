export const UserAuth = (request, response) => {
    if(request.user == null){
        response.status(401).json({
            message : "Unauthorize user please login again"
        })
        return
    }
}