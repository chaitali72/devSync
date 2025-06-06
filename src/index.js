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
  res.send("User Created Successfully");
}
catch(err) {
  console.error("Error creating user:", err);
  res.status(500).send("Internal Server Error");
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




