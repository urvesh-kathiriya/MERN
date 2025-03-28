export const adminmiddleware = (req, res, next) => {
    try {
        {console.log(req.user)}
        if (req.user.isAdmin === false) return res.status(401).json({ message: "You are not authorized to access this data" });
        next();

    } catch (error) {
        return res.status(400).json({ message: "Invalid Token Or Token Is Not Given", error: error })

    }
}