const express = require('express');
const connectDb = require('./config/database.js');

const app = express();

connectDb().then(() => {
    app.listen(5599);
    console.log('server is listening..')
}).catch((err) => {
    console.log(err);
})
