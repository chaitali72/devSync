const express = require("express");
 const connectDB = require("./config/database");
 const User = require("./models/user")
const app = express();
const PORT = 3000;

app.use(express.json());

 app.post("/signup", async(req,res) => {

  console.log(req.body) // doing this sending JSOn server is nbot able to read JSON data so we need middleware
const user = new User(req.body);

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




