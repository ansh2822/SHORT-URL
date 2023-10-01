// Authentication
const { getUser } = require("../service/auth");

function checkforAuthentication(req, res, next) {
  const tokenCookie = req.cookies?.token;

  req.user = null;

  if (!tokenCookie) return next();

  const token = tokenCookie;
  const user = getUser(token);

  req.user = user;
  next();
}

// Autherization
function restrictTo(roles = []) {
  return function (req, res, next) {
    if (!req.user) return res.redirect("/login");

    if (!roles.includes(req.user.role)) return res.render("unauthorize");

    return next();
  };
}

module.exports = { checkforAuthentication, restrictTo };
