const express = require('express');
const authRouter = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const validations = require('../utils/validations');

authRouter.post('/singUp', async (req, res) => {
    try {
        const userObj = req.body;
        validations(userObj);

        const hashPassword = await bcrypt.hash(userObj.password, 10);

        const user = new User({
            firstName: userObj.firstName,
            secondName: userObj.secondName,
            emailId: userObj.emailId,
            password: hashPassword,
            age: userObj.age,
            gender: userObj.gender,
            about: userObj.about,
            skills: userObj.skills
        });

        await user.save();
        res.status(200).send("Inserted Successfully...");
    } catch (err) {
        console.log(err);
        res.status(500).send("Something Went Wrong... " + err.message);
    }
});

authRouter.post('/login', async (req, res) => {
    try {
        const credentials = req.body;
        const user = await User.findOne({ emailId: credentials.emailId });

        if (!user) {
            return res.status(404).send({ message: "User Not Found.." });
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

        if (isPasswordValid) {
            const token = await user.getJwt();
            res.cookie('token', token);
            res.status(200).send({ message: 'Proceed to login', data: user });
        } else {
            res.status(401).send({ message: "Invalid credentials" });
        }

    } catch (err) {
        console.log(err);
        res.status(500).send("ERROR " + err.message);
    }
});

module.exports = authRouter;