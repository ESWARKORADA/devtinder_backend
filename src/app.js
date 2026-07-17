const express = require('express');

const app = express();

app.use('/get', (req, res)=>{
    res.send('Eswar server is working now');
})

app.listen(5599);