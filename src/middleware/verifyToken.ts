import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

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
        const verifiedToken = verify(token, "secretJWT");

        req.dataUser = verifiedToken;
        next();
    } catch (error) {
        return res.status(400).send("Token error");
    }
}