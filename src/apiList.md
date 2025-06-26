# DevSync APIs

#AuthRouter

POST /signup
POST /login
POST /logout 

##ProfileRouter
GET /profile/view
PATCH /profile/edit - update the profile 
PATCH /profile/forgotpassword - forgot password - check the existing password, bcrypt,  check if its strong  surrent password new password 


##ConnectionRequestRouter

 POST - /request/send/interested/:userId
 POST - /request/send/ignored/:userId
for that POST  /request/send/:status/:userId

 POST -/request/review/:accepted/:requestId
 POST - /request/review/:rejected/:requestId

 for that POST /request/review/:status/:requestId


#userRouter
GET    /user/requests
 GET  /user/connections
 GET  /requests/received
 GET  /feed  - get reandom profiles on feed 




 api status - ignore, interested, accepted , rejected

