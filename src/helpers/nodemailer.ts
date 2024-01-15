import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "miniproject.pwd@gmail.com",
        pass: "bzvzwdlvrauoevuw"
    }
});