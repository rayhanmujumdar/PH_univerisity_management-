import httpStatus from "http-status";
import nodemailer from "nodemailer";
import { AppError } from "../ErrorBoundary/error";
import config from "../config";
const sendEmail = async (userEmail: string, url: string) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: Number(config.nodemailer_port),
            requireTLS: true,
            secure: config.NODE_ENV === "production",
            auth: {
                user: config.nodemailer_user,
                pass: config.nodemailer_pass,
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
        throw new AppError(
            httpStatus.INTERNAL_SERVER_ERROR,
            "nodemailer internal server error",
        );
    }
};

export default sendEmail;
