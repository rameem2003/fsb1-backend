const middleware = (req, res, next) => {
  console.log("Middlware Calling....");
  next();
};

export default middleware;
