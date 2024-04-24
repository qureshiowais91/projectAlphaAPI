const jwt = require("jsonwebtoken");
const User = require("../models/User");

 function authorizeRoles(allowedRoles) {
    return async function (req, res, next) {
        // Extract the token from the Authorization header
        const authHeader = req.headers.authorization;
        const token = authHeader.split(' ')[1];

        // If no token is provided, send 401 Unauthorized status
        if (!token) {
            return res.status(401).json({ message: "No token provided." });
        }

        try {
            // Verify the token using the provided secret key
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Attach the decoded user information to the request object

            req.user =  await User.findById(decoded.userId);

            // Check if the user's role is allowed to access the route
            if (!allowedRoles.includes(req.user.role)) {
                return res.status(403).json({ message: "Forbidden: Insufficient role." });
            }
            console.log(req.user.role)
            // If the user has the required role, proceed to the next middleware
            next();
        } catch (err) {
            // If token verification fails, send 403 Forbidden status
            return res.status(403).json({ message: "Forbidden: Invalid token." });
        }
    };
}

module.exports = authorizeRoles;
