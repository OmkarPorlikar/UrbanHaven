import pkg from "jsonwebtoken";
const { verify } = pkg;

const verifyToken = (req, res, next) => {
  console.log("inside the token ");
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  console.log(token, "token");

  if (!token) {
    return res.status(401).json({ message: 'Token not provided' });
  }

  verify(token, process.env.SECRET, (err, user) => {
    console.log("Verifying Tokens");
    console.log(err, "error token");

    if (err) {
      console.log("Error occurred");
      return res.status(401).json({ message: 'Token Expired' });
    } else {
      console.log("Token is valid");
      // Call next() here, outside of the verify callback
      next();
    }
  });
};

export default verifyToken;
