const express = require("express");
 const connectDB = require("./config/database");
 const User = require("./models/user")
const app = express();
const bcrypt = require("bcrypt");
const PORT = 3000;
const {validateSignupData} = require("./utils/validation")
app.use(express.json());
const jwt = require("jsonwebtoken");
const cookieparser = require("cookie-parser");
app.use(cookieparser());
 app.post("/signup", async(req,res) => {
validateSignupData(req); // validate the data before creating a user
console.log("Request body:", req.body);
const { firstName, lastName, emailId, password, age, photoUrl, skills } = req.body;
const hashedPassword = await bcrypt.hash(req.body.password, 10);

  console.log(req.body) // doing this sending JSOn server is nbot able to read JSON data so we need middleware
  const user = new User({
    firstName,
    lastName,
    emailId,
    password: hashedPassword, // Store the hashed password
    age,
    photoUrl,
    skills
});


try {
  await user.save();
  console.log("User created successfully:", user);
  res.send("User Created Successfully");
}
catch(err) {
  console.error("Error creating user:", err);
  res.status(500).send("Internal Server Error");
}
});


//login api
app.post("/login", async(req,res) => {
  try{
  const { emailId, password } = req.body;

  const user = await User.findOne({emailId: emailId });
  if(!user) {
    return res.status(400).send("Invalid Credentials");
  } 
   const ispasswordValid  = await bcrypt.compare(password, user.password);
  if(ispasswordValid) {
const token = await jwt.sign({_id: user._id} , "Devsnest$790")
console.log("JWT Token:", token);
    res.cookie("token", token)

//create  JWT token using jwt

    console.log("User logged in successfully");
    res.send("User logged in successfully");
   
  }
  else{
    throw new Error("Invalid Credentials");
  }
  } 
  catch(err){
    return res.status(400).send("ERROR:" + err.message);
  }

  // authenticate the user with JWT token
  // add token to cookie 
    
});

app.get("/profile", async(req,res) => {
  try{
 const cookies = req.cookies;
const {token} = cookies; // Extract the token from cookies
if (!token) {
    return res.status(401).send("Unauthorized: No token provided");
  }
  const decoded = jwt.verify(token, "Devsnest$790"); // Verify the token
  const {_id} = decoded; // Extract user ID from the decoded token

  // console.log("Cookies:", cookies);
  // res.send("reading cookie")
   const user = await User.findById(_id); // Assuming req.user is set by a middleware
  if (!user) {
    throw new Error("User not found");
  } 
  res.send(user);
}
catch(err) {
    console.error("Error fetching user profile:", err);
    res.status(500).send("Internal Server Error");
  }
  // Assuming you have a middleware to authenticate the user and set req.user
 
   // Get userId from query parameters
}

  // res.send(user);
)
 // find user by email 
 app.get("/user", async(req,res) => {
  const email = req.body.emailId;
try {
  console.log("Email ID:", email);
   const user =  await  User.findOne({ emailId: email });
   if(!user){
    res.status(400).send("User not found")
   }
  if(user.length === 0 ) {
res.status(404);
res.send("User not found")
  }  else {
    res.status(200);
    res.send(user);
  }
}
catch(err) {
   res.status(400).send("user not found");
}
 });

 //find user by findbyId()
app.get("/user/:id", async(req,res) => {
  const userId = req.params.id;
  try {
    console.log("User ID:", userId);
    const user = await User.findById(userId);
    if(!user){
      res.status(400).send("User not Found");
    }
    else{
      res.status(200);
      res.send(user);
    }

  } catch(err){
    res.status(400).send("error fetchjng user by ID");
  }
})

//CRUD oprtaions for user update
app.patch("/user/:userId", async (req,res) => {
  const userId = req.params?.userId; // Assuming userId is passed in the request body
const data = req.body;

try {
    const allowedUpdates = ["skills" , "age", "gender", "photoUrl"];
  const isupdateAllowed = Object.keys(data).every((key) => 
    allowedUpdates.includes(key))

  if(!isupdateAllowed) {
    console.log("Invalid update operation");
    throw new Error("Invalid update operation");
  }
  if(data.skills.length > 10 ){
    throw new Error("Skills cannot exceed 10 characters");
  }
  console.log("Data to update:", data);
  // console.log("User ID:", userId);
 const user = await User.findByIdAndUpdate({_id: userId}, data , {
  new: true, // Returns the updated document
  returnDocument: "after", // Returns the updated document
});
console.log("User updated successfully");
console.log(user);
res.send("User updated successfully");

} catch(error){
res.status(400).send("Error updating User");

}
})

//allowed updates 
//Delete name
 app.delete("/user", async(req,res) => {
  const userId = req.body.userId
try{
  const user = await User.findByIdAndDelete(userId);
  res.status(200).send("User deleted successfully");
}
catch(error){
  res.status(400).send("error deleting user");
} })

// get all the users  from the database - feed api 
app.get("/feed" ,async(req,res) => {
try {
  const users = await User.find({})
  res.send(users);
  res.status(200);
} catch(err) {
  console.error("Error fetching users:", err);
  res.status(400).send("Internal Server Error");
}

 
});

  // how to use a middleware 
//   const user =  new User({
//     firstName: "sonali",
//     lastName: "solanki",
//     emailId: "ss@gmail.com",
//     password: "12345"
//   });

//   try{
//     //need to create a instance of this userModel
//    //creating a new instance of the User model
// // const user = new User(userObj)
// await user.save();
// res.send("User Created Successfully");
//  }
//   catch(err) {
//     console.error("Error creating user:", err);
//     res.status(500).send("Internal Server Error");
//   }

  

connectDB()
.then(() => {
    console.log("Connected to MongoDB successfully");
    app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
}
);
}).catch((err) => {
    console.error("Error connecting to MongoDB:", err);
})




