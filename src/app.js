const express = require('express');
const connectDb = require('./config/database.js');
const User = require('./models/user.js')

const app = express();

app.use(express.json());

app.post('/singUp', async (req, res) => {
    try {
        const userObj = req.body;
        const user = new User(userObj);
        await user.save();
        console.log(user.save());
        res.status(200).send("Inserted Successfully...");
    }catch(err){
        console.log(err);
        res.status(500).send("Something Went Wrong...");
    }
});

app.get('/getUsers', async(req, res)=>{
    try{
        const users = await User.find({});
        res.status(200).send({users: users});
    }catch(err){
        console.log(err);
        res.status(500).send("Something Went Wrong...");
    }
})

connectDb().then(() => {
    app.listen(5599);
    console.log('server is listening..')
}).catch((err) => {
    console.log(err);
})
