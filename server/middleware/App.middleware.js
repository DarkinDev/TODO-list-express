module.exports = (req, res, next) => {
  console.log("middleware triggered");
  next();
};
