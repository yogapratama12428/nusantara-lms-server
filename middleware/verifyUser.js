import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const verifyUser = async (req, res, next) => {
  // Read the token from the cookie
  const token = req.cookies.accessToken;
  try {
    //token not provided
    if (!token)
      return res.status(401).send("Access denied...No Token Provided...");

    //token not match
    const match_token = await prisma.user.findMany({
      where: {
        access_token: token,
      },
    });

    if (!match_token)
      return res.status(401).send("Access denied... Credentials Error...");

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) return res.sendStatus(403);
      req.email = decoded.email;
      req.userId = decoded.userId;
      next();
    });
  } catch (er) {
    console.log("err", er);
    //Incase of expired jwt or invalid token kill the token and clear the cookie
    res.clearCookie("token");
    return res.status(400).send(er.message);
  }
};
