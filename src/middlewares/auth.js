const User = require("../models/user")
const jwt = require("jsonwebtoken");
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

const userAuth = async (req, res, next) => {
    try {
const cookies = req.cookies;
const {token} = cookies; // Extract the token from cookies
if (!token) {
    return res.status(401).send("Unauthorized: No token provided");
  }
  const decoded = jwt.verify(token, "Devsnest$790"); // Verify the token
  const {_id} = decoded;
   const user = await User.findById(_id); // Assuming req.user is set by a middleware
    if (!user) {
      throw new Error("User not found");
    } 
   req.user = user; // Attach user to the request object
    next(); // Call the next middleware or route handler
    }
    catch (err) {
        console.error("Error in userAuth middleware:", err);
        res.status(500).send("Internal Server Error");
    }
}
module.exports = {
    adminAuth,
    userAuth
};

 