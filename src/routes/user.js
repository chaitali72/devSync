const express = require("express");

const userRouter = express.Router();
const User = require("../models/user");
const {userAuth} = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");

const SENDER_DATA = ["firstName", "lastName", "photoUrl", "emailId", "about", "age", "skills"];
//get all the pending connection requests
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId",SENDER_DATA);

//    console.log("Logged In User:", loggedInUser);
    res.json({
      message: "Data fetched successfully",
      data: connectionRequests,
    });
    console.log("Connection Requests:", connectionRequests);
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

//return all the connections the accepted ones 
userRouter.get("/user/connections", userAuth, async(req,res) => {
try{

    const loggedInUser = req.user;
    const connectionRequest = await ConnectionRequest.find({
       $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    }).populate("fromUserId", SENDER_DATA)
      .populate("toUserId", SENDER_DATA)

      const data = connectionRequest.map((row) => {
        if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
      })
    res.json({
        message: "Connections fetched successfully",
        data,
    })

} catch(err){
    res.status(400).send("Error "+ err.message);
}
})

//user/feed

userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    //user should not see his own card
    //see all the users except the users who are already connected 
    //ignored people by the logged in user
// his connections
// example  Rahul   - [mark,donald,ms dhoni, virat]
// /feed?page=1&limit=10 then forst 1 to 1- users
//  /feed?page=2&limit=10 then forst 11 to 20 - users


const loggedInUser = req.user;
const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 50 ? 50 : limit;
    const skip = (page - 1) * limit;

 const connectionRequest = await ConnectionRequest.find({
  $or: [{fromUserId: loggedInUser._id,
    toUserId: loggedInUser._id
  }]
 }).select("fromUserId toUserId");

  const hideUsersFromFeed = new Set();
    connectionRequest.forEach((req) => {
      hideUsersFromFeed.add(req.fromUserId.toString());
      hideUsersFromFeed.add(req.toUserId.toString());
    });
    //$nin -  not in array
const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUsersFromFeed) } },  
        { _id: { $ne: loggedInUser._id } },
      ],
    })
      .select(SENDER_DATA)
      .skip(skip)
      .limit(limit);
      res.json({
       data:users
       })
  }
  catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
  
});

 module.exports = userRouter;
 