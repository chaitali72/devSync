const express = require("express");
const authRouter = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { validateSignupData } = require("../utils/validation");


 authRouter.post("/signup", async(req,res) => {
validateSignupData(req); // validate the data before creating a user
console.log("Request body:", req.body);
const { firstName, lastName, emailId, password,gender, age, photoUrl, skills } = req.body;
const hashedPassword = await bcrypt.hash(req.body.password, 10);

  console.log(req.body) // doing this sending JSOn server is nbot able to read JSON data so we need middleware
  const user = new User({
    firstName,
    lastName,
    emailId,
    password: hashedPassword, // Store the hashed password
    age,
    gender,
});


try {
  await user.save();
  console.log("User created successfully:", user);
  res.status(201).send({
    message: "User created Successfully",
    data: user
  })
}
catch(err) {
  console.error("Error creating user:", err);
  res.status(500).send("Internal Server Error");
}
});

authRouter.post("/login", async(req,res) => {
  try{
  const { emailId, password } = req.body;

  const user = await User.findOne({emailId: emailId });
  if(!user) {
    return res.status(400).send("Invalid Credentials");
  } 
   const ispasswordValid  = await user.validatePassword(password)

  if(ispasswordValid) {

const token = await user.getJWT(); // Create a JWT token with 1 hour expiration
console.log("JWT Token:", token);


    res.cookie("token", token , {
      expires: new Date(Date.now() + 3600000), // 1 hour expiration
    })

//create  JWT token using jwt

    console.log("User logged in successfully");
 res.status(200).send({
  message: "User Logged in Successfully",
  data: user
 }) 
  }
  else{
    throw new Error("Invalid Credentials");
  }
  } 
  catch(err){
    return res.status(400).json({ message: err.message || "Something went wrong" });
  }

  // authenticate the user with JWT token
  // add token to cookie 
    
});

authRouter.post("/logout", async(req,res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()), // Set expiration to the
  })
res.send("user logged out successfully");
})
 module.exports = authRouter;

 // user login with jwt and token 