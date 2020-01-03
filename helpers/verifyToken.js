const jwt = require('jsonwebtoken');

exports.auth = (req, res, next) => {
    const token = req.header('auth-token');
    if(!token) return res.status(401).json({success: false, message: "Access Denied"});
    try {
        const verifiedToken = jwt.verify(token, process.env.SECRET_KEY);
        req.user = verifiedToken;
        next();
        
    } catch (err) {

        res.status(401).json({success: false, message: "Invalid Token"});
        
    }
};