const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require("../Models/user");

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(409)
                .json({ message: "user already exist", success: false });
        }
        // Use UserModel (capital U), not userModel
        const userModel = new UserModel({ name, email, password });
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();
        res.status(201)
            .json({ message: "signup Successfully", success: true });
    } catch (err) {
        res.status(500)
            .json({ message: "internal server error", success: false });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        const errorMsg = 'Authentication failed username or password is inccorect';
        if (!user) {
            return res.status(403)
                .json({ message: errorMsg, success: false });
        }
        const isPassEqual = await bcrypt.compare(password, user.password);
        if(!isPassEqual){
             return res.status(403)
                .json({ message: errorMsg, success: false });
        }

        const jwtToken = jwt.sign(
            {email : user.email, _id: user._id},
            process.env.JWT_SECRET,
            {expiresIn : '24h'}
        )
       
        res.status(200)
            .json({ message: "signup Successfully",
                 success: true,
                 jwtToken,
                 email,
                 name : user.name
                 });
    } catch (err) {
        res.status(500)
            .json({ message: "internal server error", success: false });
    }
}

module.exports = {
    signup,
    login
}
