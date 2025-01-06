const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const verifyToken = async (req, res, next) => {
    const token = req.cookies?.token;
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET_KEY);
        const user = await User.findById(decoded.userId);
        if (!user) {
            res.clearCookie("token", {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'None',
            });
            return res.status(404).json({ message: 'User not found.' });
        }
        req.user = decoded;
        next();
    } catch (err) {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'None',
        });
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token has expired. Please log in again.' });
        } else {
            return res.status(400).json({ message: 'Invalid token.' });
        }
    }
};

module.exports = verifyToken;
