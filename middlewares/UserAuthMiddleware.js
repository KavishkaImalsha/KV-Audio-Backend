export const UserAuthMiddleware = (request, response, next) => {
    if(request.user == null){
        return response.status(401).json({
            message : "Unauthorize user please login again"
        });
    }
    next(); 
}