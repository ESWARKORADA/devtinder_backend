const express = require('express');
const connectDb = require('./config/database.js');
const User = require('./models/user.js');
const validations = require('./utils/validations.js');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
var jwt = require('jsonwebtoken');
const { validateToken } = require('./middlewares/auth.js');
const authRouter = require('./routes/authRoutes.js');

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/authRouter', authRouter);

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

        const isUpdateValid = Object.keys(userObj).every((K) => {
            return ALLOWED_KEYS.includes(K);
        })


        if (!isUpdateValid) {
            throw new Error("Update is not allowed");
        }

        if (userObj.skills.length > 10) {
            throw new Error("Skills Cannot Be More Than 10")
        }

        const user = await User.findByIdAndUpdate(userId, userObj, {
            returnDocument: "after",
            runValidators: true
        });

        res.status(200).send({ message: "updated Success Fully", data: user });

    } catch (err) {
        res.status(500).send("ERROR " + err.message);

    }
})

app.get('/getProfile', validateToken, async (req, res) => {

    try {
        const decodedToken = jwt.verify(req.cookies.token, 'Eswarstark5599');

        const getUser = await User.findOne({ _id: decodedToken._id });

        res.status(200).send({ user_data: getUser });
    } catch (err) {
        console.log(err);
        res.status(500).send("ERROR " + err.message);
    }
})


connectDb().then(() => {
    app.listen(5599);
    console.log('server is listening..')
}).catch((err) => {
    console.log(err);
})
