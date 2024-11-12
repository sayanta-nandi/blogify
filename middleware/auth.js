const { validateToken } = require("../service/auth");

function checkAuthCookie(cookieName) {
  return (req, res, next) => {
    const userCookie = req.cookies[cookieName];
    if (!userCookie) {
        return next();
    }
    try {
      const userPayload = validateToken(userCookie);
      req.user = userPayload;
    } catch (error) {}
    next();
  };
}

module.exports = {
  checkAuthCookie,
};
