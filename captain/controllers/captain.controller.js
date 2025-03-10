const captainModel = require('../models/captain.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const blacklisttokenModel = require('../models/blacklisttoken.model')

module.exports.register = async (req, res) => {
    try{
        const {name , email , password} = req.body;
        const captain = await captainModel.findOne({
            email
        });

        if (captain){
            return res.status(400).json({message: 'Captain already exists'});
        }

        const hash = await bcrypt.hash(password, 10);
        const newCaptain = new captainModel({
            name, email , password:hash
        })
        await newCaptain.save();
        const token = jwt.sign({id: newCaptain._id} , process.env.JWT_SECRET , {expiresIn: '1h'})

        res.cookie('token' , token)

        res.send({
            token , newCaptain
        })
    }catch(error){
        res.status(500).json({ message: error.message});
    }
}

module.exports.login = async(req, res) => {
    try{
        const {email , password} =  req.body;
        const captain = await captainModel
        .findOne({email})
        .select('+password');

        if (!captain){
            return res.status(400).json({
                message: "Invalid email or password"
            })
        }
        const isMatch = await bcrypt.compare(password, captain.password)

        if (!isMatch){
            return res.status(400).json({
                message: "Invalid email or password"
            })
        }

        const token = jwt.sign({id: captain._id}, process.env.JWT_SECRET , {expiresIn: '1h'})

        delete captain._doc.password;
        res.cookie('token' , token)
        res.send({token, captain})
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

        res.json({ message: "Captain logged out successfully" });
    } catch (error) {
        console.error("Logout Error:", error.message);
        res.status(500).json({ message: error.message });
    }
};

module.exports.profile = async (req, res) => {
    try {
        res.send(req.captain);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports.toggleAvailability = async(req, res) => {
    try{
        const captain = await captainModel.findById(req.captain._id);
        captain.isAvailable = !captain.isAvailable;
        await captain.save();
        res.send(captain);
    }catch(error){
        res.status(500).json({message: error.message})
    }
}