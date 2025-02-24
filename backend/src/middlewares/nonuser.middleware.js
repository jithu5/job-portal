const jwt = require("jsonwebtoken");
const asyncHandler = require("../utils/Asynchandler.js");
const ApiResponse = require("../utils/ApiResponse.js");

const nonUserMiddleware = asyncHandler(async (req, res, next) => {
    let token;

    // Check if token is sent in the cookie
    if (req.cookies.userToken) {
        token = req.cookies.userToken;
    } else if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer ")
    ) {
        token = req.headers.authorization.split(" ")[1]; // Get token from Authorization header
    }

    if (!token) {
        return res.json(new ApiResponse(200,null,"Not a user"));
    }

    try {
        // Verify the token
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        console.log("secret",process.env.JWT_SECRET);
        
        req.user = decoded.id; // Attach the user to the request object

        next();
    } catch (error) {
        return next(new ApiError(401, "Not authorized, token failed"));
    }
});

module.exports = nonUserMiddleware;
