import nodemailer from "nodemailer";
import config from "../config";
const sendEmail = async (data: unknown) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: config.NODE_ENV === 'production',
        auth: {
            // TODO: replace `user` and `pass` values from <https://forwardemail.net>
            user: "REPLACE-WITH-YOUR-ALIAS@YOURDOMAIN.COM",
            pass: "REPLACE-WITH-YOUR-GENERATED-PASSWORD",
        },
    });
    const info = await transporter.sendMail({
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: "bar@example.com, baz@example.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
    });
    console.log(info);
};

export default sendEmail;
