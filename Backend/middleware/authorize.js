import jwt from 'jsonwebtoken';
export const authenticate = (req, res, next) => {

    const token = req.cookies.jwt; // Get the token from cookies
    console.log("Token from cookie:", req.cookies); // Log the token for debugging
    console.log("Token from cookie:", token); // Log the token for debugging
    if(!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); // Verify the token
        console.log("Decoded token:", decoded); // Log the decoded token for debugging
        req.user = decoded;
    }
    catch(error) {
        return res.status(401).json({ message: "Invalid token" });
    }
    next(); // Call the next middleware function

}