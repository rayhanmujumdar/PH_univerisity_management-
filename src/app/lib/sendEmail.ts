import nodemailer from "nodemailer";
import config from "../config";
import { AppError } from "../ErrorBoundary/error";
import httpStatus from "http-status";
const sendEmail = async (userEmail: string, url: string) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            requireTLS: true,
            secure: config.NODE_ENV === "production",
            auth: {
                user: "rayhanmujumdar0177@gmail.com",
                pass: "xiwe armn hqto afvo",
            },
        });
        await transporter.sendMail({
            from: "rayhanmujumdar0177@gmail.com", // sender address
            to: "rayhanmojumdar0177@gmail.com", // list of receivers
            subject: "Reset password", // Subject line
            text: "You can reset your password in this below link", // plain text body
            html: `<b>${url}</b>`, // html body
        });
    } catch (err) {
        throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, 'nodemailer internal server error')
    }
};

export default sendEmail;
