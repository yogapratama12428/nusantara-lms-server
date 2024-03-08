import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const login = async (req, res) => {
  const { email, userId } = req.body;
  try {
    const check_user = await prisma.user.findUnique({
      where: {
        email,
        userId,
      },
    });

    //user already exists
    if (check_user) {
      //Send the jwt token on successful login
      const accessToken = jwt.sign(
        { userId, email },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "30d",
        }
      );

      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        withCredentials: true,
        //secure: true, // only works on https
      });

      console.log({
        accessToken: accessToken,
        messages: "already exists",
      });

      return res.status(200).json({
        status: "OK",
      });
    }

    //user not already exists
    await prisma.user
      .create({
        data: {
          email,
          userId,
        },
      })
      .catch((err) => {
        return res.status(200).json({
          message: err.message,
        });
      });

    const accessToken = jwt.sign(
      { userId, email },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "30d",
      }
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      withCredentials: true,
      //secure: true, // only works on https
    });

    console.log({
      accessToken: accessToken,
      messages: "new user created",
    });

    return res.status(200).json({
      status: "OK",
    });
  } catch (error) {
    return res.status(403).json({
      message: error.message,
    });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("accessToken");
  res.send({ success: true });
};

export const testToken = async (req, res) => {
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
      console.log(req.email);
    });
  } catch (er) {
    // console.log("err", er);
    //Incase of expired jwt or invalid token kill the token and clear the cookie
    res.clearCookie("token");
    return res.status(400).send(er.message);
  }
};
