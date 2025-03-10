const jwt = require("jsonwebtoken");
const captainModel = require("../models/captain.model");
const blacklisttokenModel = require("../models/blacklisttoken.model");

module.exports.captainAuth = async (req, res, next) => {
    try {
        // Extract token from cookies or Authorization header
        const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

        console.log("Received Token:", token);

        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No Token Provided" });
        }

        // Check if token is blacklisted
        const isBlacklisted = await blacklisttokenModel.exists({ token });

        if (isBlacklisted) {
            return res.status(401).json({ message: "Unauthorized: Token Blacklisted" });
        }

        // Verify JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded JWT:", decoded);

        // Find captain by decoded ID
        const captain = await captainModel.findById(decoded.id);
        if (!captain) {
            return res.status(401).json({ message: "Unauthorized: Captain Not Found" });
        }

        // Attach captain to request
        req.captain = captain;
        next();
    } catch (error) {
        console.error("Auth Middleware Error:", error.message);
        return res.status(500).json({ message: "Server Error: " + error.message });
    }
};
