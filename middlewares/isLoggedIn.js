const isLoggedIn = (req, res, next) => {
  const isLoggedIn = req.userAuth;
  if (isLoggedIn) next();
  else {
    const err = new Error('You are not logged in');
    next(err);
  }
};

module.exports = isLoggedIn;
