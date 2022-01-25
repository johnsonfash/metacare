module.exports = (req, _res, next) => {
  req.id = req.params.id;
  next();
}