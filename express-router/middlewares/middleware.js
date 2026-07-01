const middleware = (req, res, next) => {
  // console.log(req.headers.authorization.split(" ")[1]);
  let token = req.headers.authorization.split(" ")[1];

  if (token == "1234") {
    next();
    return;
  } else {
    return res.status(401).send({
      success: false,
      message: "Unauthorized",
    });
  }
};

export default middleware;
