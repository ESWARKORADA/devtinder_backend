const validator = require('validator');

const singUpValidation = (userData)=>{
    if(!validator.isEmail(userData.emailId)){
        throw new Error("EmailId Must Be Valid..");
    }else if(!validator.isStrongPassword(userData.password)){
        throw new Error("Password Must Be strong..");
    }

}

module.exports = singUpValidation;
