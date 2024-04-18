const jwt = require("jsonwebtoken");

async function authenticateToken(req, res, next) {
    // Extract the token from the Authorization header
    const authHeader = req.headers.authorization;
    const token =  authHeader.split(' ')[1];
    // If no token is provided, send 401 Unauthorized status
    if (!token) {
        return res.sendStatus(401);
    }
    console.log(token)

    try {
        // Verify the token using the provided secret key
        const user = jwt.verify(token, process.env.JWT_SECRET);
        console.log(user);
        // If verification succeeds, attach the decoded user information to the request object
        req.user = user;
        // Call next middleware function
        next();
    } catch (err) {
        // If verification fails, send 403 Forbidden status
        console.log(err);
        return res.sendStatus(403);
    }
}

module.exports = authenticateToken;
