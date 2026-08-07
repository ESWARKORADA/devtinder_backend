const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    secondName: {
        type : String
    },
    emailId:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String
    },
    age: {
        type: Number
    },
    gender: {
        type: String,
        validate(value){
            if(!["Male", "Female", "Others"].includes(value)){
                throw new Error("Gender data is not valid");
            }
        }
    },
    about: {
        type: String,
        default: 'This is a default value of about'
    },
    skills: {
        type: [String]
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);