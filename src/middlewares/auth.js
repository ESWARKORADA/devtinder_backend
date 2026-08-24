const jwt = require('jsonwebtoken')
const User = require('../models/user');

const validateToken = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            throw new Error("Token Not Found..");
        }

        const decodedToken = jwt.verify(token, "EswarStark5599");

        const user = await User.findOne({ _id: decodedToken });

        if (!user) {
            throw new Error("User Not Found..");
        }

        req.user = user;

        next();
    } catch (err) {
        console.log(err);
        res.status(401).send("ERROR " + err.message);
    }

}

module.exports = {validateToken};