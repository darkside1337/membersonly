// Check login

const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  return res.redirect("/auth/login");
};

// Check not logged in

const ensureGuestUser = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect("/board");
  }

  return next();
};

const isAdmin = (req, res, next) => {
  const user = req.user;

  if (user.isAdmin) {
    return next();
  }

  return res.redirect("/board");
};

const isNotAdmin = (req, res, next) => {
  const user = req.user;

  if (!user.isAdmin) {
    return next();
  }

  return res.redirect("/board");
};

const isNotMember = (req, res, next) => {
  const user = req.user;

  if (!user.membershipStatus) {
    return next();
  }

  return res.redirect("/board");
};

module.exports = {
  ensureAuthenticated,
  ensureGuestUser,
  isNotAdmin,
  isNotMember,
  isAdmin,
};
