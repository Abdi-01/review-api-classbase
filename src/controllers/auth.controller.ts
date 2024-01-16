import { Request, Response, NextFunction } from "express";
import prisma from "../prisma";
import { genSalt, hash } from "bcrypt";

export class AuthController {
    async registerUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { username, email, password } = req.body;
            const salt = await genSalt(10);
            const hashPassword = await hash(req.body.password, salt);
            const newUser = await prisma.user.create({
                data: {
                    username,
                    email,
                    password: hashPassword
                }
            });

            res.status(201).send(newUser);
        } catch (error: any) {
            console.log(error);
            return res.status(500).send(error);
        }
    }
}