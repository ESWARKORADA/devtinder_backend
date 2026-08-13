const express = require('express');
const connectDb = require('./config/database.js');
const User = require('./models/user.js');
const validations = require('./utils/validations.js');

const app = express();

app.use(express.json());

app.post('/singUp', async (req, res) => {
    try {
        const userObj = req.body;
        validations(userObj);

        const user = new User({
            firstName: userObj.firstName,
            secondName: userObj.secondName,
            emailId: userObj.emailId,
            password: userObj.password,
            age: userObj.age,
            gender: userObj.gender,
            about: userObj.about,
            skills: userObj.skills
        });

        await user.save();
        res.status(200).send("Inserted Successfully...");
    } catch (err) {
        console.log(err);
        res.status(500).send("Something Went Wrong...");
    }
});

app.get('/getUsers', async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).send({ users: users });
    } catch (err) {
        console.log(err);
        res.status(500).send("Something Went Wrong...");
    }
})

app.patch('/udateUser/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const userObj = req.body;
        // validations(userObj);

        const ALLOWED_KEYS = ["firstName", "secondName", "age", "gender", "about", "skills"]

        const isUpdateValid = Object.keys(userObj).every((K)=>{
            return ALLOWED_KEYS.includes(K);
        })


        if(!isUpdateValid){
            throw new Error("Update is not allowed");
        }

        if(userObj.skills.length > 10){
            throw new Error("Skills Cannot Be More Than 10")
        }

        const user = await User.findByIdAndUpdate(userId, userObj, {
            returnDocument: "after",
            runValidators: true
        });

        res.status(200).send({message: "updated Success Fully", data: user});

    } catch(err) {
        res.status(500).send("ERROR "+err.message);

    }
})

connectDb().then(() => {
    app.listen(5599);
    console.log('server is listening..')
}).catch((err) => {
    console.log(err);
})
