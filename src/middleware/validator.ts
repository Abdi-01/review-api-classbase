import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

export const regisValidation = [
    body("username").notEmpty().withMessage("Username required"),
    body("email").notEmpty().withMessage("Email required"),
    body("email").isEmail().withMessage("Email WRONG"),
    (req: Request, res: Response, next: NextFunction) => {
        const errorValidator = validationResult(req); // untuk menampung jika ada error dari middleware validator
        if (!errorValidator.isEmpty()) {
            // Jika errorValidator tidak kosong maka akan dikirimkan response sebagai error
            return res.status(400).send({ error: errorValidator.array() });
        }

        next(); // jika error validator kosong maka lanjut ke controller register
    }
];