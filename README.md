Created a cluster
Create Schema and models
create a free cluster and then connect your app to the database 
create schemas and models
build apis such as /signup


send json data to server , server should read the data and it should be added in the database (standard way to handle req, res data)
diff between JS object vs JSON (research)
add the express.josn() middleware to your app
 make your signup api dynacally receive the data from the end user or postman (whoever is hitting your api)

  create the GET api - GET  FEEd API // get all the users from the database 


diff between find() vs findOne()
findOne() - only return one object 
find() - simply returns same data contain array 

create an api - findbyId()  - get user find by id 
CRUP opration
data snitization and validation you hav eto sanitize the data before you passing into it 
19/6
validate apis
add validation to skills
task - add api level validation on patch request and sign up post api
data sanitising - add api validation for each field
for validation we are using - npm validator - you can add db level validaton or api level validation
npm validator library functions and use lubrary use for emaila nd password   
never trust req.body
add authentication 
to encrypt the password - use npm bcrypt library 
create login api - validate data and compare passwords

JWT / jwt tokens/ cookies/ sessions / auth middleware - authenticate users on every request 
Jwt - generated by Token  
 whenever a user login -> server create a token -> validate itand and user can able to login 
 then after whenever user request other apis -? server just validates a cookie that has token -> if its same then can able to login 
 install cookie-parser
 login injects the cookie to the browser or the client 
 jwt.io- website
  add auth middleware - we need our all api's secure 

add the userAuth middleware in profile api and new sendConnectionRequest API
read the cookies inside ypur profile api and find the logged in user 
set the expiry of JWT and cookies to 7 days


   API STructure and crud OPERATIONS
   
   POST /signup
   POST  / login 
   GET /profile
   POST /profile
   PATCH /profile - update profile
   DELETE /profile 
    POST /send request  - STATUS CAN BE IGNORE /  INTERESTED 
    POST /reviewrequest - accept or reject
    GET /requests
    GET /connections

     - schema methods in mongoose // moogose schema methods

     
     - Explore the $nin, $and and $ne quesry paramaters
     - pagination
-explore skip() and limit() function 

