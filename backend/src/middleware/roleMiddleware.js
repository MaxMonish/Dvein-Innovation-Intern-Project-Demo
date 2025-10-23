const roleMiddleware = (allowedRoles) => {
    return (req, res, next) => {
        if(!req.user || !allowedRoles.includes(req.user.role)){
            return res.status(403).json({message: "Access Denied! - You are not authorized to view this page"});
        }
        next();
    };
};

module.exports = roleMiddleware;