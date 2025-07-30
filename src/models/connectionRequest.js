const mongoose = require('mongoose');

 const coonectionRequestSchema = new mongoose.Schema({
fromUserId: {
    type: mongoose.Schema.Types.ObjectId,
required: true,
ref: "User", // Reference to the User model
},
toUserId: {
    type: mongoose.Schema.Types.ObjectId,
 required: true,
ref: "User", // Reference to the User model
},
status: {
    type:String,
    required: true,
enum: ["ignored", "interested", "accepted", "rejected"],
message: `{VALUE} is incorrect status type`,
},
 },
 {
timestamps: true
 })

  coonectionRequestSchema.pre("save", function(next){
    const connectionRequest = this;
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
        return next(new Error("You cannot send a connection request to yourself"));
    }
    next();
  })

const ConnectionRequest =  new mongoose.model("ConnectionRequest", coonectionRequestSchema);

 module.exports = ConnectionRequest;