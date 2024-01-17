import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { redisClient } from "../helpers/redis";

declare global {
    namespace Express {
        interface Request {
            dataUser: any
        }
    }
}

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header("Authorization")?.split(" ")[1];
        if (!token) {
            return res.status(400).send("Token not found");
        }

        // Mengambil data token dari redis dan dicocokkan dengan token dari header
        const checkToken = await redisClient.get(`forgot:${req.body.email}`);
        console.log(token, checkToken);

        if (token === checkToken) {
            const verifiedToken = verify(token, "scretJWT");

            req.dataUser = verifiedToken;
            next();
        } else {
            return res.status(401).send("Token is not valid")
        }
    } catch (error) {
        return res.status(400).send("Token error");
    }
}