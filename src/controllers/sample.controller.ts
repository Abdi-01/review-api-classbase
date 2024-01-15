import { Request, Response } from "express";
import { transporter } from "../helpers/nodemailer";
import fs from "fs";
import { join } from "path";
import handlebars from "handlebars";

export class SampleController {
    async getSample(req: Request, res: Response) {
        return res.status(200).send("Sample Get Controller")
    }

    async createSample(req: Request, res: Response) {
        return res.status(200).send("Sample Create Controller")
    }

    async addNewImage(req: Request, res: Response) {
        try {
            console.log(req.file);

            return res.status(200).send(`file ${req.file?.filename} successfully uploaded`)
        } catch (error: any) {
            console.log(error);
            return res.status(500).send(error);
        }
    }

    async addMultipleImage(req: Request, res: Response) {
        try {
            console.log(req.files);

            return res.status(200).send("Upload multiple files success")
        } catch (error: any) {
            console.log(error);
            return res.status(500).send(error);
        }
    }

    async sendMail(req: Request, res: Response) {
        try {
            // Mendefinisikan lokasi template dan membacanya dengan fs
            const templateSource = fs.readFileSync(join(__dirname, "../templates/mail.hbs"), "utf-8");
            const compiledTemplate = handlebars.compile(templateSource);

            await transporter.sendMail({
                from: "Review API Mailer",
                to: req.body.email,
                subject: "Welcome to mailer",
                html: compiledTemplate({ name: req.body.email.split("@")[0] })
            })

            return res.status(200).send("Send email success");
        } catch (error: any) {
            console.log(error);
            return res.status(500).send(error);
        }
    };
}