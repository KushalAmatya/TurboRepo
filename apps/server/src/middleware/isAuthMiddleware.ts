import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export interface CustomRequest extends Request {
  token: JwtPayload;
}

export const isAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization");
    console.log("hshsh", token);

    if (!token) {
      return res.status(401).send("Please authenticate");
    }
    const decoded = jwt.verify(
      token,
      process.env.SECRET as Secret
    ) as JwtPayload;

    (req as CustomRequest).token = decoded;

    next();
  } catch (err) {
    res.status(401).send(err.message);
  }
};
