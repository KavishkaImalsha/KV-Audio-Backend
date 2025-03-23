const VerifyAdminRole = (request, response) => {
    if(request.user.role != 'admin'){
        response.json({
            message : "You can't perform this action" 
        })
        return
    }
}

export default VerifyAdminRole