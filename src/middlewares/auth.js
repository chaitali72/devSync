const adminAuth = (req,res,next)=> {
    console.log("admin middleware called");
    const token = 'xyz';
    const isAdminAuthorized = token === 'xyz';
    if(!isAdminAuthorized){
        res.status(401).send("Unauthorized request");
    }
    else{
        next();
    }
}