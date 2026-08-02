const mongoose = require('mongoose');

const connectDb = async ()=>{
    await mongoose.connect('mongodb+srv://koradaeswar5599_db_user:Eswarstark5599@cluster0.mko5inj.mongodb.net/devTinder')
}

module.exports = connectDb;

