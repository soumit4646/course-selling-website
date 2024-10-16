const jwt = require("jsonwebtoken");
const { JWT_ADMIN_PASSWORD } = require("../config");

function adminMiddleware(req, res, next) {
  const { admintoken } = req.cookies;

  if (!admintoken) {
    return res.status(403).json({
      message: "You are not signed in",
    });
  }

  const decoded = jwt.verify(admintoken, JWT_ADMIN_PASSWORD);

  if (decoded) {
    req.adminId = decoded.id;
    next();
  } else {
    res.status(403).json({
      message: "You are not signed in",
    });
  }
}

module.exports = {
  adminMiddleware: adminMiddleware,
};
