import { Request, Response, NextFunction } from "express";

export class AuthController {
    async registerUser(req: Request, res: Response, next: NextFunction) {
        try {
            console.log(req.body);

        } catch (error: any) {
            console.log(error);
            return res.status(500).send(error);
        }
    }
}