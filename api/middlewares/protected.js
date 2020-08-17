module.exports = (req, res, next) => {
  //  check that the client is authenticated
  req.session && req.session.loggedIn
    ? next()
    : res.status(401).json({ you: "shall not pass" });
};
