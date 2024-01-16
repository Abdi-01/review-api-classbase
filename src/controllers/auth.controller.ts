import { Request, Response, NextFunction } from "express";
import prisma from "../prisma";
import { genSalt, hash } from "bcrypt";
import { transporter } from "../helpers/nodemailer";
import path from "path";
import fs from "fs";
import handlebars from "handlebars";
export class AuthController {
    async registerUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { username, email, password } = req.body;
            const checkUser = await prisma.user.findUnique({
                where: { email }
            });

            if (checkUser) {
                throw new Error("Email is already exist")
            }

            const salt = await genSalt(10);
            const hashPassword = await hash(password, salt);
            const newUser = await prisma.user.create({
                data: {
                    username,
                    email,
                    password: hashPassword
                }
            });

            // access templait email
            const templateMail = path.join(__dirname, "../templates", "registrasi.hbs");
            const templateSource = fs.readFileSync(templateMail, "utf-8");
            const compileTemplate = handlebars.compile(templateSource);

            await transporter.sendMail({
                from: "Free Blog",
                to: email,
                subject: "Registration Successfully",
                html: compileTemplate({ name: username })
            })

            return res.status(201).send({ success: true, result: newUser });
        } catch (error: any) {
            console.log(error);
            next(error); // meneruskan error ke handleError yang ada di app.ts
        }
    }
}