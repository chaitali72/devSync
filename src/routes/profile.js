const express = require("express");
const profileRouter = express.Router();
const bcrypt = require("bcrypt");
 const {userAuth} = require("../middlewares/auth");
const {validateEditProfileData} = require("../utils/validation");
const User = require("../models/user");

profileRouter.get("/profile/view",userAuth, async(req,res) => {
  try{
    const user  = req.user;
    res.send(user);
  } catch(err) {
    console.error("Error fetching user profile:", err);
    res.status(500).send("Internal Server Error");
  }
  // Assuming you have a middleware to authenticate the user and set req.user
 
   // Get userId from query parameters
}

  // res.send(user);
)
profileRouter.patch("/profile/edit", userAuth, async(req,res) => {

  try{
    if(!validateEditProfileData(req)) {
     throw new Error("Invalid Edit request");
    }

     const loggedInuser = req.user;
Object.keys(req.body).forEach((key) => (loggedInuser[key] = req.body[key]));
await loggedInuser.save();
res.json({
  message: `${loggedInuser.firstName} , Profile updated successfully`,
  user: loggedInuser,
})
    // res.send(`${loggedInuser.firstName} , Profile updated successfully`);
   console.log("User profile updated successfully:", loggedInuser);
      
  } catch(err) {
    res.status(400).send("Error:" + err.message);
  }
  // Assuming you have a middleware to authenticate the user and set req.user
 
   // Get userId from query parameters
}

  // res.send(user);
)



// Adjust path as needed

profileRouter.patch("/profile/forgotpassword", userAuth, async (req, res) => {
  try {
    const { password, NewPassword } = req.body;
    const userId = req.user._id;

    if (!password || !NewPassword) {
      return res.status(400).send("Current password and new password are required");
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).send("User not found");

    const isPasswordValid = await user.validatePassword(password); // Assuming validatePassword is defined in user model
    if (!isPasswordValid) {
      return res.status(401).send("Current password is incorrect");
    }

    const hashedNewPassword = await bcrypt.hash(NewPassword, 10);
    user.password = hashedNewPassword;
    await user.save();

    const token = await user.getJWT(); // Assuming getJWT is defined in user model

    res.cookie("token", token, {
      expires: new Date(Date.now() + 3600000), // 1 hour
      httpOnly: true,
    });

    console.log("Password updated successfully");
    res.send("Password updated successfully");
  } catch (err) {
    return res.status(400).send("ERROR: " + err.message);
  }
});

module.exports = profileRouter;