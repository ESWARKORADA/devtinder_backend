const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: [4, 'You must enter minimum of 4 charaters for first name'],
        maxLength: [100, 'You are only allowed to enter 100 characters maximum for first name']
    },
    secondName: {
        type: String
    },
    emailId: {
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
        type: Number,
        min: [4, 'Age must be at least 4'],
        max: [150, 'Age cannot exceed 150']
    },
    gender: {
        type: String,
        validate(value) {
            if (!["Male", "Female", "Others"].includes(value)) {
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


userSchema.methods.getJwt = async function () {
    const user = this;
    const token = jwt.sign({_id: user._id}, "Eswarstark5599");
    return token;
}

module.exports = mongoose.model("User", userSchema);