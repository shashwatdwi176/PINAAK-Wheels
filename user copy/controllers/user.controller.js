const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const blacklisttokenModel = require('../models/blacklisttoken.model')

module.exports.register = async (req, res) => {
    try{
        const {name , email , password} = req.body;
        const user = await userModel.findOne({
            email
        });

        if (user){
            return res.status(400).json({message: 'User already exists'});
        }

        const hash = await bcrypt.hash(password, 10);
        const newUser = new userModel({
            name, email , password:hash
        })
        await newUser.save();
        const token = jwt.sign({id: newUser._id} , process.env.JWT_SECRET , {expiresIn: '1h'})

        res.cookie('token' , token)

        res.send({
            token , newUser
        })
    }catch(error){
        res.status(500).json({ message: error.message});
    }
}

module.exports.login = async(req, res) => {
    try{
        const {email , password} =  req.body;
        const user = await userModel
        .findOne({email})
        .select('+password');

        if (!user){
            return res.status(400).json({
                message: "Invalid email or password"
            })
        }
        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch){
            return res.status(400).json({
                message: "Invalid email or password"
            })
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET , {expiresIn: '1h'})

        delete user._doc.password;
        res.cookie('token' , token)
        res.send({token, user})
    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports.logout = async (req, res) => {
    try {
        // Extract token from cookies or Authorization header
        const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(400).json({ message: "Token is required for logout" });
        }

        // Add token to blacklist
        await blacklisttokenModel.create({ token });

        // Clear token cookie if it exists
        res.clearCookie("token");

        res.json({ message: "User logged out successfully" });
    } catch (error) {
        console.error("Logout Error:", error.message);
        res.status(500).json({ message: error.message });
    }
};

module.exports.profile = async (req, res) => {
    try {
        res.send(req.user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}