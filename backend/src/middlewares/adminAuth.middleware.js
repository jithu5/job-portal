const jwt = require("jsonwebtoken");
const asyncHandler = require("../utils/Asynchandler.js");
const ApiError = require("../utils/ApiError.js")

const ProtectAdminMiddleware = asyncHandler(async (req, res, next)=>{
    let token;
     // Check if token is sent in the cookie
     if (req.cookies.adminToken) {
        token = req.cookies.adminToken;
    } else if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer ")
    ) {
        token = req.headers.authorization.split(" ")[1]; // Get token from Authorization header
    }
    if (!token) {
        return next(new ApiError(401, "Not authorized, no token"));
    }

    try {
        // Verify the token
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        
        req.admin = decoded.id; // Attach the user to the request object

        next();
    } catch (error) {
        return next(new ApiError(401, "Not authorized, token failed"));
    }

});

module.exports = ProtectAdminMiddleware;