import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config.js";

function getToken(user) {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    JWT_SECRET,
    {
      expiresIn: "48h",
    }
  );
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (token === null) {
    res.sendStatus(401).send({ msg: "token not found" });
  } else {
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403).send({ msg: "could not verify token" });
      } else {
        req.user = user;
        next();
        return;
      }
    });
  }
}

function isAdmin(req, res, next) {
  const userStatus = req.headers.AdminUser;
  if (userStatus) {
    return next();
  } else {
    return res
      .status(401)
      .send({ msg: "Admin Token is not valid" + userStatus });
  }
}

export { authenticateToken, getToken, isAdmin };
