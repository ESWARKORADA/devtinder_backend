const express = require('express');
const connectDb = require('./config/database.js');
const User = require('./models/user.js')

const app = express();

app.post('/singup', (req, res)=>{

    const userObj = {
        firstName : 'Eswar',
        secondName : 'Korada'
    }

    const user = new User(userObj);

    user.save();

    res.send(200);

})

connectDb().then(() => {
    app.listen(5599);
    console.log('server is listening..')
}).catch((err) => {
    console.log(err);
})
