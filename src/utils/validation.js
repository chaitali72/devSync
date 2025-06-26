const validator = require('validator');

const validateSignupData = (req) => {
    const {firstName, lastName, emailId, password} = req.body;

    if(!firstName || !lastName){

        throw new Error("name is not valid");
    }
    else if(!validator.isEmail(emailId)) {
        throw new Error("Invalid email format");
    }
    else if(!validator.isStrongPassword(password)) {
        throw new Error("Password must be strong");
    }
   
}

 const validateEditProfileData = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "emailId",
    "photoUrl",
    "gender",
    "age",
    "about",
    "skills",
  ];

  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field)
  );

  return isEditAllowed;
};


 module.exports = {
    validateSignupData, validateEditProfileData
 }